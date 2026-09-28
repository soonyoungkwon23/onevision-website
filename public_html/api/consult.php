<?php
/*
 * Receives consultation requests from the site's forms and delivers them to the
 * OneVision inbox.
 *
 * Every request is appended to a log outside the web root BEFORE the email is
 * attempted, so a parent's request is never lost even if mail delivery fails.
 * (Until this endpoint existed, the forms looked like they submitted but sent
 * nothing anywhere.)
 *
 * POST, application/json:
 *   { "form": "freshman", "lang": "ko" | "en", "page": "/freshman.html",
 *     "fields": [ { "key": "...", "label": "...", "value": "..." } ], "_hp": "" }
 *
 * Responds with JSON: { "ok": true, "logged": bool, "mailed": bool }
 */

declare(strict_types=1);

const TO_ADDRESS = 'onevisionconsulting.info@gmail.com';
const FROM_ADDRESS = 'no-reply@onevisionconsulting.us';
const MAX_FIELDS = 30;
const MAX_LABEL = 120;
const MAX_VALUE = 4000;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function clean($value, int $max): string
{
    $s = is_scalar($value) ? (string) $value : '';
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s) ?? '';
    return mb_substr(trim($s), 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

$data = json_decode((string) file_get_contents('php://input', false, null, 0, 64000), true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'bad_request']);
}

// Honeypot: a field real visitors never see. Anything that fills it in gets an
// ordinary-looking success and is dropped.
if (!empty($data['_hp'])) {
    respond(200, ['ok' => true]);
}

$form = preg_replace('/[^a-z0-9_-]/i', '', clean($data['form'] ?? '', 40)) ?: 'unknown';
$lang = ($data['lang'] ?? '') === 'en' ? 'en' : 'ko';
$page = clean($data['page'] ?? '', 200);

$fields = [];
$rawFields = is_array($data['fields'] ?? null) ? $data['fields'] : [];
foreach (array_slice($rawFields, 0, MAX_FIELDS) as $f) {
    if (!is_array($f)) {
        continue;
    }
    $value = clean($f['value'] ?? '', MAX_VALUE);
    if ($value === '') {
        continue;
    }
    $label = clean($f['label'] ?? ($f['key'] ?? ''), MAX_LABEL);
    $fields[] = ['label' => $label !== '' ? $label : '(field)', 'value' => $value];
}
if (!$fields) {
    respond(422, ['ok' => false, 'error' => 'empty']);
}

$receivedAt = gmdate('c');
$record = [
    'received_at' => $receivedAt,
    'form' => $form,
    'lang' => $lang,
    'page' => $page,
    'fields' => $fields,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
    'user_agent' => mb_substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
];

// 1) Log first. Preferred location is beside public_html, which the web server
//    never serves. The fallback folder inside api/ is denied by .htaccess.
$logged = false;
foreach ([dirname(__DIR__, 2) . '/onevision-leads', __DIR__ . '/_leads'] as $dir) {
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) {
        continue;
    }
    $line = json_encode($record, JSON_UNESCAPED_UNICODE) . "\n";
    if (@file_put_contents($dir . '/leads-' . gmdate('Y-m') . '.jsonl', $line, FILE_APPEND | LOCK_EX) !== false) {
        $logged = true;
        break;
    }
}

// 2) Email the request to the OneVision inbox.
$lines = [];
foreach ($fields as $f) {
    $lines[] = $f['label'] . ': ' . $f['value'];
}
$body = implode("\n", $lines)
    . "\n\n----\n"
    . 'Form: ' . $form . "\n"
    . 'Site: ' . ($lang === 'en' ? 'English' : 'Korean') . "\n"
    . 'Page: https://onevisionconsulting.us' . $page . "\n"
    . 'Received (UTC): ' . $receivedAt . "\n";

$subjectText = ($lang === 'en' ? '[OneVision] Consultation request (English site)' : '[OneVision] 상담 신청') . ' - ' . $form;

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    'From: OneVision Website <' . FROM_ADDRESS . '>',
];
// Let staff reply straight to the parent when they left an email address.
foreach ($fields as $f) {
    if (preg_match('/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i', $f['value'], $m)
        && filter_var($m[0], FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $m[0];
        break;
    }
}

$mailed = @mail(
    TO_ADDRESS,
    '=?UTF-8?B?' . base64_encode($subjectText) . '?=',
    chunk_split(base64_encode($body)),
    implode("\r\n", $headers),
    '-f' . FROM_ADDRESS
);

if (!$logged && !$mailed) {
    respond(500, ['ok' => false, 'error' => 'delivery_failed']);
}
respond(200, ['ok' => true, 'logged' => $logged, 'mailed' => (bool) $mailed]);

#!/usr/bin/env bash
# Uploads public_html/ to Hostinger over FTPS. Used by deploy.yml and
# publish-weekly.yml. Needs FTP_SERVER, FTP_USERNAME and FTP_PASSWORD.
#
# Pass 1 mirrors everything and compares by size (--ignore-time), because a
# fresh CI checkout gives every file a new timestamp and a time comparison
# would re-send the ~21 MB of images on every run. It creates new files and
# replaces any file whose size changed.
#
# A size comparison cannot see a same-size edit (a version stamp going from
# 20260927 to 20260928, a year changing in a sentence), and those edits used
# to be skipped without any error. Pass 2 closes that gap: the server keeps a
# manifest of content hashes outside the web root, and every text file whose
# hash differs from the last successful deploy is uploaded again. The new
# manifest is written only after both passes succeed, so a failed run is
# repeated in full by the next one.
#
# Hostinger's FTP certificate is *.hstgr.io and the account is reached by IP,
# so the hostname check fails; the connection stays TLS-encrypted
# (ssl-force) without it. Keep --parallel at 2: 4 tripped the host's
# connection limits.

set -euo pipefail
umask 077

REMOTE_ROOT=/domains/onevisionconsulting.us
REMOTE_DIR=$REMOTE_ROOT/public_html
REMOTE_MANIFEST=$REMOTE_ROOT/deploy-manifest.txt
BINARIES='\.(jpe?g|png|gif|webp|ico|pdf|mp4|webm|woff2?|ttf|zip)$'

: "${FTP_SERVER:?}" "${FTP_USERNAME:?}" "${FTP_PASSWORD:?}"
command -v lftp >/dev/null || { sudo apt-get update -qq && sudo apt-get install -y -qq lftp; }

WORK=$(mktemp -d)
cat > "$WORK/connect.lftp" <<EOF
set ftp:ssl-force true
set ftp:ssl-protect-data true
set ssl:verify-certificate no
set net:max-retries 5
set net:timeout 30
set net:reconnect-interval-base 5
open -u "$FTP_USERNAME","$FTP_PASSWORD" "$FTP_SERVER"
EOF

# Runs an lftp script (connection settings + the given commands), retrying the
# whole session, because shared hosting drops transfers under load.
run_lftp() {
  local label=$1 body=$2
  { echo "set cmd:fail-exit yes"; cat "$WORK/connect.lftp" "$body"; } > "$WORK/run.lftp"
  for attempt in 1 2 3; do
    if lftp -f "$WORK/run.lftp"; then
      echo "$label succeeded on attempt $attempt."
      return 0
    fi
    echo "::warning::$label attempt $attempt failed; retrying."
    sleep $((attempt * 20))
  done
  echo "::error::$label failed after 3 attempts."
  return 1
}

# Stamp this run, so the verify step can prove these exact files are live.
echo "run=${GITHUB_RUN_ID:-local} sha=${GITHUB_SHA:-local}" > public_html/deploy-id.txt

# Hash every text file.
(
  cd public_html
  find . -type f ! -name '.git*' -printf '%P\0' | grep -zEiv "$BINARIES" | xargs -0 -r sha256sum --
) | LC_ALL=C sort > "$WORK/new.txt"

# Previous manifest. Missing on the first run, in which case every text file
# counts as changed.
{ echo "set cmd:fail-exit no"; cat "$WORK/connect.lftp"; echo "get \"$REMOTE_MANIFEST\" -o \"$WORK/old-raw.txt\""; } > "$WORK/get.lftp"
lftp -f "$WORK/get.lftp" >/dev/null 2>&1 || true
touch "$WORK/old-raw.txt"
LC_ALL=C sort "$WORK/old-raw.txt" > "$WORK/old.txt"
LC_ALL=C comm -23 "$WORK/new.txt" "$WORK/old.txt" | cut -c67- > "$WORK/changed.txt"
echo "Text files changed since the last deploy: $(wc -l < "$WORK/changed.txt")"

echo "mirror -R --ignore-time --parallel=2 --exclude-glob .git* ./public_html \"$REMOTE_DIR\"" > "$WORK/pass1.lftp"
run_lftp "Pass 1 (all files, size-compared)" "$WORK/pass1.lftp"

if [ -s "$WORK/changed.txt" ]; then
  while IFS= read -r f; do
    echo "put \"public_html/$f\" -o \"$REMOTE_DIR/$f\""
  done < "$WORK/changed.txt" > "$WORK/pass2.lftp"
  run_lftp "Pass 2 (changed text files, forced)" "$WORK/pass2.lftp"
fi

# Record what is now live. If this fails, the next run simply re-sends all
# text files, so it is a warning rather than a failed deploy.
echo "put \"$WORK/new.txt\" -o \"$REMOTE_MANIFEST\"" > "$WORK/manifest.lftp"
run_lftp "Manifest upload" "$WORK/manifest.lftp" || echo "::warning::Could not save the deploy manifest; the next deploy will re-send every text file."

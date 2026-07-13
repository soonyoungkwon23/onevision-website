# 네이버 서치어드바이저 + Google Search Console 등록 가이드

_최종 업데이트: 2026-07-13 · 담당: OneVision 운영_

이 문서는 `onevisionconsulting.us`를 네이버·구글 검색에 노출시키기 위한 **1회성 등록 절차**입니다.
코드 발급에는 본인의 네이버/구글 로그인이 필요하므로 이 단계는 **사용자가 직접** 진행해야 합니다.
아래 순서대로 하면 됩니다. (사이트는 이미 `sitemap.xml` · `rss.xml` · `robots.txt`를 자동 생성하고 있어 인프라는 준비 완료 상태입니다.)

---

## 요약 — 딱 3가지만 하면 됩니다

1. 네이버·구글에서 **HTML 태그(meta) 인증 코드**를 각각 발급받는다.
2. 코드를 `site.config.json` → `verification`에 넣고, **홈페이지 `public_html/index.html`에도** 붙여넣는다(아래 3번 이유 참고).
3. 커밋 → push 하면 자동 배포된다. 그 후 각 콘솔에서 **인증 → 사이트맵/RSS 제출 → 수집요청**.

---

## 1. 사이트 등록

### 네이버 서치어드바이저
1. https://searchadvisor.naver.com 접속 → 네이버 로그인.
2. 상단 **웹마스터 도구** → **사이트 등록**.
3. 사이트 주소에 `https://onevisionconsulting.us` 입력 → 등록.

### Google Search Console
1. https://search.google.com/search-console 접속 → 구글 로그인.
2. 속성 추가 → **URL 접두어(URL prefix)** 선택 → `https://onevisionconsulting.us` 입력.
   - (도메인(Domain) 속성은 DNS 인증이 필요해 더 번거롭습니다. **URL 접두어 + HTML 태그** 방식을 권장합니다.)

---

## 2. HTML 메타 인증 코드 발급

두 콘솔 모두 인증 방법에서 **"HTML 태그"** 를 선택하세요. 아래 형태의 `<meta>` 태그를 줍니다:

- 네이버: `<meta name="naver-site-verification" content="xxxxxxxxxxxxxxxx" />`
- 구글: `<meta name="google-site-verification" content="yyyyyyyyyyyyyyyy" />`

여기서 **`content=""` 안의 값(코드)만** 복사하면 됩니다. 태그 전체가 아니라 따옴표 안 문자열만 필요합니다.

> ⚠️ 아직 **인증 완료 버튼을 누르지 마세요.** 코드를 사이트에 반영해 배포한 뒤에 눌러야 통과됩니다.

---

## 3. 코드 붙여넣는 위치 (두 군데)

### (A) 블로그 페이지 — 자동
`site.config.json` → `verification` 필드에 코드를 넣으면 `build.js`가 **모든 블로그 페이지 `<head>`에 자동으로** 태그를 삽입합니다.

```jsonc
// site.config.json
"verification": {
  "googleSiteVerification": "여기에_구글_코드",
  "naverSiteVerification": "여기에_네이버_코드"
}
```

### (B) 홈페이지 — 수동 (중요)
검색엔진은 보통 **도메인 루트(`https://onevisionconsulting.us/` = `public_html/index.html`)** 를 인증 대상으로 삼습니다.
블로그 페이지에만 태그가 있으면 루트 인증이 실패할 수 있으므로, **홈페이지에도 같은 두 태그를 직접 넣어야 합니다.**

`public_html/index.html`을 열고 `<head>` 안, **description `<meta>` 바로 아래**(현재 9~10번째 줄, `<script src="js/common.js">` 위)에 두 줄을 추가하세요:

```html
    <meta
      name="description"
      content="미국 유학·이민 올케어 시스템, 원비전. ..."
    />
    <!-- ↓↓↓ 아래 두 줄을 발급받은 실제 코드로 채워 추가 ↓↓↓ -->
    <meta name="google-site-verification" content="여기에_구글_코드" />
    <meta name="naver-site-verification" content="여기에_네이버_코드" />
    <script src="js/common.js"></script>
```

> 팁: `about.html`, `contact.html` 등 다른 핵심 페이지에도 같은 두 줄을 넣어두면 어떤 URL로 인증하든 통과됩니다.
> 다만 **최소 요건은 홈페이지 하나**입니다. 43개 정적 페이지 전부에 넣을 필요는 없습니다.

### 반영
```bash
git add -A && git commit -m "Add Naver/Google site verification codes" && git push
```
push하면 GitHub Actions가 자동으로 재빌드 + 배포합니다(수 분 소요).
배포 후 실제 페이지 소스에 태그가 보이는지 확인:
```bash
curl -s https://onevisionconsulting.us/ | grep site-verification
```
두 태그가 보이면, 그때 각 콘솔로 돌아가 **인증(확인) 버튼**을 누르세요.

---

## 4. 사이트맵 · RSS 제출

인증이 완료되면 각 콘솔에서 사이트맵을 제출합니다. (이미 자동 생성되어 라이브 상태입니다.)

- 사이트맵: `https://onevisionconsulting.us/sitemap.xml`
- RSS: `https://onevisionconsulting.us/rss.xml`

### 네이버 서치어드바이저
- **요청 → 사이트맵 제출**: `sitemap.xml` 입력.
- **요청 → RSS 제출**: `rss.xml` 입력. (네이버는 RSS로 신규 글을 더 빨리 수집합니다 — 꼭 같이 제출.)

### Google Search Console
- **색인 → Sitemaps**: `sitemap.xml` 입력 후 제출. (구글은 RSS 제출 항목이 없으니 사이트맵만.)

---

## 5. 웹페이지 수집요청 (초기 색인 가속)

신규 사이트는 자연 크롤링에 네이버 기준 약 **2주** 걸립니다. 주요 URL은 수동으로 수집요청하면 빨라집니다.

### 네이버: 요청 → 웹페이지 수집
아래 URL을 하나씩 넣고 요청하세요(초기 시드 배치):
- `https://onevisionconsulting.us/`
- `https://onevisionconsulting.us/blog/index.html`
- `https://onevisionconsulting.us/blog/bsn/index.html`
- `https://onevisionconsulting.us/blog/mba/index.html`
- 대표 포스트 몇 개 (예: `https://onevisionconsulting.us/blog/bsn/alabama-capstone.html`)

### Google: URL 검사 → 색인 생성 요청
같은 URL들을 상단 **URL 검사** 창에 넣고 **색인 생성 요청**을 누르세요.

> 매주 월요일 자동 발행(20건/주)되는 신규 글도, 처음 몇 주는 발행 후 대표 URL을 수집요청해 주면 색인이 빨라집니다.
> 이후에는 사이트맵/RSS만으로 자동 수집됩니다.

---

## 체크리스트

- [ ] 네이버 서치어드바이저 사이트 등록
- [ ] Google Search Console(URL 접두어) 속성 추가
- [ ] 네이버·구글 HTML 태그 코드 발급 (content 값만 복사)
- [ ] `site.config.json` → `verification`에 두 코드 입력
- [ ] `public_html/index.html` `<head>`에 두 `<meta>` 태그 추가
- [ ] commit + push → 배포 확인 (`curl ... | grep site-verification`)
- [ ] 두 콘솔에서 인증 버튼 클릭
- [ ] 사이트맵 제출 (네이버 + 구글) / RSS 제출 (네이버)
- [ ] 시드 URL 수집요청 (네이버 웹페이지 수집 / 구글 색인 생성 요청)

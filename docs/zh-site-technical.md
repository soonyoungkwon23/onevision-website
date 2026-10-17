# Simplified Chinese (/zh/) for onevisionconsulting.us: web technical research

Researched 2026-10-16. Every claim has a source listed under its section. **(unverified)** marks claims I could not confirm from a primary source in this session. The web search budget ran out near the end, so a few points stay unverified and are flagged where they come up.

**Repo note.** The repo changed while I was researching. Between about 17:22 and 17:28 PT on 2026-10-16, another session rewrote `scripts/i18n/build-en.js` into `scripts/i18n/build-locale.js`, added `public_html/css/zh.css`, swapped the header switch for a three-language menu, rewrote `setLangSwitch()` in `public_html/js/common.js`, and generated `public_html/zh/`. Section 7 covers both the original two-language state and a review of that in-progress work. I did not modify any repo files.

---

## TL;DR

1. **Line breaking.** Turn off `word-break: keep-all` on Chinese pages. Use `word-break: normal; line-break: strict; overflow-wrap: break-word`. Set body `line-height` around 1.75 and headings around 1.35, with `letter-spacing: 0` (undo the Korean negative tracking). Justify only long article paragraphs.
2. **Chinese–Latin spacing.** Put real spaces in the translated text (`在 F-1 签证`, `TOEFL 100 分`). Do not rely on CSS. Set `text-autospace: no-autospace` explicitly so a future change to browser defaults cannot add a second gap. `text-autospace` only became Baseline in Nov 2025, and WeChat on Android runs a Chromium engine that lags behind current Chrome.
3. **Fonts.** Do not use Pretendard or Noto Serif KR for Chinese text.
   - Pretendard has **0** Han characters but **does** contain the Chinese punctuation. With Pretendard first in the stack, every `，。、“”` renders in a Korean font while the characters around them render in the system Chinese font.
   - Noto Serif KR covers 4,620 Hanja code points and lacks most simplified forms. In `移民申请`, `移民申` render in Noto Serif KR and `请` falls back to another font.
   - Use system fonts instead: PingFang SC, Microsoft YaHei, Noto Sans CJK SC, HarmonyOS Sans SC. Headings should be bold sans (clreq: "Hei or bold Song").
   - Use `<html lang="zh-CN">`.
4. **Mainland China access.** Load nothing render-blocking from third-party hosts on `/zh/`.
   - Google Fonts, jsDelivr, unpkg and cdnjs all show mixed or intermittent results from inside China. kakao.com is "All blocked".
   - A render-blocking stylesheet whose packets are silently dropped has been measured holding a blank page for **75 to 80 seconds**.
   - The in-progress build already strips the font links from `/zh/`.
5. **SEO.**
   - Use `hreflang="zh-Hans"` (Google documents `zh-Hans` explicitly). Each page lists ko, en and zh-Hans, itself included, plus `x-default`.
   - Self-canonical per language, and list the `/zh/` URLs in the sitemap.
   - Baidu reportedly ignores hreflang and does not run JavaScript. Bake the header and footer into the static HTML so its crawler sees the language links. An optional `content-language` meta may help Baidu and Bing.
6. **Switcher UX.**
   - A disclosure button that shows the current language opens a list of endonyms: 한국어, English, 简体中文. No flags.
   - Each link goes to the equivalent page and carries `lang` and `hreflang`.
   - Mark the current language with `aria-current="page"`. Use no `aria-haspopup`/menu roles, and add `translate="no"`.
   - Keep the switcher visible in the mobile top bar and repeat it in the footer.
   - Label the list item 简体中文. 中文 is fine as the short label on phones.
7. **Repo.** The in-progress three-language menu is close. Fix these:
   - `aria-haspopup="true"` should go.
   - The button's `aria-label` replaces its visible text, which fails WCAG 2.5.3.
   - `aria-current` should be `"page"`.
   - Add `translate="no"`.
   - Consider 简体中文 as the list label.
   - Bake the header into `/zh/` pages.
   - `/zh/` titles and descriptions are still Korean. No page has `og:locale`.

---

## 1. Line breaking and body typography for Chinese

### What `word-break: keep-all` does to Chinese

- CSS Text 3 says `keep-all` means "Breaking is forbidden within 'words'… sequences of CJK characters do not break". It describes this as "the other common behavior for Korean (which uses spaces between words)". MDN: "Word breaks should not be used for Chinese/Japanese/Korean (CJK) text."
- Chinese has no spaces between words. Under `keep-all`, each run of Han characters between punctuation marks or spaces becomes one unbreakable "word". The remaining break points are after punctuation (`，。` are not letters, so they still allow a break) and at spaces, which in Chinese copy mostly means the spaces around English words and numbers.
- **Effects:**
  - Whole clauses jump to the next line and leave large gaps.
  - Lines break mainly around Latin words like "SAT" or "F-1".
  - In narrow cards a clause wider than the box only breaks at an arbitrary point because of the global `overflow-wrap: break-word`, as a last resort.
  - With `text-align: justify`, the gaps get stretched.

So `/zh/` must reset `word-break` to `normal`. Korean pages keep `keep-all`.

### Kinsoku (line-start and line-end prohibitions)

- clreq §6.1.1 defines four levels: none, **basic (recommended)**, GB-style and strict.
  - **Basic:** pause and stop marks (`，。、；：？！`), closing quotes and brackets, connector marks and interpuncts may not start a line. Opening quotes and brackets may not end a line.
  - **GB-style:** adds "a solidus may not end a line".
  - **Strict:** adds "two-em dashes and ellipses may not start a line".
- Mainland practice is "先挤进，后推出": squeeze the punctuation into the previous line first, and only push a character down if that fails.
- **What browsers do.** The default Unicode line-breaking classes already give the clreq **basic** level in every browser, whatever `line-break` is set to. Closing punctuation like `，。、）」”` belongs to classes that prohibit a break before them. The `line-break` value only changes edge cases (CSS Text 3):
  - `normal`/`loose` allow a break before `〜` for zh/ja.
  - `loose` allows breaks before `‥…`, before centred punctuation (`：；！？` and others) for zh/ja, and before hyphens after ideographs.
  - `strict` forbids all of these.
- CSS Text 3 notes that language-specific tailoring applies only when the content language is declared. That is one more reason `lang="zh-CN"` matters.
- CSS cannot do push-in justification. Hanging punctuation (`hanging-punctuation`) is Safari-only and is not needed: clreq §6.1.3 says most Chinese publications do not hang punctuation.

**Recommendation.** Use `line-break: strict`. It is harmless and closest to clreq's GB and strict levels.

### `overflow-wrap`

Keep `overflow-wrap: break-word` so long URLs and emails do not overflow. CSS Text 3 says `anywhere` differs only in that it also affects min-content sizing, which can shrink flex and grid items. `break-word` is the safer choice for this layout.

### Alignment

- clreq §6.2.2.1: Chinese book body text "原则上应该进行两端对齐" (should in principle be justified), and ragged-right is rare. Chinese justification compresses first, then expands.
- On the web, justify only long article paragraphs (blog and article bodies). Keep cards, buttons, lists, captions and headings left-aligned. Narrow phone columns with embedded Latin words make justification gaps visible (design judgment).
- Use `text-justify: auto`, not `inter-word`, because Chinese has no inter-word spaces.

### Letter-spacing

- clreq does not prescribe tracking for body text. Chinese body text is normally set solid (design convention; I did not find the clreq sentence that says so).
- The site uses negative tracking (-0.005em to -0.04em) on many Korean labels and headings. Reset it to `0` on `/zh/`. Small positive tracking (0.02 to 0.05em) is fine only for tiny uppercase or Latin badges.

### Line height, line length and sizes

- **Line gap.** clreq §7.1.1 (type-area design): the line gap is "commonly set to a value between 50% and 100% of the height of the character frame" and "usually does not exceed the font size". So `line-height` is about 1.5 to 2.0, and shorter lines can use less.
  - **Body:** about 1.75 (desktop), 1.7 (phones).
  - **Headings:** 1.3 to 1.4.
  - **Compact UI labels:** 1.4 to 1.5.
- **Line length.** clreq §7.1.1: books mostly run 17 to 40 characters per line. The minimum is 10, and horizontal text should not exceed 48. For article bodies, `max-width: 38em` (about 38 characters).
- **Headings.** clreq §7.1.3.2: "Hei or bold Song are usually used" for headings. Each heading level is typically 10 to 20% larger than the one below. Hei used for small headings is usually set heavier.
- **Paragraphs.** clreq §6.2.1.1: print convention is a 2-character first-line indent. Chinese websites mostly use block paragraphs with spacing instead (design judgment: no indent on the web).
- **Italics.** Chinese fonts have no italic, and browsers fake it with a slant. Render `em`/`i` upright, emphasised by weight (common practice, **unverified** against clreq).

### Ready-to-use CSS (line breaking and typography)

```css
/* /zh/ only. html lang="zh-CN", so :lang(zh) matches. */
html:lang(zh) *,
html:lang(zh) *::before,
html:lang(zh) *::after {
  word-break: normal !important;   /* undo the global Korean keep-all */
  line-break: strict;              /* clreq GB/strict level on top of the default basic kinsoku */
  overflow-wrap: break-word;       /* long URLs and emails only */
}

html:lang(zh) body {
  line-height: 1.75;
  letter-spacing: 0;
  text-autospace: no-autospace;    /* spaces are typed in the text; see section 2 */
}

html:lang(zh) h1,
html:lang(zh) h2,
html:lang(zh) h3 {
  line-height: 1.35;
  letter-spacing: 0 !important;    /* the Korean design uses negative tracking */
  font-weight: 700;                /* clreq: Hei or bold Song for headings */
}

/* Long-form text only (blog/article bodies), not cards or UI. */
html:lang(zh) .article-body p,
html:lang(zh) .post-content p {
  text-align: justify;
  text-justify: auto;
  max-width: 38em;                 /* clreq: 17-40 chars per line typical, max 48 */
}

html:lang(zh) em,
html:lang(zh) i {
  font-style: normal;              /* no true italics in Chinese fonts */
  font-weight: 600;
}

@media (max-width: 640px) {
  html:lang(zh) body { line-height: 1.7; }
}
```

(`.article-body` and `.post-content` are placeholders. Use the site's real article container classes.)

**Sources**
- W3C, Requirements for Chinese Text Layout (clreq), §6.1.1, §6.1.3, §6.2.1.1, §6.2.2, §7.1.1, §7.1.3.2: https://www.w3.org/TR/clreq/
- W3C, CSS Text Module Level 3 (keep-all, line-break levels, overflow-wrap): https://www.w3.org/TR/css-text-3/
- MDN, word-break: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/word-break
- MDN, line-break (Baseline since July 2020): https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-break

---

## 2. Spacing between Chinese and Latin letters or digits

### The convention

The chinese-copywriting-guidelines (中文文案排版指北, GitHub) set these rules:
- 中英文之间需要增加空格: `在 LeanCloud 上`.
- 中文与数字之间需要增加空格: `花了 5000 元`.
- 数字与单位之间需要增加空格 (`10 Gbps`, `20 TB`), but **no space** for degrees and percent (`90°`, `15%`).
- 全形标点与其他字符之间不加空格.
- Use full-width Chinese punctuation, half-width digits, and half-width punctuation inside whole English sentences.
- Product names follow their official spelling (`豆瓣FM`).

The guide lists Apple's and Microsoft's China, Hong Kong and Taiwan sites as following the convention. Its "text-spacing to the rescue?" section says the CSS features were not widely supported, so manual spaces are still recommended. That section predates the 2025 browser releases below.

### What standards say

- **clreq §6.3.3** (horizontal mixed text): Han characters and Western letters or digits should in principle be separated by no more than 1/4 em, with none at line start or end.
  - No adjustment next to Chinese commas and full stops, after opening brackets, or before closing brackets.
  - Justification may compress this space to 1/8 em (§6.2.2.3) or expand it to 1/2 em (§6.2.2.4).
  - clreq also accepts an ordinary word space (U+0020) as an alternative.
- **GB/T national standards.** I found no GB/T standard that requires a typed space between Chinese and Latin text. A sspai article states there is no national-standard rule on mixed Chinese–English spacing. GB/T 15834-2011 (punctuation) and GB/T 15835-2011 (numbers) cover other things. I could not read their full text to confirm they are silent on this **(unverified)**. Note that clreq §6.3.2.3 cites GB/T 15834-2011 §5.1.10 for trimming line-end punctuation to half width, so GB/T does address punctuation width.

### CSS `text-autospace`

- **What it does** (MDN): "specify the space applied between CJK and non-CJK characters".
  - `normal` = `ideograph-alpha` + `ideograph-numeric`.
  - `no-autospace` turns it off.
  - `insert` adds space only where none exists. `replace` swaps an existing U+0020 for the autospace amount.
  - Without `insert` or `replace`, the behaviour is `insert`.
  - It is additive with `letter-spacing` and `word-spacing`.
  - Chrome's i18n post: Chrome "doesn't add spacing where explicit spaces already separate the scripts".
  - The CSS Text 4 draft sets the gap at 1/8 of an ideograph width **(not re-verified this session)**.
- **Support** (MDN browser-compat-data, read 2026-10-16):

| | Chrome / Edge / Android WebView | Firefox | Safari / iOS |
|---|---|---|---|
| Property (`normal`, `no-autospace`) | 140 | 145 | 18.4 |
| `ideograph-alpha`, `ideograph-numeric`, `auto` | not yet | 145 | 18.4 |
| `insert` | not yet | 145 | 27 |

- **Initial value.** All three engines ship `no-autospace` as the initial value, not the spec's `normal` (csswg-drafts #12386). Jen Simmons (Apple) called Safari's choice conservative and temporary. Spacing therefore appears only if you opt in, and **the default could change later**.
- MDN lists the property as "Baseline 2025, newly available since November 2025".
- **WeChat's built-in browser:**
  - iOS WeChat uses the system WebKit, so it follows the iOS Safari version **(general knowledge, unverified this session)**.
  - Android WeChat uses Tencent's XWeb engine, a Chromium fork that lags behind system Chrome. A 2024 sample user-agent showed Chrome/122 with XWEB/1220053. I found no 2026 version data **(unverified)**.
  - Assume `text-autospace` does not work in a meaningful share of WeChat-on-Android views.

### CSS `text-spacing-trim`

- **What it does:** it trims the built-in blank half of full-width CJK punctuation at line edges and between adjacent marks. This is clreq §6.3.2's punctuation compression.
- **Support:** Chrome 123+ only. Firefox and Safari have none (BCD). The initial value `normal` already collapses adjacent punctuation in Chrome.
- **Font requirement:** it works only with fonts that have the OpenType `halt` or `chws` features. Otherwise it is disabled.
- **Action:** none needed. Leave the default.

### Recommendation

- **Type real spaces into the Chinese translation.** Set `spacing: "space"` in `i18n/glossary.zh.json`. `scripts/i18n/check-zh.js` already warns on a missing Chinese–Latin space when that option is set, and on spaces next to full-width punctuation. Why typed spaces:
  - Every engine renders them identically: old Safari, WeChat XWeb, Baidu snippets, copy-paste into WeChat or Word.
  - Mainstream brands (Apple and Microsoft China) do this.
- **Set `text-autospace: no-autospace` explicitly** on `/zh/`. It changes nothing today, but it freezes the result if browsers switch the initial value to the spec's `normal`. Without it, places where translators deliberately wrote no space (such as `2026年`) would suddenly gain a gap.
- **House rules for translators:**
  - Space between Han and Latin or digits: `F-1 签证`, `TOEFL 100 分`, `GPA 3.8`, `2026 年秋季`.
  - No space before `%` or `°`, and none next to full-width punctuation.
  - Brand and school names follow official spelling.
  - Decide once whether dates take spaces (`2026 年 10 月` vs `2026年10月`). The guidelines' rule implies spaces.

**Sources**
- sparanoid, chinese-copywriting-guidelines: https://github.com/sparanoid/chinese-copywriting-guidelines
- clreq §6.2.2, §6.3.2, §6.3.3: https://www.w3.org/TR/clreq/
- sspai, on the origin of the convention and the lack of a national standard: https://sspai.com/post/33549
- MDN, text-autospace: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-autospace
- MDN, text-spacing-trim: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-spacing-trim
- MDN browser-compat-data, text-autospace: https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/text-autospace.json
- MDN browser-compat-data, text-spacing-trim: https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/text-spacing-trim.json
- Chrome for Developers, "Introducing four new international features in CSS": https://developer.chrome.com/blog/css-i18n-features
- Jen Simmons on Safari's conservative default (csswg list, Jun 2025): https://lists.w3.org/Archives/Public/public-css-archive/2025Jun/0774.html
- Firefox 145 enablement (i18n list, Oct 2025): https://lists.w3.org/Archives/Public/public-i18n-archive/2025OctDec/0050.html
- WeChat XWeb UA sample, Chrome 122 (TesterHome, 2024): https://testerhome.com/topics/39837
- X5/XWeb lagging system WebView (sspai): https://sspai.com/post/57504

---

## 3. Fonts for Simplified Chinese

### What each platform ships (W3C clreq system-font mappings, last verified 2026-09-03)

| Platform | Sans (Hei) | Serif (Song) |
|---|---|---|
| Windows 11 | **Microsoft YaHei** 微软雅黑 (built in). DengXian, SimHei (optional features) | **SimSun / NSimSun** 宋体 (built in) |
| macOS | **PingFang SC** 苹方, Heiti SC, Hiragino Sans GB | **Songti SC** 宋体-简, STSong |
| iOS / iPadOS | PingFang SC, Heiti SC | Songti SC |
| Android (AOSP) | **Noto Sans CJK SC** (system fallback) | Noto Serif CJK SC (system fallback) |
| HarmonyOS / OpenHarmony | **HarmonyOS Sans SC** (system fallback) | none configured |
| Linux (packages) | Noto Sans CJK SC, WenQuanYi Zen Hei | Noto Serif CJK SC |

- For `lang` zh-Hans, the generic families map to these: `sans-serif` gives YaHei, PingFang, Noto Sans CJK SC or HarmonyOS Sans SC. `serif` gives SimSun, Songti SC or Noto Serif CJK SC.
- The clreq table lists PingFang SC as "downloadable" for macOS and iOS. In practice it has been the system Chinese UI font since about macOS 10.11 and iOS 9, and CSS can name it **(general knowledge, not re-verified)**.
- **Android:** Chrome generally cannot match CJK fonts by family name. Chinese text falls back to the system CJK font chosen by `lang`, and on Xiaomi, Huawei, OPPO and vivo phones that is the vendor's system font (such as MiSans or HarmonyOS Sans) **(unverified)**. Naming `MiSans`/`HarmonyOS Sans SC` in the stack is harmless, and it helps PC users who installed those free fonts.

### Measured: what the current Korean fonts do to Chinese

I downloaded the site's own font resources on 2026-10-16 and checked their coverage (fontTools and `unicode-range` parsing):

- **Pretendard 1.3.9** (`PretendardVariable.ttf`): **0** CJK Unified Ideographs (U+4E00 to U+9FFF), but **every** Chinese punctuation mark I tested is present: `，。、；：？！“”‘’（）《》【】—…·`. Fontsource also describes Pretendard as Inter, Source Han Sans KR and M PLUS 1p, supporting Korean, Latin, Greek and Cyrillic.
  - **Consequence:** with `"Pretendard Variable"` first in the stack, Han characters fall back to the system Chinese font while the punctuation renders in Pretendard. You get a Korean-design comma and full stop inside a PingFang or YaHei sentence, and different metrics and weight.
  - The variable woff2 is **2.06 MB**, a large download that Chinese readers gain nothing from.
- **Noto Serif KR** (Google Fonts CSS, 124 `@font-face` slices): its `unicode-range`s cover **4,620** CJK Unified Ideographs, the Korean Hanja set. Simplified forms are mostly absent. Of a 60-character sample of everyday simplified text, only `我家留移民申大究生入` were covered; `们这个国学说为时会对发经过进来还没长门问间关见话请让读书写语东车马鸟鱼专业签证研` were not.
  - **Consequence:** a heading like `移民申请` or `美国大学` mixes two fonts character by character. `移民申`/`大` render in Noto Serif KR in Korean glyph style; `请`/`国`/`学` render in whatever fallback serif is available. This patchwork is very visible in display-size headings.
- **Glyph shapes.** Even shared characters are drawn to Korean regional norms in a KR font. Pan-CJK fonts such as Source Han and Noto CJK carry separate SC, TC, JP and KR glyphs for the same code point, and some common characters (直, 骨 and others) look different. Browsers pick the right regional glyphs only if the font has them and `lang` is set.

### `lang="zh-CN"` vs `zh-Hans` for glyph and font selection

- **Chrome/Blink:** converts the BCP 47 tag to a script for font fallback. A Blink engineer wrote that internally it maps `zh-Hans` to zh-CN (W3C i18n-cjk list, 2016).
- **Firefox:** `nsLanguageAtomService::GetUncachedLanguageGroup` maps script `Hans` to the Chinese (zh-CN) language group, and plain `zh` without HK or TW also maps to zh-CN.
- **WebKit:** has a layout test (`fallback-language-han.html`) checking that `lang="zh-Hans"`/`"zh-Hant"` steer Han fallback.
- **W3C:** prefers script subtags for meaning. A 2023 draft by Richard Ishida notes `zh-CN` really means "Chinese as used in the PRC", not specifically Simplified script. W3C's language-tag article accepts existing `zh-CN`/`zh` use.
- **Real mainland sites:** apple.com.cn and taobao.com use `lang="zh-CN"`, zhihu.com uses `lang="zh"`, and baidu.com sets none (checked 2026-10-16).

**Recommendation.** `<html lang="zh-CN">`. It works in all three engines, is the de facto value on mainland sites, and matches `og:locale` `zh_CN`. Use `zh-Hans` in `hreflang` (section 5). Avoid bare `zh`: it is ambiguous, and Chrome's handling of `zh` without a region depends on the browser UI locale **(unverified)**. CSS `:lang(zh)` matches both `zh-CN` and `zh-Hans`.

### Recommended font stacks

Body and UI (sans), using system fonts only:

```css
:root:lang(zh) {
  --zh-sans:
    -apple-system, BlinkMacSystemFont,      /* Apple: SF for Latin/digits, then PingFang below */
    "PingFang SC", "Hiragino Sans GB",       /* macOS, iOS */
    "HarmonyOS Sans SC", "MiSans",           /* Huawei/Xiaomi, or PCs where users installed them */
    "Microsoft YaHei", "Microsoft YaHei UI", /* Windows: YaHei has taller, body-friendly metrics; the UI variant is tighter */
    "Noto Sans CJK SC", "Noto Sans SC", "Source Han Sans SC", /* Linux, and PCs with them installed */
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;  /* Android ends at sans-serif -> Noto Sans CJK SC via lang */

  /* Only if a serif look is wanted (see headings note). */
  --zh-serif:
    "Songti SC", "STSong",
    "Noto Serif CJK SC", "Noto Serif SC", "Source Han Serif SC",
    SimSun, serif;
}

html:lang(zh) body,
html:lang(zh) button,
html:lang(zh) input,
html:lang(zh) textarea,
html:lang(zh) select {
  font-family: var(--zh-sans);
}

/* Headings: clreq says Hei or bold Song. Use the sans stack, bold. */
html:lang(zh) h1,
html:lang(zh) h2,
html:lang(zh) h3,
html:lang(zh) .hero-title,
html:lang(zh) .section-title {
  font-family: var(--zh-sans);
  font-weight: 700;   /* YaHei has only Light/Regular/Bold, so 600 renders as Bold there anyway */
}
```

**Headings: why not system serif.** SimSun, the Windows Song face, is a thin, screen-hinted body face with no real bold, so headings get a faux bold that looks dated at display sizes. Songti SC on Apple looks good, so headings would look very different across platforms (design judgment). Bold sans is the safe cross-platform choice and is explicitly sanctioned by clreq §7.1.3.2.

**If the brand needs a serif heading font.** Self-host Noto Serif SC (OFL) on onevisionconsulting.us, never from Google:
- Either subset it at build time to only the characters used in `/zh/` headings (e.g. `pyftsubset` over the translated strings), or copy Google's sliced files. Google splits Noto Serif SC 700 into **101** `unicode-range` slices (measured).
- Use `font-display: swap` and apply it to headings only.

```css
@font-face {
  font-family: "OV Serif SC";
  src: url("/fonts/noto-serif-sc-700-subset.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;   /* text shows immediately in the system font if this is slow */
}
html:lang(zh) h1, html:lang(zh) h2 {
  font-family: "OV Serif SC", var(--zh-serif);
}
```

**Sources**
- W3C clreq, system font mappings (verified 2026-09-03): https://w3c.github.io/clreq/others/system-font-mappings.html
- clreq §7.1.3.2 (heading faces): https://www.w3.org/TR/clreq/
- Fontsource, Pretendard (composition and language support): https://fontsource.org/fonts/pretendard/about
- Pretendard 1.3.9 files checked: https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/public/variable/PretendardVariable.ttf and `.../dist/web/variable/pretendardvariable.css`
- Google Fonts CSS checked: `https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500` and `...family=Noto+Serif+SC:wght@700`
- Blink mapping zh-Hans to zh-CN (W3C public-i18n-cjk thread, 2016): https://lists.w3.org/Archives/Public/public-i18n-cjk/2016JulSep/0038.html
- Firefox language-group mapping: https://searchfox.org/mozilla-central/source/intl/locale/nsLanguageAtomService.cpp
- WebKit Han fallback test: https://webkit.googlesource.com/WebKit/+/master/LayoutTests/fast/text/fallback-language-han.html
- W3C, Choosing a language tag: https://www.w3.org/International/questions/qa-choosing-language-tags
- R. Ishida draft on zh-CN meaning (2023): https://lists.w3.org/Archives/Public/public-i18n-archive/2023JulSep/0166.html

---

## 4. Access from mainland China

### Third-party hosts the site uses (GreatFire.org monitoring, read 2026-10-16)

| Host | GreatFire verdict | Caveat |
|---|---|---|
| fonts.googleapis.com | Not blocked; latest test 2026-08-18 | 1 conclusive test in 90 days |
| fonts.gstatic.com | Not blocked (HTTP verdict 2026-03-21) | no tests in the last 90 days |
| cdn.jsdelivr.net | HTTP reachable 2026-07-17; **HTTPS "Intermittent"** | Across 148 jsdelivr.net URLs: 57 accessible, **77 disrupted, 12 blocked**. A jquery file page has been monitored since 2024, previously shown partially disrupted, normal on 2026-10-15 |
| unpkg.com | Not blocked; 2026-10-14 | Across 37 unpkg URLs: 2 blocked, **25 disrupted**, 10 accessible |
| cdnjs.cloudflare.com | Not blocked; 2026-08-21 | 1 conclusive test |
| kakao.com (KakaoTalk open chat links) | **"All blocked"** across 28 URLs | open.kakao.com itself not tested |
| cdn-icons-png.flaticon.com (3 staff pages) | not tested; flaticon.com "Mixed" | |
| onevisionconsulting.us | **not yet tested** | |

**Background**
- **jsDelivr:** lost its China ICP licence on 2021-12-20. Its regional CDN account was disabled, and Chinese traffic moved to "near China" locations of global CDNs (jsDelivr's GitHub statement, reposted on a Chinese forum). A Chinese Wikipedia mirror reports DNS poisoning and a full block around May to June 2022 **(secondary source)**.
- **Google Fonts:** was blocked or very slow from 2014 onward, per many developer reports through 2022. China-market vendors (AppInChina, Chinafy) still advise self-hosting.
- **Reading the data:** GreatFire's recent "not blocked" results are single tests, and GreatFire itself revises verdicts. Read them as "sometimes reachable", not "reliable".

### What happens when a render-blocking stylesheet in `<head>` cannot load

- A `<link rel="stylesheet">` blocks first paint until it loads or fails.
- **If the request is reset or refused quickly**, the page renders almost at once without that CSS (here, just without the web fonts).
- **If packets are silently dropped** (a blackhole, or DNS poisoning to an unreachable address), the browser waits for its network timeout, and **the user sees a blank page the whole time**:
  - Steve Souders, Beijing, 2012: a blocked synchronous third-party resource held a page white for **1 minute 15 seconds**. He notes "the true cause of frontend SPOF is loading a script, stylesheet, or font file in a blocking manner".
  - Harry Roberts (CSS Wizardry), blackholing `fonts.googleapis.com`: about **78 to 80 seconds** before render, with `DOMContentLoaded` and `load` delayed by the same amount.
  - Timeouts vary by browser and OS (tens of seconds).
- **Font files** (`fonts.gstatic.com`) are not render-blocking. With `display=swap` (which the site uses), text shows in a fallback font while they load. The **CSS file** from `fonts.googleapis.com`, and the Pretendard CSS from jsDelivr, are the blocking risk.

### Recommendation for `/zh/` pages

1. **No third-party render-blocking resources.**
   - Remove the Google Fonts and Pretendard `<link>`s, every `preconnect` to fonts.gstatic.com, and any `@import` of them.
   - Use system fonts (section 3).
   - The in-progress build does this: `dropExternalFonts()` in `build-locale.js`. I checked the generated files: 0 of 42 `/zh/` pages reference googleapis or jsDelivr, and none has a preconnect.
2. **Self-host anything else external.**
   - Copy the 18 `cdn-icons-png.flaticon.com` images on the three staff pages into `/images/`. They are not render-blocking, but they may break.
   - Any future web font goes on the same host, with `font-display: swap`.
3. **Contact channels.** Instagram, Facebook, YouTube, Naver and Kakao links work poorly or not at all in mainland China (kakao.com is "All blocked" above). On `/zh/`, offer email, the site's own consultation form (`api/consult.php` is same-origin) and, if the business wants, a WeChat ID or QR code. This is a business decision.
4. **No Google-hosted features** (reCAPTCHA, Maps, YouTube embeds) on `/zh/`. I found none in the current pages.
5. **Optional, for the Korean and English pages too.** The same blank-page risk applies to any visitor on a network that blackholes Google or jsDelivr. Self-hosting Pretendard and Noto Serif KR, or loading the CSS without blocking render, would remove it. This is out of scope for `/zh/`.

### Hostinger and its CDN

- The live site is served by Hostinger's CDN: response headers `server: hcdn`, `x-hcdn-request-id`, `platform: hostinger`. It resolves to 191.101.104.113 and 195.35.60.125 plus two IPv6 addresses.
- **Locations:** Hostinger's server-location article lists Asian data centres in India, Indonesia and Malaysia (other sources also list Singapore). It says the CDN runs in "additional locations, such as Johannesburg (South Africa), Japan, and Sydney (Australia)". It names **no mainland China or Hong Kong presence**, and I found no Hostinger statement about China.
- **Expectations:** mainland visitors cross the border to Japan or Southeast Asia nodes. Expect higher and more variable latency. The site needs no ICP filing, because ICP only applies to hosting inside mainland China.
- **Blocking status:** whether Hostinger's shared CDN IPs are blocked is **unverified**. The domain is untested on GreatFire. Before launch, run a check from inside China: GreatFire's "Test now", or a Chinese multi-node speed test such as 17CE, ITDOG or BOCE (tool names from general knowledge, **unverified**). Running a test submits the URL to a third party, so the site owner should do it.

**Sources**
- GreatFire analyzer pages: https://en.greatfire.org/fonts.googleapis.com , https://en.greatfire.org/fonts.gstatic.com , https://en.greatfire.org/cdn.jsdelivr.net , https://en.greatfire.org/https/cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js , https://en.greatfire.org/unpkg.com , https://en.greatfire.org/cdnjs.cloudflare.com , https://en.greatfire.org/open.kakao.com , https://en.greatfire.org/cdn-icons-png.flaticon.com , https://en.greatfire.org/onevisionconsulting.us
- jsDelivr ICP loss, Dec 2021 (repost of the official GitHub reply): https://forum.springdoc.cn/t/topic/4657
- Steve Souders, "Frontend SPOF in Beijing": https://stevesouders.com/blog/2012/03/28/frontend-spof-in-beijing/
- Harry Roberts, "Performance and Resilience: Stress-Testing Third Parties": https://csswizardry.com/2017/07/performance-and-resilience-stress-testing-third-parties/
- AppInChina, "Does Google Fonts API work in China?": https://appinchina.co/does-google-fonts-api-work-in-china
- Chinafy, "How to fix font loading issues in China": https://www.chinafy.com/blog/how-to-fix-font-loading-issues-in-china
- Hostinger, server locations: https://www.hostinger.com/support/1583267-where-are-hostinger-servers-located/

---

## 5. SEO for the Chinese subfolder

### hreflang

- **Use `hreflang="zh-Hans"`.** Google: "Only language codes listed in ISO 639-1 and region codes listed in ISO 3166-1 Alpha 2 are supported", and "You can also specify the script itself explicitly using ISO 15924". The examples list `zh-Hant` (Traditional) and `zh-Hans` (Simplified), and `zh-Hans-US`.
  - `zh-Hans` targets Simplified-Chinese readers wherever they are (mainland, students already in the US, Singapore, Malaysia).
  - `zh-CN` would describe China-region targeting. Not needed here.
- **Full set on every page.** "Each language version must list itself as well as all other language versions." Return links are mandatory: if X links to Y, Y must link back to X. The Korean root pages therefore also need the `zh-Hans` line. The in-progress build and the source pages now have it: I checked `index.html`, `about.html` and `en/index.html`.
- **`x-default`:** keep it pointing at the Korean root, or at `/en/` if the owner prefers English for unmatched languages (business choice).
- **Canonical:** each language version self-canonicalises (`/zh/about.html` → itself). Never canonicalise `/zh/` to Korean.
- **Blog:** blog posts are Korean-only. They must **not** carry `zh-Hans` or `en` alternates pointing at pages that do not exist.
- **The `lang` attribute:** "Google doesn't use `hreflang` or the HTML `lang` attribute to detect the language of a page". It uses the visible text, so the `<title>`, description and body must actually be Chinese. Keep `lang="zh-CN"` for fonts, kinsoku and accessibility.

### Head template for a `/zh/` page

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>OneVision | 美国留学与移民一站式咨询</title>  <!-- translated -->
  <meta name="description" content="…简体中文描述…">  <!-- translated -->
  <!-- Optional; see Baidu below. HTML validators flag this pragma as obsolete. -->
  <meta http-equiv="content-language" content="zh-CN">
  <link rel="canonical" href="https://onevisionconsulting.us/zh/about.html">
  <link rel="alternate" hreflang="ko" href="https://onevisionconsulting.us/about.html">
  <link rel="alternate" hreflang="en" href="https://onevisionconsulting.us/en/about.html">
  <link rel="alternate" hreflang="zh-Hans" href="https://onevisionconsulting.us/zh/about.html">
  <link rel="alternate" hreflang="x-default" href="https://onevisionconsulting.us/about.html">
  <meta property="og:locale" content="zh_CN">
  <meta property="og:locale:alternate" content="ko_KR">
  <meta property="og:locale:alternate" content="en_US">
  <!-- no Google Fonts / jsDelivr links here -->
  <link rel="stylesheet" href="/css/zh.css?v=…">
</head>
```

### Baidu

There is no official Baidu documentation in what I could reach. Everything below comes from third-party SEO sources, some old.
- **hreflang:** Baidu reportedly does **not** support it. Advance Metrics (2016): "is currently not supported by Baidu". http.dev says Bing and Baidu rely on the `Content-Language` meta tag or HTTP header instead.
  - Adding `<meta http-equiv="content-language" content="zh-CN">` on `/zh/` only is cheap and harmless. Its benefit is unproven.
  - The HTML Standard calls this pragma non-conforming and recommends `lang` **(from memory, not re-verified)**.
  - Hostinger did not send a `Content-Language` response header on the live site.
- **JavaScript:** Advance Metrics (2016) says Baidu "cannot crawl iFrames, JavaScript or Flash".
  - The site's header and footer are injected by JavaScript (`loadHeader()` fetches `header.html`). Baidu therefore never sees the nav or the language links, only the body and `<head>`.
  - Bake the header and footer into the generated `/zh/` HTML at build time. `loadHeader()` already skips the fetch when `<header>` has children, which is how the blog works today.
- **Hosting:** Baidu reportedly favours China-hosted sites, and Advance Metrics in 2016 said Baidu still read meta keywords. Overseas hosting means slower crawling. ICP-licensed hosting in China would be a separate, larger project.
- **Baidu webmaster platform:** submit the sitemap via Baidu 搜索资源平台 (ziyuan.baidu.com). Account and verification requirements for foreign sites are **unverified**.
- **Outdated advice to ignore:** the 2016 advice to avoid HTTPS for Baidu is outdated. Keep HTTPS.

### Sitemap and the rest

- **Sitemap:** `scripts/build.js` `buildSitemap()` (in-progress version) now lists every static page for ko, en and zh. That is sufficient, because hreflang lives in the HTML `<head>`, one of Google's three accepted methods.
  - Optional: add `xhtml:link` alternates in the sitemap (needs `xmlns:xhtml="http://www.w3.org/1999/xhtml"`).
  - Optional: a separate sitemap for Baidu.
- **No auto-redirects by IP or `Accept-Language`.** Googlebot crawls mostly from the US, and the UX sources in section 6 advise against redirects.
- **Other in-scope items:**
  - Translate `<title>`, meta description, `alt` text and JSON-LD text.
  - If any JSON-LD carries `inLanguage`, set it to `zh-CN`. None found in `/zh/` now.
  - Register `/zh/` in Google Search Console (it is covered by the domain property) and in Bing Webmaster Tools.

**Current gaps in the generated `/zh/` pages** (checked 2026-10-16):
- `<title>` and meta description are still Korean (e.g. `zh/index.html`), presumably because the translation memory is not yet merged.
- No page has `og:locale`: the source pages have none, so the build's `og:locale` rewrite is a no-op.
- `<header></header>` is empty, so the header is JavaScript-injected.

**Sources**
- Google Search Central, "Tell Google about localized versions of your page": https://developers.google.com/search/docs/specialty/international/localized-versions
- Advance Metrics, Baidu SEO guide (2016): https://www.advance-metrics.com/en/blog/baidu-seo-guide
- http.dev, hreflang (Bing/Baidu use Content-Language): https://http.dev/hreflang

---

## 6. Language switcher UX with three languages

### What the guidance says

- **Labels: endonyms.** W3C: a link to French "should read 'français'", not "French". Smashing: "Label languages locally". Digital.gov (US Web Design System, 3+ languages): each option in its native name, optionally paired with an English gloss in the link title.
- **No flags.** Smashing: "flags are specific to countries, but languages often cross borders". W3C's link-language article: "Flags represent countries, not languages". Digital.gov: "Flags do not map to languages". A globe or translate icon is acceptable (Smashing; W3C notes globe icons are increasingly used).
- **Avoid shorthands.** Smashing: "Avoid language shorthands or initials". Browsers' auto-translate also translates them.
- **Placement.** W3C: top of the page, preferably top right for left-to-right scripts, never only at the bottom. Smashing: "in the header as well as in the footer". Digital.gov: top right, above the site navigation; if the header is sticky, the selector lives in it so it stays put.
- **Dropdown vs list.** W3C: for a handful of versions, direct links are often better than a pull-down. Digital.gov's 3+ language pattern uses a button that opens a list. With exactly three short labels, either works. The site's compact header favours a button with a short list.
- **Show the current language.** Smashing highlights it. The button label shows the current language, and the list marks it.
- **Go to the equivalent page.** Digital.gov: "Take users to an equivalent page". Fall back to the language's home page only when no equivalent exists (the Korean-only blog).
- **No auto-redirects.** Smashing: "Nudge users, but avoid auto-redirects". Digital.gov: auto-redirect is "confusing and disorienting".
- **NN/g:** I found only "Language switching in ecommerce" (language switchers vs country switchers). It has no specific rules beyond the above.

### Accessible markup

- **WAI-ARIA disclosure pattern** (APG "disclosure navigation"):
  - A `<button>` with `aria-expanded` and `aria-controls` toggles a list of links.
  - The page explicitly does **not** use the `menu` role, because site navigation "does not need all the keyboard interactions specified by the menu and menubar pattern".
  - Escape closes the list and returns focus to the button. Arrow keys are optional.
  - Use `aria-current="page"` on the link to the page currently displayed.
  - `aria-haspopup="true"` means "menu" to assistive tech, so leave it out.
- **Language on each link.** Put `lang` on each endonym (WCAG 3.1.2 Language of Parts, so screen readers switch voices) and `hreflang` on each `<a>`. W3C: hreflang "is supposed to indicate the language of the document at the other end of the link". Browsers do not act on it, but it is correct metadata.
- **`translate="no"`** on the switcher keeps Google Translate and Chrome's page translation from turning "한국어 / English / 简体中文" into the viewer's language (MDN).
- **Label in Name (WCAG 2.5.3).** The button's accessible name must contain its visible text, best at the start. An `aria-label` that replaces "한국어" with "Language / 언어 / 语言" fails this.

### How to label Chinese: 中文 vs 简体中文

- **Use 简体中文 in the list** (or 中文（简体）):
  - It names the script, sets expectations for Taiwan and Hong Kong readers, and stays unambiguous if 繁體中文 is ever added.
  - Wikipedia's Android app switched to explicit 简体中文 / 繁體中文 labels. OpenStreetMap uses 中文（简体）, 中文（繁體）, 中文（香港）.
- **中文 is fine as the compact label** on the button on small phones.

### Recommended markup

```html
<div class="lang-menu" data-i18n="skip" translate="no">
  <button class="lang-switch" type="button" aria-expanded="false" aria-controls="langMenuList">
    <svg aria-hidden="true"><!-- globe --></svg>
    <span class="lang-menu-current">한국어</span>
    <!-- Name starts with the visible text, then says what the control is. -->
    <span class="visually-hidden"> (Language / 언어 / 语言)</span>
    <svg class="lang-menu-caret" aria-hidden="true"><!-- caret --></svg>
  </button>
  <ul class="lang-menu-list" id="langMenuList" hidden>
    <li><a href="/about.html"    hreflang="ko"      lang="ko"    aria-current="page">한국어</a></li>
    <li><a href="/en/about.html" hreflang="en"      lang="en">English</a></li>
    <li><a href="/zh/about.html" hreflang="zh-Hans" lang="zh-CN">简体中文</a></li>
  </ul>
</div>
```

```css
.visually-hidden {
  position: absolute !important; width: 1px; height: 1px; overflow: hidden;
  clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap;
}
```

- **Mobile:** keep the button in the always-visible top bar. Do not hide it inside the hamburger menu, where users would have to know to open the menu first.
- **Footer:** repeat it as a plain inline list of the same three links. It works without JavaScript once baked into the HTML, and it gives crawlers static links.
- **Fixed order:** keep the same order on every page (한국어, English, 简体中文) so the position never moves.

**Sources**
- Smashing Magazine (Vitaly Friedman), "Designing A Perfect Language Selector UX": https://www.smashingmagazine.com/2022/05/designing-better-language-selector/
- U.S. Web Design System, Select a language, three or more languages: https://designsystem.digital.gov/patterns/select-a-language/three-or-more-languages/
- W3C i18n, "Language selection: navigation": https://www.w3.org/International/questions/qa-navigation-select
- W3C i18n, "Indicating the language of a link destination": https://www.w3.org/International/questions/qa-link-lang
- W3C WAI-ARIA APG, Disclosure navigation example: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
- W3C WCAG 2.2 Understanding 2.5.3 Label in Name: https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html
- W3C WCAG 2.2 Understanding 3.1.2 Language of Parts (not fetched this session): https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html
- MDN, `translate` attribute: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/translate
- NN/g, Language switching in ecommerce: https://www.nngroup.com/articles/language-switching-ecommerce/
- Wikimedia Phabricator T188185 (简体中文 / 繁體中文 labels): https://phabricator.wikimedia.org/T188185
- OpenStreetMap language dialog PR #6313 (zh labels): https://lists.openstreetmap.org/pipermail/rails-dev/2025-August/043418.html

---

## 7. The repo: what has to change for three languages

### Original two-language state (as read at the start of this session)

- **`public_html/header.html`:**
  - A single `<a class="lang-switch" href="/en/" hreflang="en" lang="en" aria-label="English" data-i18n="skip">` holds a globe icon, a `.lang-switch-label` ("English") and a `.lang-switch-short` ("EN", shown at ≤520px).
  - It sits in `.nav-cta`, so it stays visible on phones beside the CTA and hamburger.
  - The CSS (pill button, 40px or 36px tall, label hidden at ≤520px) lives in the same file.
- **`public_html/js/common.js`, `setLangSwitch()`:** finds the one `.lang-switch` and flips between `/page` and `/en/page`. Blog pages go to `/en/`. It keeps `location.hash` and re-runs on `hashchange`.
- **`scripts/i18n/build-en.js`:** rewrote that link on English pages to `href="/"`, `hreflang="ko"`, `lang="ko"`, label "한국어". It wrote `ko`, `en` and `x-default` alternates.
- **Problem:** a single toggle link cannot express three targets. It has to become a button that opens a list.

### Changes needed (checklist)

1. **Header markup.**
   - Replace the `<a class="lang-switch">` with the disclosure structure in section 6: a button showing the current language plus a hidden `<ul>` of three links, each with `lang`, `hreflang` and a `data-lang` key.
   - Add `translate="no"` and keep `data-i18n="skip"`.
2. **Header CSS.**
   - Add list positioning (absolute, right-aligned under the button, `z-index` above the sticky header), the `[hidden]` state, hover and focus styles, and a marker for the current item.
   - Keep the ≤520px short label. Consider keeping the globe icon visible on phones so the control reads as "language" even when the short label is unfamiliar.
3. **`common.js`.**
   - Generalise `setLangSwitch()` to compute the counterpart for every language from one table (`{ ko: "", en: "/en", zh: "/zh" }`): strip any `/en` or `/zh` prefix to get the page path, then prefix it per language.
   - Set `aria-current="page"` on the current one.
   - Blog pages: `ko` keeps the same blog URL, `en` and `zh` go to `/en/` and `/zh/`.
   - Add `toggleLangMenu()`, close on outside click and Escape (return focus to the button), and update `aria-expanded`.
4. **Build.**
   - Per locale, set `<html lang>`, the button's current label and short label, canonical, the full `ko` + `en` + `zh-Hans` + `x-default` alternate set, and `og:locale`.
   - For zh: drop the external font links and preconnects, and append `zh.css`.
   - Add the `zh-Hans` alternate to the Korean source pages and the English build too.
   - Add `/zh/` URLs to the sitemap.
5. **Header layout.** `header.html` has English-only rules (`html[lang="en"]` nav sizing, hamburger below 1180px). Check the `/zh/` nav at 961 to 1180px. Chinese labels are short like Korean, so the Korean rules probably fit, but confirm visually.

### Review of the in-progress implementation (working tree, about 17:30 PT 2026-10-16)

**Already done and consistent with this research**
- **Menu:** a disclosure button with `aria-expanded`/`aria-controls`, a `<ul hidden>` of three links with `lang`/`hreflang`, a generalised `setLangSwitch()` with a `LANG_DIRS` table, blog fallback, hash preserved, outside-click and Escape close with focus return.
- **`build-locale.js`:**
  - `en` and `zh` locales.
  - `htmlLang: "zh-CN"`, `ogLocale: "zh_CN"`.
  - `ALTERNATES` with `zh-Hans`.
  - `dropExternalFonts`: verified 0 external font links or preconnects in the 42 `/zh/` files.
  - `zh.css` appended last.
- **Source pages:** Korean source pages and `/en/` now list the `zh-Hans` alternate.
- **Sitemap:** `buildSitemap()` lists the `/zh/` URLs.
- **`css/zh.css`:**
  - Resets `word-break: normal !important`, `line-break: strict` and `overflow-wrap: break-word`.
  - The system font stack matches section 3.
  - Body `line-height: 1.75`. Headings 600 sans with `letter-spacing: 0`. Korean negative tracking is reset.

**Issues to fix**
1. **`aria-haspopup="true"`** on the button announces a menu (role `menu`) that is not there. Remove it (APG disclosure pattern).
2. **`aria-label="Language / 언어 / 语言"`** overrides the visible label (한국어 / English / 中文), which fails WCAG 2.5.3 Label in Name. Fix one of two ways:
   - Remove the `aria-label` and add a visually hidden suffix span (section 6).
   - Or have the build write a per-locale `aria-label` that **starts with** the visible label, e.g. `中文 (Language / 언어 / 语言)`.
   - Either way, the ≤520px rule hides `.lang-switch-label` with `display:none` and `.lang-switch-short` is `aria-hidden`. The accessible name must therefore come from the hidden span or the `aria-label`.
3. **`aria-current`:** use `"page"` instead of `"true"` (APG). The CSS selector `a[aria-current="true"]` would need the same change.
4. **`translate="no"`:** add it to `.lang-menu`.
5. **Label:** consider 简体中文 for the list item and the desktop button label, keeping 中文 as the short label (section 6). `LOCALES.zh.label` is used in both places, so split it into `label` and `listLabel`, or edit the `<li>` text in `header.html`.
6. **The `中文` link's lang:** it has `lang="zh-Hans"` while `<html lang="zh-CN">`. Both are valid, and fallback is identical in Chrome, Firefox and WebKit. For consistency, either is fine. Keep `hreflang="zh-Hans"`.
7. **Bake the header (and footer) into `/zh/` HTML at build time.** It is currently `<header></header>` filled by `fetch`. That gives non-JavaScript crawlers (Baidu) the nav and language links, and saves a round trip for China visitors. `loadHeader()` already supports a pre-filled header.
8. **Untranslated head:** `<title>` and meta description on `/zh/` pages are still Korean. Make sure the head strings are in the zh translation memory and that `check-zh.js --memory --all` covers them.
9. **`og:locale`:** no page has one, so the build's rewrite does nothing. Add `og:locale` (and `og:locale:alternate`) in the build if social sharing previews matter.
10. **Spacing house style:** create `i18n/glossary.zh.json` with `"spacing": "space"` so `check-zh.js` enforces Chinese–Latin spaces. Add `text-autospace: no-autospace` to `zh.css` (section 2).
11. **Optional additions to `zh.css`** (section 1): justify article paragraphs only, `max-width: 38em` for article text, upright `em`/`i`, and a `@media (max-width: 640px)` body `line-height: 1.7`.
12. **Contact and social:** Kakao, Instagram, Facebook and YouTube are unusable for most mainland visitors. This needs a business decision on a WeChat or email path for `/zh/`. Self-host the 18 flaticon images.

---

## Unverified or open items

- **GB/T 15834/15835:** whether either says anything about Chinese–Latin spacing. Full text not read.
- **WeChat Android (XWeb):** the current Chromium version, and therefore `text-autospace` support. The last data point is Chrome 122 (2024).
- **Chrome and bare `zh`:** how Chrome resolves bare `lang="zh"` for fonts.
- **Android vendor fonts:** whether vendor system fonts (MiSans, HarmonyOS Sans) can be matched by name in Chrome on Android.
- **Baidu:** official handling of hreflang, `content-language` and JavaScript-rendered content, and webmaster-platform requirements for foreign sites. Only third-party and partly old sources were found.
- **Hostinger:** CDN reachability and latency from mainland China. No Hostinger source; the domain is untested on GreatFire. Needs an in-China test.
- **`content-language` pragma:** its exact non-conforming status in the HTML Standard was not re-verified.
- **Autospace gap size:** the 1/8-ideograph amount in CSS Text 4 was not re-verified.
- **Search budget:** the web search budget for this turn ran out during the last few lookups (WebKit 18.4 release note, Chrome 123 text-spacing-trim post). The browser-compat-data JSON covers those versions instead.

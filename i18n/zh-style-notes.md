# Natural Simplified Chinese for onevisionconsulting.us

A style guide for translators and reviewers of the Simplified Chinese (mainland) version of the OneVision Consulting site. Readers are Chinese-speaking parents. The guide is in English; Chinese examples are inline.

Research date: 2026-10-16. Verification marks used below:

- **[V]** checked in a source opened during this research (URL in section g)
- **[S]** seen only in a search-result summary; the page itself could not be opened
- **[J]** translator judgment or general knowledge; not confirmed by a source in this research

Examples marked with `[ ]` contain placeholders. Fill them only with facts from the Korean or English source pages or from a cited official source. Never fill them with plausible-sounding numbers.

---

## (a) Principles

1. **Say what the firm does, in the order a parent needs it.** Chinese readers flag text as "AI味" when every word is clear but nothing is said: hollow openers, slogan closers, abstract praise. Several sources describe AI Chinese as "correct but empty" (正确的废话) and over-smooth. [V: 科普中国/澎湃 2025-10-17; 王建硕, 腾讯新闻 2026-05-28; 少数派 2026-02-24]
2. **Translate meaning, not structure.** Microsoft's zh-CN localization guide tells translators to rewrite "just like you are writing the contents yourselves", split or simplify sentences, and drop descriptors when that reads better. [V: Microsoft zh-CN Style Guide §2.1.1, §2.1.4]
3. **Facts replace adjectives.** A corpus comparison found human Chinese text carries far more specific numbers than AI text (17.92 vs 6.34 per 1,000 characters). The fix for vague praise is a real, sourced fact; if there is none, delete the praise. Do not invent the number. [V: baibanbao/qu-ai-wei, citing the lieflat-less-ai-tone corpus of 300 AI samples; original corpus not opened]
4. **Plain service register, not sales register.** Mainland agency sites lean on 一站式, 量身定制, 尊享, 高端, 成功率98% and stacked four-character slogans. [V: 新东方前途出国, 启德] Parents have also been warned by courts and media that 保录取, 定向录取 and 内部渠道 are signs of false advertising or fraud. [V: 央视新闻 via 中新网 2026-07-29] Plain wording reads as more trustworthy against that background.
5. **Short sentences, one point each (一句一意).** Target 15 to 30 characters per sentence on web pages. Ruan Yifeng's widely used Chinese writing guide treats any sentence over 40 characters as unacceptable in technical documents and prefers simple and coordinate sentences over complex ones. [V: ruanyf/document-style-guide]
6. **Drop pronouns the reader can supply.** Chinese omits subjects freely. Microsoft's guide says not to translate every pronoun and to omit them when meaning is unaffected. [V: Microsoft zh-CN §4.1.12]
7. **House punctuation rules hold in Chinese too:** no 破折号 `——`, no 间隔号 `·`, light bold, no exclamation marks. Section (d) explains how to work around the places where Chinese convention normally uses these marks.
8. **Do not over-correct.** Some features that "look AI" turned out, in corpus tests, not to separate AI from human Chinese: varied sentence length, passive sentences, nominalization, in-body 首先/其次, parallelism inside one sentence, questions, metaphors. [V: baibanbao/qu-ai-wei, 「不作为改写理由」 table] Fix 被 and nominalization because they make copy stiff and translated-sounding (section c), not because they prove AI authorship.

---

## (b) Word lists

### Never use

| Term or pattern | Why (one line) | Write instead |
|---|---|---|
| 保录, 保录取, 保证录取, 包过, 不录全退, 保1录1 | Guarantees on admission or results are banned in Chinese education advertising (广告法 第二十四条 (一)) and named by a Beijing court as possible false advertising or fraud. [V] | 录取由学校决定 (state the limit honestly) |
| 定向录取, 内部渠道, 特殊渠道, 内推名额, 捐赠名额 | Court and media list these as fraud signals. [V] | Describe the actual service |
| 最, 第一, 顶级, 唯一, 最佳, 国家级 used as claims about OneVision | 广告法 第九条 (三) bans 国家级/最高级/最佳 style wording in ads; readers discount it. [V] Note 最晚, 最多, 最近 as plain words are fine. | A checkable fact, or nothing |
| 成功率X%, 录取率X% (about the firm), "斩获…offer" | Agency sites use these (e.g. 新东方 "签证成功率98%"). [V] Unsourced rates are exactly the "invented statistics" the house style bans. | Only a dated, defined count from the firm's own records, with its source |
| 赋能, 助力, 打造, 闭环, 抓手, 底层逻辑, 赛道, 对齐, 拉通, 颗粒度 | Listed as AI high-frequency or overused business jargon (互联网黑话). [V: baibanbao 黑名单; LifelongLazyLearner; juejin no-ai-slop] | A concrete verb: 帮, 做, 办理, 准备, 安排 |
| 无缝, 无缝衔接, 全方位, 全方位守护, 至关重要, 深入探讨 | AI "拔高词" (inflation words). [V: baibanbao; humanizer-zh #12] 全方位 seen in 新东方 copy "一站式全方位守护". [V] | Say which steps are covered |
| 值得注意的是, 总而言之, 综上所述, 众所周知, 不可否认, 事实上 (as sentence openers) | Top-listed AI 口头禅; 值得注意的是 also called "官样" by 科普中国. [V] | Delete; state the point |
| 在…的时代背景下, 随着…的不断发展, 在当今时代 (openers) | Grand opener that carries no information. [V: humanizer-zh #30; LifelongLazyLearner] | Start with the page's subject |
| 让我们…, 开启…之旅, 扬帆起航, 拭目以待 | Slogan or "起跑式铺垫"; humanizer-zh flags 让我们 openers and 总而言之，让我们拭目以待 closers. [V] 开启…之旅 and 扬帆起航 [J] | A plain CTA: 预约咨询 |
| 不是X，而是Y / 不仅是X，更是Y when X is a straw man | "翻案腔" and "不仅…更…" frames are flagged when both halves are abstract; AI rate 0.70 per 1,000 characters for the straw-man form. [V: baibanbao; LifelongLazyLearner; humanizer-zh #1] | State Y directly |
| Stacked four-character slogans (e.g. 启德: 早融国际环境，锤炼语言思维，锻造独立人格，直达世界名校…) | Four-character 排比 is a named AI and marketing pattern. [V: humanizer-zh #29; 启德 page] | One plain sentence |
| 圆梦, 梦校, 名校直通车, 赢在起跑线, 直达名校 | Dream and shortcut language implies a promised outcome. 直达世界名校 and 赢在…起跑线 observed on 启德. [V] 圆梦/名校直通车 not found on the pages checked. [J] | 申请美国大学 |
| 尊享, 高端定制, 精英, 专属方案 | Luxury signalling (新东方 "美国硕博尊享计划", 启德 "尊享高端申请规划服务"). [V] | Name the service |
| 名额有限, 抓紧上车, 立即抢占, 限时 | Pressure tactics; 启德 uses 抓紧上车 [V]; manufactured urgency is a warned-about agency tactic [S] | 预约咨询 |
| 亲, 宝爸宝妈, 家长朋友们, 小编, 我司 | Wrong register for a professional consultancy. [J] | 家长, 您, 我们 |
| `——` (破折号), `—` (一字线), `·` (间隔号), `！` | House rule. Microsoft's zh-CN guide also says the em dash should not be used in Chinese because it looks like 一. [V] AI text uses 破折号 about 3 times the human rate (Claude about 5 times). [V: baibanbao] | See section (d) |
| Student names or photos presented as proof that the service works | 广告法 第二十四条 (三) bans using 受益者 (beneficiaries) to endorse education services in China. Whether Chinese ad law applies to a U.S. site is a legal question [J]; the reader expectation exists either way. | Describe the process, not testimonials as proof |

### Avoid unless needed

| Term or pattern | When it is acceptable | Usual fix |
|---|---|---|
| 一站式 | OneVision really is one-stop (admissions plus partner law firm). Use it at most once per page, immediately followed by what it means. | 升学和移民，可以在同一处咨询 (see c, pair H7) |
| 量身定制, 个性化, 定制 | Almost never; every agency says it. [V: 新东方 "资深顾问量身定制留学规划方案"] | Say what is individual: 选校名单按孩子的成绩、兴趣和预算来定 |
| 专业, 优质, 高效, 贴心, 资深, 经验丰富 | Only with the fact behind it in the same sentence | Replace with the fact (years, role, licence) or delete |
| 致力于, 提供…服务, 为您提供 | Rarely; 提供 is fine for concrete objects (提供成绩单) | Use the verb: 我们协助办理签证 |
| 进行, 作出, 加以, 给予 + noun | When no single verb exists (进行面试 is normal) | The verb itself: 评估, 决定, 审核 |
| 相关, 有关 | Fixed terms like 利益相关方 | Name the thing (section e, rule 4) |
| 作为, 关于, 对于…来说, 就…而言, 在…方面, 通过, 基于 | When they disambiguate | Make the object the subject (section c) |
| 被 | Adverse events and set phrases: 被拒签, 被录取, 被退回 | Active voice, or 由 + agent |
| 们 after nouns (顾问们, 家长们) | Direct address: 各位家长 | Drop it when plurality is clear |
| 您 | Addressing the parent where the subject is unclear without it | Omit (section d) |
| 首先/其次/最后 as headings, numbered 一、二、三 headings | Real sequential steps (申请步骤) | Plain headings |
| Colon "reveal" (关键只有一点：…) | Labels, real lists | State it directly |
| Lists of 4+ items joined by 、 inside one sentence | Legally complete lists (required documents) | Bullet list, or keep 3 |
| 此外, 然而, 因此 at the start of every sentence | Where the logical link is real | Drop, or move after the subject |
| 能够, 将会, 进一步 | 进一步了解 as a link label (Apple uses it) [V] | 能, 会 |
| 免费 | Only if truly free; say what is free | 首次咨询免费 ([ ] 分钟) |
| 名校, 藤校, offer, G5, TOP30, 26fall | Parents use these in speech; acceptable in an FAQ question written in the parent's voice | 美国大学, 常春藤盟校, 录取通知, 2026年秋季入学 |
| 之一 | When picking one item out of a named set [V: 余光中 via chinese-forums] | Rephrase |

---

## (c) Translationese and AI patterns: before → after

Background. 余光中 called 作出 and 进行 "弱动词" that break one verb into 作出/进行 + abstract noun, and listed English-driven habits such as 当…的时候, 关于/有关, overused 被, 们, 地 and abstract -性 nouns. [V: vocus summary of 《翻译乃大道，译者独憔悴》; 少数派 PlatyHsu 2025-04-07] 金圣华 (writing on 余光中's 《论的的不休》, 1996) shows how chains of 的 and 被 make translations unreadable. [V] 王力 described 欧化 as largely 英化. [S] 思果's 《翻译研究》 has chapters on pronouns, the passive and common faults. [S: Douban table of contents; book text not consulted]

Source-language note. The Korean source maps onto the same traps: 진행하다 is literally 進行, ~에 대해 becomes 关于/对于, ~을 통해 becomes 通过, ~들 becomes 们, chains of ~의 become chains of 的, and polite Korean endings tempt translators to add 您 to every sentence. Sino-Korean false friends also leak in: 상담 → 咨询 (not 相谈), 합격 → 录取 (not 合格), 입학사정관 → 招生官, 학부모 → 家长, 유학원 → 留学机构, 영주권 → 绿卡 or 永久居留权, 시민권 → 公民身份 or 入籍. [J] Translating from the English version carries the English traps below.

All "after" sentences avoid invented facts. Dates and numbers in syntax examples are illustrative.

### Weak verbs (进行, 作出, 加以, 提供…服务)

| # | Before (stiff) | After (natural) | Note |
|---|---|---|---|
| A1 | 我们将对您孩子的学术背景进行全面评估。 | 我们先评估孩子的成绩和选课。 | 进行 + noun; 将 → 先; 您孩子 → 孩子 |
| A2 | 请您在截止日期之前作出最终决定。 | 请在截止日期前决定。 | 余光中: 做出决定 → 决定 [V] |
| A3 | 我们会对文书进行多轮的修改。 | 文书我们会和孩子一起改几稿。 | Topic-first word order is natural Chinese |
| A4 | 我们为学生提供签证申请方面的指导服务。 | 我们指导学生申请签证。 | 提供…服务 + 方面 |
| A5 | 顾问将与家长进行定期沟通。 | 顾问会定期和家长沟通。 | 进行沟通 → 沟通; 将 → 会 |
| A6 | 我们会对申请材料加以严格审核。 | 申请材料我们逐份审核。 | 加以 + verb |

### Frames: 作为, 关于, 对于…来说, 在…方面, 通过, 基于, 当…的时候, 随着

| # | Before | After | Note |
|---|---|---|---|
| B1 | 作为一家专业的留学咨询机构，我们致力于为学生提供优质的服务。 | OneVision 帮学生申请美国大学，也协助家庭办理移民。 | 作为 + 致力于 + 优质: three flags in one line |
| B2 | 关于申请费用的问题，请您咨询我们的顾问。 | 申请费用请咨询顾问。 | 余光中: 你有关于他的资料吗 → 你有他的资料吗 [V] |
| B3 | 对于国际学生来说，资金证明是必须提交的材料之一。 | 国际学生必须提交资金证明。 | 前置话题壳 → subject [V: baibanbao rule 10] |
| B4 | 在标准化考试方面，部分大学目前实行的是可选政策。 | 部分大学目前不强制要求标化成绩。 | 在…方面 shell |
| B5 | 通过与合作律师事务所的紧密合作，我们能够为客户提供一站式服务。 | 移民手续由合作律所办理，升学和移民可以在同一处咨询。 | 通过… buries the actor |
| B6 | 基于学生的兴趣和学术背景，我们会为其量身定制选校方案。 | 选校时，我们看孩子的兴趣、成绩和课外活动。 | 基于 + 其 + 量身定制 |
| B7 | 当您的孩子收到录取通知书的时候，我们将协助您进行签证的申请。 | 孩子拿到录取通知后，我们接着协助办理签证。 | 余光中: 当…的时候 → 一…就 / …之后 [V] |
| B8 | 随着申请人数的不断增加，美国名校的竞争日益激烈。 | Delete. If the point matters: [学校] [年份] 收到 [数字] 份申请（来源：[学校官网]）。 | Grand opener; vague claim |

### Pronouns, plurals, measure words

| # | Before | After | Note |
|---|---|---|---|
| C1 | 您可以随时联系我们，我们会尽快回复您，并为您安排您的咨询时间。 | 有问题随时联系我们，我们会尽快回复并安排咨询时间。 | Four 您 → zero [V: Microsoft §4.1.12] |
| C2 | 大学会审核学生的申请，然后它们会通过申请系统通知结果。 | 大学审核完申请，会通过申请系统通知结果。 | 它们 for institutions is English |
| C3 | 我们的顾问们会和家长们保持定期的沟通。 | 顾问会定期和家长沟通。 | 们 when plurality is obvious [V: 余光中 例 医生们] |
| C4 | 我们有 3 个顾问负责研究生申请。 | 研究生申请由 [3] 位顾问负责。 | 位 for people; Microsoft: 两位研究人员, not 2 个研究人员 [V] |
| C5 | 如果他或她的成绩不够理想，…… | 如果孩子的成绩不够理想，…… | 他或她 is an anglicism [V: chinese-forums] |

### 被

| # | Before | After | Note |
|---|---|---|---|
| D1 | 申请材料将被我们的团队仔细审核。 | 申请材料由顾问逐份审核。 | Neutral action: 由 or active voice |
| D2 | 截止日期已被学校延长至 [日期]。 | 学校已把截止日期推迟到 [日期]。 | 把 sentence is the natural active form |
| D3 | 这项服务被许多家长认为是最好的选择。 | Delete. | Unsourced claim + superlative |
| D4 | 签证申请被拒绝之后应该怎么办？ | 被拒签后怎么办？ | Keep 被 here: adverse event, set phrase. Just shorten |

### 的 chains, 一个, nominalization

| # | Before | After | Note |
|---|---|---|---|
| E1 | 这是一份为准备申请美国大学的学生的家长准备的指南。 | 这份指南写给准备申请美国大学的家长。 | 3 的 → 1 [V: 金圣华 例 厌烦购物的人有很多餐馆可去] |
| E2 | 这是一个非常重要的决定。 | 这个决定很重要。 | 一个 + 的 + adjective stack |
| E3 | 我们非常重视申请材料的真实性和一致性。 | 申请材料必须真实，各份材料的信息要一致。 | -性 nouns → predicates [V: 余光中 例 可读性颇高 → 很好读] |
| E4 | 学生课外活动的质量的重要性高于其数量。 | 课外活动，做得深比做得多更重要。 | Nominal chain → verbs |

### Paired conjunctions and logic words

| # | Before | After | Note |
|---|---|---|---|
| F1 | 如果您的孩子的 GPA 低于 3.0，那么他可以选择的学校将会比较有限。 | GPA 低于 3.0，可选的学校会少一些。 | Drop 如果/那么, 您的, 他 |
| F2 | 因为每所大学的要求都不同，所以我们会为每所学校分别准备材料。 | 各校要求不同，材料要分开准备。 | Drop 因为/所以 |
| F3 | 虽然申请截止日期是 11月30日，但是我们建议您提前两周提交。 | 截止日期是11月30日，建议提前两周提交。 | Drop 虽然/但是; no contrast exists |
| F4 | 没有提交完整材料的申请将无法被处理。 | 材料齐全，申请才能受理。 | Double negative + 被 [V: ruanyf 双重否定 rule] |
| F5 | 为了确保您的孩子能够按时提交申请，我们会制定一个详细的时间表。 | 我们会排好时间表，保证按时提交。 | 为了确保 + 能够 + 一个 |

### English idiom calques and customer-service-ese

| # | Before | After | Note |
|---|---|---|---|
| G1 | 如果您有任何问题，请随时与我们联系。 | 有问题欢迎随时联系我们。 | "If you have any questions, feel free to…" |
| G2 | 我们很高兴地宣布，OneVision 芝加哥分部正式开业。 | OneVision 芝加哥分部已开始接待咨询。 | "We are pleased to announce" |
| G3 | 这取决于您孩子的具体情况。 | 要看孩子的具体情况。 | "It depends on" |
| G4 | 这是一个好问题！希望以上信息对您有帮助！ | Delete both. | Flagged chatbot residue [V: humanizer-zh #22; 少数派 106564] |
| G5 | 如果您希望继续，请点击下方按钮。 | 如要继续，请点击下方按钮。 | Microsoft's own example: 如果希望继续进行，请单击 → 如要继续，请单击 [V] |

### AI-isms and marketing

| # | Before | After | Note |
|---|---|---|---|
| H1 | 值得注意的是，部分大学的提前申请截止日期为11月1日。 | 部分大学的提前申请11月1日截止。 | Paragraph-initial zero-subject comment [V: baibanbao rule 11] |
| H2 | 总而言之，选择 OneVision，就是选择一个更加光明的未来。 | Delete. End on the last fact or the CTA. | Slogan closer [V: humanizer-zh #31] |
| H3 | 在全球化日益加深的时代背景下，越来越多的中国家庭选择赴美留学。 | Delete. Open with what the page covers: 本页介绍美国本科申请的时间安排。 | [V: humanizer-zh #30] |
| H4 | 我们不仅是您的留学顾问，更是孩子成长路上的伙伴。 | 从选校到签证，由 [同一位顾问] 跟进。 | 不仅…更… with an abstract second half |
| H5 | 申请成功的关键——尽早规划。 | 规划越早，选课和考试的安排越从容。 | 破折号 reveal |
| H6 | 专业团队，全程陪伴，量身定制，高效便捷。 | [One concrete sentence about the process, from the source page.] | Four-character stack |
| H7 | 升学与移民无缝衔接，一站式解决您的所有需求。 | 升学和移民可以在同一处咨询：升学申请由我们负责，移民手续由合作律所 KL Legal Services 办理。 | The honest form of "one-stop" |
| H8 | 保录名校，不录全退！ | Delete. If a refund policy exists, quote it exactly: 退费规则见服务合同第 [ ] 条。 | 广告法 第二十四条 [V] |
| H9 | 录取成功率高达98%。 | Delete, unless the firm has a dated count: [年份] 我们服务的 [N] 名学生中，[n] 名至少被一所申请学校录取。 | No invented statistics |
| H10 | 资深顾问为您量身定制专属留学方案。 | 顾问根据孩子的成绩、兴趣和预算，列出申请学校名单。 | Copy from 新东方 [V]; describe the work |
| H11 | 名额有限，立即预约！ | 预约咨询 | Pressure + exclamation |

---

## (d) Register, headlines, CTAs, punctuation

### 您 or 你

- **What sources show.** Apple China uses 你 throughout product and support pages. [V] Microsoft's zh-CN guide says to omit pronouns where possible and, if one is needed, use 你 rather than 您. [V] Mainland study-abroad agencies (新东方前途出国, 启德) use 您 in service copy, forms and buttons. [V] Government service sites mostly use no pronoun; 您 appears in invitations (诚邀您的加入, 欢迎您). [V: cscse.edu.cn, nia.gov.cn]
- **Recommendation for OneVision [J].** Address parents as **您**: this is a paid, high-stakes consultation and the readers are parents, so 你 can read as too casual. But use 您 sparingly. Drop it whenever the sentence is clear without it (pair C1). A useful ceiling: one 您 per short paragraph.
- **Never mix** 你 and 您 for the same reader on one page. (The agency sites do mix: 你 in article headlines, 您 in buttons. [V] Avoid that.)
- **Plural.** Avoid 您们; use 各位家长 or 您和孩子. [J: 您们 is widely taught as nonstandard; not checked against a dictionary in this research]
- **In FAQ questions** written in the parent's voice, the parent says **你们** to the firm (你们能保证录取吗？). That is natural. Answers use 我们.
- **The child.** 孩子 in parent-facing copy; 学生 when describing requirements or process; 子女 in immigration-law contexts (21岁以下未婚子女). Write 孩子 rather than 您的孩子 when it is clear whose child is meant. [J]
- **The firm.** 我们 or OneVision. Not 本公司, 本机构, 我司, 小编. [J]

### Headlines

- Page titles: plain noun phrases that match the menu. 美国本科申请, 转学申请, 研究生申请, 移民咨询, 费用, 常见问题, 关于我们. Government service menus use the same short noun-phrase form (办事指引, 收费标准, 表格下载). [V: nia.gov.cn]
- Section heads: noun phrases or short verb phrases. 服务内容, 申请时间表, 收费方式, 合作律所, 如何预约.
- One plain subhead under a page title is fine: one sentence, about 25 characters or fewer, stating what the page covers. Apple writes short two-part headlines (拍照、拍视频，出手成片。) [V], but that is product marketing; a consultancy should stay with labels.
- No slogan headlines, no couplets, no four-character stacks, no exclamation marks, no 一、二、三 numbering on a run of headings. [V: baibanbao rule 6 on ordinal headings]

### Buttons and links

| Wording | Verdict | Note |
|---|---|---|
| 预约咨询 | Use | Standard; used by 启德 [V] |
| 联系我们 | Use | |
| 进一步了解 | Use | Apple China's standard link [V] |
| 了解详情 | Use | Common and natural [J] |
| 查看费用, 查看时间表, 下载清单 | Use | Verb + object, says what happens |
| 提交, 发送 | Use (forms) | |
| 免费咨询 | Only if true | Say what is free and for how long: 首次咨询免费（[ ] 分钟） |
| 了解更多 | Acceptable | Calque of "Learn more" but common; prefer 进一步了解 or 了解详情 [J] |
| 在线咨询 | Acceptable if a live channel exists | |
| 立即预约, 马上咨询, 点击立即咨询, 抓紧上车 | Avoid | Urgency; 点击 is redundant on a button [V: 启德 uses these] |
| 免费评估, 评估我的录取率 | Avoid | Implies the firm can predict admission [V: 新东方] |
| 预约定制专属方案, 获取专属方案, 领取… | Avoid | Luxury or lead-bait wording [V: 新东方] |

Buttons: 2 to 4 characters where possible, verb first, no punctuation.

### FAQ style

- Question: the parent's own words, short, ending in ？. 费用怎么算？ 什么时候开始准备比较合适？ 你们能保证录取吗？
- Answer: first clause answers (能 / 不能 / 需要 / 一般…), then at most two sentences of reason or next step. No 这是一个好问题, no restating the question, no closing summary. [V: humanizer-zh #22, #24]
- Example: 问：你们能保证录取吗？ 答：不能。录取由学校决定，任何机构都无法保证。我们负责的是选校、材料和时间安排。
- When a school's own program contains the word guarantee (UC TAG = 加州大学转学录取保证协议 [J: verify the official Chinese rendering]), attribute it to the school every time so it never reads as a OneVision promise.

### Punctuation and typography

- **No 破折号 `——` and no 一字线 `—`.** Rewrite: a colon for a label or explanation (申请材料：成绩单、推荐信、文书), parentheses for an aside, a comma, or two sentences. Microsoft's zh-CN guide gives the same advice (parentheses or colon instead of the em dash). [V] For number and date ranges use 至 or the wave dash `～` (U+FF5E), never `—`. GB/T 15834-2011 lists three connector forms: short dash, 一字线 and 浪纹线. [V: W3C clreq] Which form the standard assigns to which range is from memory [J].
- **No 间隔号 `·`.** Mainland convention puts `·` between parts of transliterated foreign names (乔治·华盛顿). [V: W3C clreq] To comply: keep people's names in Latin script (Yun Lee, Kyunggu Choi); do not transliterate them. Never guess Hanja/Chinese characters for a Korean name; use the romanized name the person uses. For schools, use the standard Chinese name when it has no dot (哈佛大学, 斯坦福大学, 加州大学洛杉矶分校); where the standard name contains `·` (e.g. 约翰斯·霍普金斯大学), use the English name or a dot-free form the owner approves. [J]
- **Full-width punctuation** in Chinese sentences: ，。：；？（）“”. [V: sparanoid; ruanyf; Microsoft] Mainland quotes are “ ” (「」 is the Taiwan/Hong Kong habit). [J]
- **Ellipsis** is `……` (two full-width), not `...`. Avoid 等等 after a list ending in 等. [V: baibanbao punctuation rule]
- **No `！`** anywhere in body text or headings. [V: baibanbao "零惊叹号"] No emoji, decorative arrows or divider lines. [V: humanizer-zh #20]
- **Bold:** at most one short phrase per section, used to help someone scanning. Never bold whole sentences or "label：explanation" bullet lists. [V: baibanbao; humanizer-zh #19]
- **Inline lists** with 、 (顿号): at most 3 items per clause. More than 3 becomes a bullet list. AI text uses dense 顿号 lists at about 1.8 times the human rate. [V: baibanbao rule 2]
- **Spacing between Chinese and Latin text or digits.** Two conventions exist. Apple China and Microsoft put a half-width space between Chinese and Latin words or digits (iPhone 的价值, 3 个月). [V] Government text and GB/T examples use no spaces (2026年). [J for GB/T] **Pick one and apply it site-wide.** Suggested default [J]: a space between Chinese and Latin-script words or codes (OneVision 的顾问, GPA 3.0, F-1 签证, EB-3 职业移民); no space between Chinese and pure numbers (12个月, 11月30日, 15,588美元, 托福100分). Never full-width digits (１０００). [V: sparanoid; ruanyf]

---

## (e) Concision rules

Apply in order. Each rule should shorten the sentence without losing a fact.

1. **One sentence, one point.** Split any sentence that carries two facts. Aim for 15 to 30 characters; hard cap 40. [V: ruanyf 40-character rule]
2. **Paragraphs:** at most 3 sentences or about 100 characters. [V: ruanyf, 100-character cap on comma-chained sentences]
3. **Verbs over nouns.** 进行评估 → 评估; 作出调整 → 调整; 提供帮助 → 帮; 给予指导 → 指导; 实现录取 → 被录取. [V: 余光中 via 少数派 and vocus]
4. **Name the thing instead of 相关/有关.** 请准备相关材料 → 请准备成绩单、护照复印件和资金证明。 少数派's analysis shows 相关/有关 hide at least eight different meanings (corresponding, supporting, required, associated…). [V]
5. **Delete padding words** when the sentence survives without them: 进行, 相关, 有关, 方面, 情况, 问题 (as in 费用问题), 工作 (as in 申请工作), 一定的, 非常, 十分, 一个, 的 (third and later in a chain), 了 (when the time is already clear). Replace 能够 with 能, 将会 with 会, 是否 with 能不能 or 有没有 in questions. [J, consistent with the sources above]
6. **Subject first.** Remove preposition shells: 对于…来说, 就…而言, 在…方面, 关于…, 通过…, 基于…, 随着…. Put the real subject at the start. [V: baibanbao rule 10; LifelongLazyLearner family 4]
7. **One half of a conjunction pair.** 因为…所以, 如果…那么, 虽然…但是: keep one or neither when the logic is obvious. [J; F1 to F3]
8. **Drop pronouns** the context supplies, especially 您, 他们, 它, 其. [V: Microsoft §4.1.12; ruanyf on unclear 其/该/此]
9. **Active over passive,** except adverse events and set phrases (被拒签, 被录取). [V: ruanyf; 金圣华]
10. **Affirmative over negative; no double negatives.** [V: ruanyf]
11. **No framing first sentence, no summary last sentence.** If deleting the first or last sentence of a paragraph loses nothing, delete it. [V: humanizer-zh #24, #31; LifelongLazyLearner family 3]
12. **Do not pad lists to three.** If there are two real items, write two. [V: humanizer-zh #6]
13. **Vary adjacent sentences.** If two neighbouring sentences have the same length and the same comma pattern, merge or restructure one. AI text does this about twice as often as human text. [V: baibanbao rule 3]
14. **Chinese is shorter than the source.** If a Chinese paragraph looks as long as its English source in characters, it is probably padded. [J]

### Numbers, units, dates (GB/T 15835-2011 where relevant)

Status: the official text of GB/T 15835-2011 (出版物上数字用法) is posted by the Ministry of Education at the URL in section g, but it would not load through the research tool. Rules marked [J] below come from the standard as I know it; check them against the PDF before relying on them.

| Item | Write | Avoid | Source |
|---|---|---|---|
| Money in running text | 15,588美元; 每年约1.6万美元 (rounded figures only) | 15588刀; 1.5588万美元 for an exact fee | [V: ruanyf allows "$1,000" and "1,000 美元"]; 万 with Arabic digits allowed for large numbers [J: GB/T 5.3] |
| Money in tables | 15,588美元, or $15,588 if the whole table uses $ | Mixing $ and 美元 on one page | [J] |
| RMB conversions | Only with the rate and date: 约合人民币 [ ] 元（按 [日期] 汇率） | Undated conversions | House rule: no invented figures |
| Thousands separator | Comma for amounts of 1,000 or more (1,000美元, 15,588美元). Never in years (2026年). | Full-width digits; spaces as separators in web copy | GB/T allows 千分撇 and says integers up to 4 digits need not be grouped [J]; ruanyf: 4-digit grouping optional [V]. Commas everywhere keep the Chinese page aligned with the English one. |
| Dates | 2026年11月30日; 11月30日 when the year is clear; 11月30日（周一） | 11/30, 30/11, 26年11月30日 | Year not abbreviated [J: GB/T 5.1.4]; weekdays 周一…周日 [V: Microsoft] |
| ISO form | 2026-11-30 only in tables or forms | In prose | [J: GB/T allows the GB/T 7408 form] |
| Times and time zones | 美国太平洋时间11月30日23:59; add 北京时间 when it helps | a.m./p.m.; a deadline without a zone when the source gives one | 24-hour clock [J]; time zones only as stated by the school |
| Academic year | 2026-2027学年 (ASCII hyphen) or 2026至2027学年 | 2026–27学年, 26-27学年, 2026—2027学年 (一字线 is banned by house style) | Year not abbreviated [J]; house rule on dashes |
| Intake term | 2027年秋季入学 | 27fall, 27Fall | Applicant slang [J] |
| Durations and counts | 12个月, 3年, 申请10所学校; 两年, 一两周 in loose prose | 2个顾问 | Arabic for measured or important numbers; Chinese numerals for 概数 (一两周, 三五所, no 顿号 between) [J: GB/T 4.2, 5.2.1]. Measure words: 位 (people), 所 (schools), 份 (documents), 封 (letters), 篇 (essays), 门 (courses), 项 (services) [J; Microsoft gives 两位研究人员] |
| Scores | GPA 3.0（满分4.0）; 托福100分; 雅思7分; SAT 1500分 | GPA3.0分 | [J] |
| Thresholds | 3.0及以上; 不低于3.0; 低于3.0 | 3.0以上 when inclusion matters | 以上 is ambiguous in everyday use (Chinese criminal law defines it as inclusive, 刑法 第九十九条, which shows the need to define it) [J] |
| Ranges | 3至5所; 15%至30%; 15%～30% (repeat the % and unit on both sides) | 3-5所; 15～30%; 13～17万元 | GB/T: 15%～30%, not 15～30%; 13万元～17万元, not 13～17万元 [J]; units on both sides [V: Microsoft; ruanyf] |
| Mixed numerals | 108 or 一百零八; 4000 or 四千 | 1百零8; 4千 | GB/T 5.3 [J] |
| Visa and form codes | F-1 签证, I-20, OPT, H-1B, EB-3 职业移民, 绿卡 | Translating the codes away | Codes are what parents will see on official forms [J]; first mention may add a gloss: EB-3（第三优先职业移民） [J: verify against the team glossary] |

---

## (f) Reviewer checklist

A reviewer who does not read Chinese can do Part 1 with the browser's find function. Part 2 needs a Chinese reader.

### Part 1: mechanical search (any "yes" needs a fix)

Search the page for each string. Expected count is zero unless noted.

```
——   —   ·   ！   !   ...   您们
保录   保证录取   包过   不录全退   定向录取   内部渠道   特殊渠道
成功率   录取率   斩获   顶级   唯一   最佳   国家级
最      (review each hit: 最晚/最多/最近 are fine; 最专业/最好的 are not)
第一   (review: 第一步/第一年 are fine; 行业第一 is not)
赋能   助力   打造   深耕   闭环   抓手   赛道   底层逻辑   无缝   全方位   至关重要
值得注意   总而言之   综上所述   众所周知   不可否认   时代背景   随着   让我们   之旅   起航
圆梦   梦校   直通车   起跑线   尊享   高端   精英   专属   名额有限   立即   抓紧
量身定制   一站式   (one hit per page at most, with an explanation next to it)
进行   作出   加以   相关   有关   作为   关于   对于   通过   基于   方面
       (review each hit: the nav label 关于我们 and 进行面试 are fine)
们     (review each hit: 我们/他们 fine; 顾问们/家长们 usually not)
您     (count per paragraph; more than one is a flag)
```

1. Does any of the strings above appear where the note says it should not?
2. Are there full-width digits (０１２３) or half-width punctuation (, . : ? ( )) inside Chinese sentences?
3. Is 你 used anywhere 您 is used for the same reader?
4. Are any people's names transliterated into Chinese characters (rather than kept in Latin script)?
5. Does any number on the page lack a source in the Korean or English original?
6. Does any heading end in `！` or `。`, or use 一、二、三 numbering on a run of headings?
7. Is bold used more than once in any section?

### Part 2: judgment (any "yes" needs a fix)

8. Does the first sentence of any page or section only announce the topic, without giving information?
9. Does the last sentence of any section only sum up or inspire?
10. Does any sentence run over 40 characters?
11. Does any sentence carry two separate facts?
12. Is any adjective (专业, 优质, 贴心, 资深, 丰富) left without the fact that supports it?
13. Does any sentence promise or imply an admission, visa or immigration outcome?
14. Does any 不是…而是 / 不仅…更… set up a claim nobody made?
15. Is any list padded to three items, or longer than three items inside one sentence?
16. Do two neighbouring sentences share the same length and comma pattern?
17. Is there a 被 sentence that is not about something bad happening to the subject?
18. Is there a chain of three or more 的?
19. Would a Chinese parent need the English or Korean original to understand any sentence?
20. Read aloud: does any sentence sound like something a person would not say to a parent across a desk?

---

## (g) Sources

### AI味 and AI-style Chinese

- 「AI味」的本质是什么？你可能搞错了！ 人人都是产品经理, 2026-01-04. https://www.woshipm.com/ai/6316640.html [V]
- 为什么 AI 写的文章，总有一股"AI 味"？ 田威, 科普中国 (澎湃号), 2025-10-17. https://m.thepaper.cn/newsDetail_forward_31801146 [V]
- 为什么 AI 写的文章一眼就能看穿, 王建硕, 腾讯新闻, 2026-05-28. https://news.qq.com/rain/a/20260528A089VZ00 [V]
- 你写的文章？都是 ai 味, 踏雪寻仙, 少数派, 2026-02-24. https://sspai.com/post/106564 [V]
- 用 no-ai-slop 去掉你文章里的 AI 味, 沈显鹏, 掘金, 2026-07-23. https://juejin.cn/post/7665417513740779572 [V]
- baibanbao/qu-ai-wei (去 AI 味, merges 王佩写作系统, humanizer-zh and lieflat-less-ai-tone; frequency figures from a 300-sample AI corpus). https://github.com/baibanbao/qu-ai-wei and https://raw.githubusercontent.com/baibanbao/qu-ai-wei/main/SKILL.md [V; underlying corpus not opened]
- LifelongLazyLearner/qu-ai-wei, pattern catalog. https://github.com/LifelongLazyLearner/qu-ai-wei and https://raw.githubusercontent.com/LifelongLazyLearner/qu-ai-wei/main/references/pattern-catalog.md [V]
- op7418/Humanizer-zh, SKILL.md (31 patterns with before/after). https://raw.githubusercontent.com/op7418/Humanizer-zh/main/SKILL.md [V]
- 中国社会科学网 article on the formal features of AI味 (sentence lengths too even). https://www.cssn.cn/skgz/bwyc/202607/t20260703_6057355.shtml [S: page failed to load]
- 虎嗅 piece on why AI's 不是…而是… sounds hollow. https://m.huxiu.com/article/4883379.html?type=text [S: fetch timed out]
- 互联网黑话 discussions (赋能, 抓手, 闭环…): https://www.woshipm.com/it/4454282.html, https://www.ifanr.com/1409298, https://www.digitaling.com/articles/1531788.html [S]
- 人民日报, 莫让"数字赋能"变成"数字负担" (2025). https://www.peopleapp.com/column/30050361662-500007109845 [S]

### Translationese and 欧化中文

- 《翻譯乃大道，譯者獨憔悴》1：不要再寫英式中文了！ (summary of 余光中's examples). https://vocus.cc/article/660f6ceafd89780001edf5e0 [V]
- 不要逃避解释：论「相关」和「有关」在日常写作中的滥用, PlatyHsu, 少数派, 2025-04-07 (cites 余光中 on 作出/进行). https://sspai.com/post/98169 [V]
- "被被不绝"与"的的不休", 金圣华, 《英语世界》 via 搜狐, 2018-04-06 (cites 余光中《论的的不休》 and 思果). https://www.sohu.com/a/227434716_256852 [V]
- How to avoid anglicised Chinese (discussion of 余光中《中文的常態與變態》, 明報月刊 1987). https://chinese-forums.com/forums/topic/39690-how-to-avoid-anglicised-chinese [V]
- Victor Mair, "Englishy Chinese", Language Log, 2022-01-09. https://languagelog.ldc.upenn.edu/nll/?p=53299 [V]
- 余光中《中和西》 (2006, includes 《怎样改进英式中文？论中文的常态与变态》 and 《从西而不化到西而化之》). https://book.douban.com/subject/30155966/ [S]
- 王力 on 欧化 as 英化 (王力 1985: 334), as cited in https://ksu.repo.nii.ac.jp/record/9927/files/KSUSGKS_12_15.pdf [S]
- Zhang & Amoroso (2020) on 被 sentences and the spread of 欧化 grammar. https://revistas.ucm.es/index.php/CLAC/article/download/67945/4564456553044/4564456581576 [S]

### Style guides and register models

- Microsoft Chinese (Simplified) Localization Style Guide (2024 PDF): §2.1 voice, §4.1.10 numbers, §4.1.12 pronouns (你 not 您; omit when possible), §4.1.14 fragments, dashes section (no em dash in Chinese). https://aka.ms/chinese-simplified-styleguide [V]
- 阮一峰, 中文技术文档的写作规范: https://github.com/ruanyf/document-style-guide (text.md, number.md, marks.md) [V]
- 中文文案排版指北 (sparanoid). https://github.com/sparanoid/chinese-copywriting-guidelines [V]
- W3C, 中文排版需求 (clreq), punctuation section incl. GB/T 15834-2011 connector forms and 间隔号. https://www.w3.org/TR/clreq/ [V]
- Apple China iPhone page. https://www.apple.com.cn/iphone/ [V]; Apple Store retail page. https://www.apple.com.cn/retail/ [V]; Apple support (refund article). https://support.apple.com/zh-cn/118223 [V]
- 中国留学网 (中国留学服务中心). https://www.cscse.edu.cn/ [V]
- 国家移民管理局. https://www.nia.gov.cn/ [V]

### Study-abroad agency copy, law and consumer warnings

- 新东方前途出国 homepage. https://liuxue.xdf.cn/ [V]; US page. https://liuxue.xdf.cn/usa/ [V]
- 启德教育. https://www.eic.org.cn/ [V]
- 新东方前途 (无锡), 留学申请避坑：中介不会说的 5 个"隐形套路", 2025-12-02. https://liuxue.xdf.cn/news/wuxi_7782797.shtml [V]
- 轻信保录被骗、付费志愿填报全滑档 别再踩这些坑！ 央视新闻 via 中新网, 2026-07-29. https://www.chinanews.com.cn/sh/2026/07-29/10668216.shtml [V]
- 《广告法》 第九条 (三) and 第二十四条, quoted at https://www.fadada.com/article/Basics-001139 [V; official text is at the national law database flk.npc.gov.cn, not opened]
- 教育部 2016年第3号留学预警. https://zh.wikisource.org/wiki/2016%E5%B9%B4%E7%AC%AC3%E5%8F%B7%E7%95%99%E5%AD%A6%E9%A2%84%E8%AD%A6 [V; does not address agency wording]

### Numbers

- GB/T 15835-2011 出版物上数字用法 (Ministry of Education PDF). http://www.moe.gov.cn/ewebeditor/uploadfile/2015/01/13/20150113091154536.pdf [not loadable through the research tool; rules in section e marked J]

### Could not verify

- EducationUSA China (美国教育咨询中心) and U.S. Embassy China Chinese-language pages: the embassy site returned 403, and educationusa.state.gov showed no Chinese content. Worth a manual look as a model of sober register.
- The exact GB/T 15835-2011 and GB/T 15834-2011 clause wording (range connectors, year abbreviation, digit grouping).
- 圆梦 and 名校直通车 on current agency pages (not present on the four agency pages opened).
- Whether 您们 is marked nonstandard in 《现代汉语词典》.
- Official Chinese renderings of UC TAG and EB-3 used by the institutions themselves.
- Search coverage of 知乎, 豆瓣, 小红书 and WeChat articles was thin; those platforms mostly block automated fetching. The AI味 findings rest on 少数派, 人人都是产品经理, 掘金, 腾讯新闻, 科普中国 and open-source rule sets.

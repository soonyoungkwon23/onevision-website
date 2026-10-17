# OneVision Consulting: Simplified Chinese terminology (mainland usage)

Research notes for adding a Simplified Chinese (zh-CN) version of onevisionconsulting.us. Compiled 2026-10-16.

**Scope.** Terms were collected from the repo's binding glossary (`i18n/glossary.json`), the Korean/English translation memory (`i18n/translations.json`, 1,839 segments across the 42 static pages), the visa guides in `content/guides/visa/`, and the university files (`scripts/lib/university-names.json`, `scripts/lib/university-list.json`). Universities named in staff bios and acceptance stories are included. No repo files were changed.

**Method.** Each Chinese term was checked against an authoritative Chinese-language page where one could be found, in this order: U.S. Embassy and Consulates in China Chinese pages, USCIS Simplified Chinese pages and PDFs, studentaid.gov's Simplified Chinese FAFSA guide, ETS China (toefl.cn) and the PRC exam authority (neea.cn), universities' own Chinese pages, zh.wikipedia in the mainland (zh-cn) view, then mainstream mainland agency usage (New Oriental Vision Overseas, liuxue.xdf.cn) and Baidu Baike. The source URL is the page where the Chinese wording was actually seen.

**Limits.** The shared web-search budget for this session (200 searches) ran out partway through, so later checks were done by fetching known pages directly. Several UC- and California-specific terms (TAP, SIR, PIQ, IGETC, Cal-GETC, A-G, ASSIST.org) and a few immigration terms (CSPA, AILA, I-526E, cap-gap) have no Chinese source and are marked UNVERIFIED. UC Admissions publishes no Simplified Chinese material that could be found; the MOE 涉外监管信息网 (jsj.moe.gov.cn) has no fetchable list of U.S. schools, so no university row cites it. The U.S. Embassy China site blocks automated fetches; its pages were read via curl or the browser.

**Files.** `terminology.md` (this file) and `terminology.json` (same terms, shape `{ko, en, zh, keepLatin, note, source}`; the status tag and section are at the start of `note`).

## 1. Term table

Status tags: **OFFICIAL** = seen on a U.S. government, university, ETS or EducationUSA page in Chinese. **REFERENCE** = zh.wikipedia (zh-cn view) or a PRC government exam site. **COMMON** = mainstream mainland agency or media usage (mostly New Oriental, liuxue.xdf.cn; Baidu Baike). **UNVERIFIED** = best judgment; no source found before the search budget ran out.

### 1.1 Admissions (52)

| Korean | English | Simplified Chinese | Notes | Source |
|---|---|---|---|---|
| 입시 / 미국 대학 입시 | college admissions | 升学申请 | **COMMON**. 美国大学申请 / 美本申请 in agency copy. 입시 컨설팅 = 升学规划咨询 / 申请咨询. | <https://liuxue.xdf.cn/> |
| 합격 | admission (being admitted) | 录取 | **COMMON**. 합격했습니다 = 被录取 / 获得录取. 합격 통지 = 录取通知. 합격 + 장학금 = 录取并获奖学金. Never 通过 (pass a test). | <https://liuxue.xdf.cn/news/8083704.shtml> |
| 신입생 / 신입학 지원 | freshman / first-year applicant | 本科新生申请人 | **REFERENCE**. zh.wikipedia: 一年级生（Freshman），亦称为新生. New Oriental: 加州大学新生申请平台. 신입생 = 新生. | <https://zh.wikipedia.org/zh-cn/一年級生> |
| 편입 / 편입학 | transfer / transfer admission | 转学 / 转学申请 | **OFFICIAL**. Embassy: 加州大学申请与本科转学. New Oriental: 美国本科转学申请, 转学生录取率. 편입생 = 转学生. | <https://china.usembassy-china.org.cn/zh/press-release-2022-china-education-expo-the-united-states-welcomes-chinese-students/> |
| 커뮤니티 칼리지 (CC) | community college (CC) | 社区大学 | **OFFICIAL**. The brief asked for 社区大学, which New Oriental and most agencies use. The U.S. Embassy and zh.wikipedia use 社区学院. Both are understood; pick one site-wide (open question). The site's shorthand CC can stay in Latin after first mention: 社区大学（CC）. | <https://china.usembassy-china.org.cn/zh/education-exchanges-zh/study-usa-zh/> |
| CCC (캘리포니아 커뮤니티 칼리지) | California Community Colleges (CCC) | 加州社区学院（CCC） | **REFERENCE**. Keep Latin. zh.wikipedia: 简称加州社区学院或加州社大（CCC或CCCS）. If the site picks 社区大学, write 加州社区大学（CCC）. | <https://zh.wikipedia.org/zh-cn/加利福尼亚社区学院系统> |
| 대학원 / 대학원 지원 | graduate school / graduate admissions | 研究生院 / 研究生申请 | **OFFICIAL**. Embassy: 美国研究生院申请指南, 本科、研究生项目申请. | <https://china.usembassy-china.org.cn/zh/education-exchanges-zh/study-usa-zh/> |
| 얼리 디시전 (ED) | Early Decision (ED) | 提前决定（ED） | **COMMON**. Keep Latin. Binding: 具有约束力 / 绑定录取. ED II = ED2. Mainland parents say ED. (Korean label supplied for reference; not found in the current Korean site text.) | <https://liuxue.xdf.cn/wuxi/mglh_bklh_sqzn/5438796.shtml> |
| 얼리 액션 (EA) | Early Action (EA) | 提前行动（EA） | **COMMON**. Keep Latin. Non-binding: 非约束力. (Korean label supplied for reference; not found in the current Korean site text.) | <https://liuxue.xdf.cn/wuxi/mglh_bklh_sqzn/5438796.shtml> |
| REA / SCEA | Restrictive Early Action (REA) / Single-Choice Early Action (SCEA) | 限制性提前行动（REA）/ 单一选择提前行动（SCEA） | **COMMON**. Keep Latin. New Oriental Hefei: 限制性提前行动(REA), 单选提前行动(SCEA). | <https://liuxue.xdf.cn/hefei/mglh_bklh_sqzn/1130511.shtml> |
| 정규 지원 (RD) | Regular Decision (RD) | 常规申请（RD） | **COMMON**. Keep Latin. Alternates 常规录取 / 正常申请. (Korean label supplied for reference; not found in the current Korean site text.) | <https://liuxue.xdf.cn/wuxi/mglh_bklh_sqzn/5438796.shtml> |
| UC 원서 | UC application (UC Application for Undergraduate Admission and Scholarships) | 加州大学（UC）申请 | **COMMON**. Keep Latin. New Oriental calls the portal 加州大学新生申请平台. Full official title has no Chinese; 加州大学本科入学及奖学金申请 is a literal rendering (unverified). UC 원서 제출 시작 = UC申请开放提交. | <https://liuxue.xdf.cn/bj/mglh_bklh_sqzn/723522.shtml> |
| UC TAP | UC Transfer Admission Planner (TAP) | UC转学录取规划系统（TAP） | **UNVERIFIED**. Keep Latin. Keep TAP. UC TAP에서 신청 = 在UC TAP系统中申请. | (none found) |
| 등록 의사 (SIR) | Statement of Intent to Register (SIR) | 入学意向确认（SIR） | **UNVERIFIED**. Keep Latin. Agencies say 交SIR / 确认入读. SIR 마감 = SIR截止日期. | (none found) |
| Common App | Common App | Common App（通用申请系统） | **COMMON**. Keep Latin. New Oriental keeps the Latin name (Common App，以下简称CA). 通用申请系统 gloss is unverified. | <https://liuxue.xdf.cn/news/8038153.shtml> |
| PIQ | UC Personal Insight Questions (PIQs) | UC个人见解问题（PIQ） | **UNVERIFIED**. Keep Latin. New Oriental keeps the English name or calls them 8个文书问题. 에세이(PIQ) 4편 = 4篇PIQ文书. | <https://liuxue.xdf.cn/wuhan/mglh_bklh_ksgl/789126.shtml> |
| 에세이 | essay (application essay) | 文书 | **OFFICIAL**. Embassy: 大学文书写作. 에세이 전략 = 文书策略. Use 文书 for application essays generally. | <https://china.usembassy-china.org.cn/zh/education-exchanges-zh/study-usa-zh/> |
| 퍼스널 스테이트먼트 | personal statement | 个人陈述（PS） | **OFFICIAL**. Keep Latin. Embassy: 研究生申请个人陈述; New Oriental: 个人陈述（PS）和补充文书. Common App 에세이 = Common App主文书. (Korean label supplied for reference; not found in the current Korean site text.) | <https://china.usembassy-china.org.cn/zh/education-exchanges-zh/study-usa-zh/> |
| SOP | statement of purpose (SOP) | 目的陈述（SOP） | **UNVERIFIED**. Keep Latin. Mainland agencies usually write SOP or 个人陈述 for graduate applications. SOP is on the keep list. | (none found) |
| 추천서 | recommendation letter | 推荐信 | **REFERENCE**. LOR in the site text = 推荐信（LOR）. | <https://zh.wikipedia.org/zh-cn/推荐信> |
| 비교과 (EC) | extracurricular activities (ECs) | 课外活动 | **COMMON**. Mainland copy rarely uses EC; write 课外活动 (or 活动). Avoid zh.wikipedia's 课程辅助活动. | <https://liuxue.xdf.cn/news/8079153.shtml> |
| GPA / 내신 | GPA | GPA | **REFERENCE**. Keep Latin. zh.wikipedia: 成绩平均绩点（GPA）. Write GPA in running text. GPA 확인서 (Cal Grant) = GPA证明表 (unverified). | <https://zh.wikipedia.org/zh-cn/成績平均績點> |
| 가중/비가중 GPA | weighted / unweighted GPA | 加权GPA / 未加权GPA | **COMMON**. Keep Latin. New Oriental: 加权与非加权. | <https://liuxue.xdf.cn/news/8057585.shtml> |
| Honors (아너스) | honors courses | 荣誉课程 | **COMMON**. Honors Program = 荣誉项目. | <https://liuxue.xdf.cn/news/8057585.shtml> |
| SAT | SAT | SAT | **REFERENCE**. Keep Latin. zh.wikipedia: 中国大陆无正式译名. | <https://zh.wikipedia.org/zh-cn/SAT> |
| ACT | ACT | ACT | **REFERENCE**. Keep Latin. No Chinese name in use. | <https://zh.wikipedia.org/zh-cn/ACT_(测验)> |
| AP | AP (Advanced Placement) | AP（大学先修课程） | **REFERENCE**. Keep Latin. zh.wikipedia: 进阶先修课程, 又称大学先修课程. Agencies say AP课程. AP 과목 = AP课程; APUSH = AP美国历史. | <https://zh.wikipedia.org/zh-cn/進階先修課程> |
| IB | IB (International Baccalaureate) | IB（国际文凭） | **REFERENCE**. Keep Latin. Diploma Programme = IB大学预科项目（DP）; MYP = IB中学项目（MYP）. | <https://zh.wikipedia.org/zh-cn/国际文凭> |
| TOEFL | TOEFL | 托福（TOEFL） | **OFFICIAL**. ETS China official site: TOEFL托福考试中文官网. Mainland readers say 托福; keep TOEFL beside it on first mention. | <https://www.toefl.cn/> |
| IELTS | IELTS | 雅思（IELTS） | **REFERENCE**. PRC exam authority (教育部教育考试院) site: 雅思考试. | <https://ielts.neea.cn/> |
| Duolingo | Duolingo English Test (DET) | 多邻国英语测试（DET） | **REFERENCE**. Keep Latin. Score lines often just say 多邻国 120. | <https://zh.wikipedia.org/zh-cn/多鄰國> |
| GRE / GMAT | GRE / GMAT | GRE / GMAT | **REFERENCE**. Keep Latin. Agencies use the acronyms alone. MCAT = MCAT（医学院入学考试）. (Korean label supplied for reference; not found in the current Korean site text.) | <https://zh.wikipedia.org/zh-cn/GRE> |
| 시험 선택 (test-optional) | test-optional | 标化可选（Test-Optional） | **COMMON**. Keep Latin. 标化 = standardized tests (SAT/ACT) in mainland agency slang. (Korean label supplied for reference; not found in the current Korean site text.) | <https://liuxue.xdf.cn/news/8038163.shtml> |
| 시험 미반영 (UC) | test-blind / test-free (UC) | 不看标化成绩（Test-Free） | **UNVERIFIED**. Keep Latin. New Oriental describes UC as 永久停止以SAT/ACT作为招生审核标准. (Korean label supplied for reference; not found in the current Korean site text.) | <https://liuxue.xdf.cn/news/8057585.shtml> |
| 대기자 (대기자 합격) | waitlist | 候补名单 | **COMMON**. 대기자 합격 = 候补录取 / 从候补名单中录取. | <https://liuxue.xdf.cn/news/8057585.shtml> |
| 합격률 | admit rate | 录取率 | **COMMON**. 유학생 합격률 = 国际生录取率; 편입 합격률 = 转学录取率; 합격자 수 = 录取人数. | <https://liuxue.xdf.cn/news/8083704.shtml> |
| 등록률 (yield) | yield | 录取后入学率（Yield） | **UNVERIFIED**. Keep Latin. 报到率 is also used. (Korean label supplied for reference; not found in the current Korean site text.) | (none found) |
| 보류 (deferral) | deferral (deferred to Regular Decision) | 延迟决定（Defer） | **UNVERIFIED**. Keep Latin. Do not confuse with 延期入学 (deferred enrollment/gap year). (Korean label supplied for reference; not found in the current Korean site text.) | (none found) |
| 전공 | major / intended major | 专业 / 意向专业 | **REFERENCE**. zh.wikipedia: 主修专业. 전공 설계 = 专业规划. 복수전공 = 双专业. | <https://zh.wikipedia.org/zh-cn/主修专业> |
| 전공 프리렉 (선수과목) | major prerequisites (major preparation courses) | 专业先修课 | **COMMON**. New Oriental transfer page: 对应专业的先修课程. 전공 필수 과목 = 专业必修课. | <https://liuxue.xdf.cn/special_usabk/xm_transfer/> |
| ASSIST.org | ASSIST.org | ASSIST.org（加州公立院校转学学分对接查询网站） | **UNVERIFIED**. Keep Latin. Keep the URL as the name; gloss once. | (none found) |
| TAG | TAG (Transfer Admission Guarantee) | 转学录取保证协议（TAG） | **COMMON**. Keep Latin. New Oriental: 加利福尼亚州TAG协议. Full Chinese name unverified. TAG 기준 = TAG要求. | <https://liuxue.xdf.cn/special_usabk/xm_transfer/> |
| IGETC | IGETC (Intersegmental General Education Transfer Curriculum) | IGETC（跨系统通识教育转学课程） | **UNVERIFIED**. Keep Latin. Keep IGETC; 通识教育 is standard wording for general education. | (none found) |
| Cal-GETC | Cal-GETC (California General Education Transfer Curriculum) | Cal-GETC（加州通识教育转学课程） | **UNVERIFIED**. Keep Latin. Replaced IGETC for students entering CC from fall 2025. Keep Latin. | (none found) |
| A-G 과목 | A-G subject requirements | A-G科目要求 | **UNVERIFIED**. Keep Latin. A-G课程要求 also common. (Korean label supplied for reference; not found in the current Korean site text.) | (none found) |
| 준학사 | associate degree | 副学士学位 | **REFERENCE**. AS in Nursing = 护理副学士（AS）. | <https://zh.wikipedia.org/zh-cn/副學士> |
| ADT | ADT (Associate Degree for Transfer) | 转学副学士学位（ADT） | **UNVERIFIED**. Keep Latin. (Korean label supplied for reference; not found in the current Korean site text.) | (none found) |
| 주립대 | state university | 州立大学 | **REFERENCE**. 대표 주립대 = 代表性州立大学 / 旗舰州立大学 (flagship). | <https://zh.wikipedia.org/zh-cn/州立大学系统> |
| 리버럴 아츠 칼리지 | liberal arts college | 文理学院 | **OFFICIAL**. Embassy: 文理学院专题. (Korean label supplied for reference; not found in the current Korean site text.) | <https://china.usembassy-china.org.cn/zh/education-exchanges-zh/study-usa-zh/> |
| 연구중심대학 | research university | 研究型大学 | **REFERENCE**. (Korean label supplied for reference; not found in the current Korean site text.) | <https://zh.wikipedia.org/zh-cn/研究型大學> |
| 진학 상담 교사 | college counselor | 升学指导老师 | **OFFICIAL**. Embassy pages use 升学指导老师 and 升学辅导顾问. UCLA College Counseling Certification = UCLA升学指导证书. (Korean label supplied for reference; not found in the current Korean site text.) | <https://china.usembassy-china.org.cn/zh/press-release-2022-china-education-expo-the-united-states-welcomes-chinese-students/> |
| Pre-Med | Pre-Med | 医学预科（Pre-Med） | **UNVERIFIED**. Keep Latin. U.S. pre-med is a track, not a degree; mainland agencies write Pre-Med or 医学预科. | (none found) |

### 1.2 Tuition and financial aid (16)

| Korean | English | Simplified Chinese | Notes | Source |
|---|---|---|---|---|
| 거주민 등록금 요건 (residency) | residency for tuition purposes | 学费居民身份认定 | **UNVERIFIED**. New Oriental only writes 加州居民. 거주 요건 = 居民身份要求. (Korean label supplied for reference; not found in the current Korean site text.) | <https://liuxue.xdf.cn/news/8062982.shtml> |
| 거주민 / 비거주민 등록금 | resident / nonresident tuition (in-state / out-of-state) | 州内居民学费 / 非居民学费 | **COMMON**. New Oriental: in-state（州内）与 out-of-state（州外/国际）; UC 非居民附加费（NRST）. 캘리포니아 거주민 = 加州居民. | <https://liuxue.xdf.cn/news/8063004.shtml> |
| 총 학비 (COA) | cost of attendance (COA) | 就读费用 | **OFFICIAL**. studentaid.gov Simplified Chinese FAFSA guide. Alternate 就读成本（Cost of Attendance）. (Korean label supplied for reference; not found in the current Korean site text.) | <https://studentaid.gov/sites/default/files/FAFSA%20Guides-Mandarin-Chinese.pdf> |
| 재정보조 | financial aid | 学生资助 | **OFFICIAL**. studentaid.gov guide: 资助 / 资助办公室; 助学金、勤工俭学和贷款. Agencies also say 经济资助 / 财务援助. 재정보조 컨설턴트 = 学生资助顾问. 사립 중고등학교 재정보조 = 私立初高中经济资助. | <https://studentaid.gov/sites/default/files/FAFSA%20Guides-Mandarin-Chinese.pdf> |
| 니드 베이스 재정보조 | need-based aid | 基于经济需求的资助（Need-based） | **UNVERIFIED**. Keep Latin. Only 经济需求 is in the official guide. (Korean label supplied for reference; not found in the current Korean site text.) | <https://studentaid.gov/sites/default/files/FAFSA%20Guides-Mandarin-Chinese.pdf> |
| 장학금 / 성적 장학금 | scholarship / merit scholarship | 奖学金 / 学术奖学金（Merit-based） | **COMMON**. New Oriental uses Merit-based奖学金 and 学术奖学金. 성적 우수 장학금 = 学业优秀奖学金. | <https://liuxue.xdf.cn/news/8062982.shtml> |
| FAFSA | FAFSA (Free Application for Federal Student Aid) | FAFSA（联邦学生援助免费申请） | **OFFICIAL**. Keep Latin. studentaid.gov Chinese guide: 《联邦学生援助免费申请》(FAFSA®). | <https://studentaid.gov/sites/default/files/FAFSA%20Guides-Mandarin-Chinese.pdf> |
| California Dream Act | California Dream Act Application (CADAA) | 加州梦想法案申请（California Dream Act） | **UNVERIFIED**. Keep Latin. No Chinese on the CSAC site. | (none found) |
| Cal Grant | Cal Grant | Cal Grant（加州助学金） | **UNVERIFIED**. Keep Latin.  | (none found) |
| Pell Grant | Federal Pell Grant | 联邦佩尔助学金 | **OFFICIAL**. (Korean label supplied for reference; not found in the current Korean site text.) | <https://studentaid.gov/sites/default/files/FAFSA%20Guides-Mandarin-Chinese.pdf> |
| CSS Profile | CSS Profile | CSS Profile（大学奖学金服务档案） | **REFERENCE**. Keep Latin. Keep CSS Profile; Chinese gloss from zh.wikipedia. The site's own gloss (form private colleges use for institutional aid) = 多数私立大学用来发放校内资助的申请表. | <https://zh.wikipedia.org/zh-cn/大学奖学金服务档案> |
| SAI | SAI (Student Aid Index) | 学生援助指数（SAI） | **OFFICIAL**. Keep Latin. Exact studentaid.gov wording. | <https://studentaid.gov/sites/default/files/FAFSA%20Guides-Mandarin-Chinese.pdf> |
| EFC | EFC (Expected Family Contribution, replaced by SAI) | 预期家庭贡献（EFC） | **UNVERIFIED**. Keep Latin. Mention only as the predecessor of SAI. (Korean label supplied for reference; not found in the current Korean site text.) | (none found) |
| 재정보조 결과 통지서 (Award Letter) | award letter (financial aid offer) | 资助通知书 | **OFFICIAL**. Same guide also uses 资助方案. | <https://studentaid.gov/sites/default/files/FAFSA%20Guides-Mandarin-Chinese.pdf> |
| 재심 요청 (Appeal) | financial aid appeal | 资助申诉 | **UNVERIFIED**. Professional judgment = 专业判断. Not in the FAFSA guide. | (none found) |
| 4월 15일 (CGS) | Council of Graduate Schools (CGS) April 15 Resolution | 美国研究生院理事会（CGS）4月15日决议 | **UNVERIFIED**. Keep Latin. Agencies write 4.15决议. | (none found) |

### 1.3 Student and work visas (31)

| Korean | English | Simplified Chinese | Notes | Source |
|---|---|---|---|---|
| 비자 | nonimmigrant visa / immigrant visa | 非移民签证 / 移民签证 | **OFFICIAL**. U.S. Embassy China visa hub. 학생 비자 = 学生签证. 취업 비자 = 工作签证. | <https://china.usembassy-china.org.cn/zh/visas-zh/> |
| 학생 비자 (F-1) | F-1 student visa | F-1学生签证 | **OFFICIAL**. Keep Latin. Embassy text (reprinted from the Embassy account): 申请F-1或M-1签证; embassy groups it as F类签证. zh.wikipedia: 美国学生签证（F-1）. | <https://m-news.artron.net/news/20250609/n1017115.html> |
| J-1 | J-1 exchange visitor visa | J-1交流访问者签证 | **OFFICIAL**. Keep Latin. Embassy proposed-rule notice uses 交流访问者; other embassy pages say 交流访问学者 / 交流签证. J-1 인턴십 = J-1实习（交流访问者）项目 (unverified). | <https://china.usembassy-china.org.cn/zh/trump-administration-proposes-new-rule-to-end-foreign-student-visa-abuse/> |
| I-20 | Form I-20 (Certificate of Eligibility for Nonimmigrant Student Status) | I-20表 | **OFFICIAL**. Keep Latin. Embassy 2020 SEVP guidance: DHS I-20（资格证明）表格; short form I-20表 everywhere. No official Chinese full title. I-20 수령 = 领取I-20. | <https://china.usembassy-china.org.cn/zh/2020%e7%a7%8b%e5%ad%a3%e5%ad%a6%e6%9c%9f%e5%9c%a8%e7%be%8e%e5%ad%a6%e7%94%9f%e7%bd%91%e7%bb%9c%e6%8e%88%e8%af%be%e6%8c%87%e5%af%bc%e6%84%8f%e8%a7%81/> |
| SEVIS | SEVIS (Student and Exchange Visitor Information System) | 学生和交流访问者信息系统（SEVIS） | **OFFICIAL**. Keep Latin. Embassy 2020 page wording. Embassy 2025 DHS translation: 学生与学者信息系统; zh.wikipedia: 学生和访问学者信息系统. SEVP = 学生和交流访问者项目（SEVP）. | <https://china.usembassy-china.org.cn/zh/2020%e7%a7%8b%e5%ad%a3%e5%ad%a6%e6%9c%9f%e5%9c%a8%e7%be%8e%e5%ad%a6%e7%94%9f%e7%bd%91%e7%bb%9c%e6%8e%88%e8%af%be%e6%8c%87%e5%af%bc%e6%84%8f%e8%a7%81/> |
| SEVIS I-901 | SEVIS I-901 fee | SEVIS I-901费用 | **OFFICIAL**. Keep Latin. Agencies shorten to SEVIS费. $350 = 350美元. | <https://m-news.artron.net/news/20250609/n1017115.html> |
| DS-160 | DS-160 (online nonimmigrant visa application) | DS-160申请表 | **OFFICIAL**. Keep Latin. Also DS-160 确认页 (confirmation page). | <https://china.usembassy-china.org.cn/zh/visas-zh/> |
| MRV 수수료 | MRV fee (visa application fee) | 签证申请费（MRV费用） | **OFFICIAL**. Keep Latin. Same page also says 签证费（MRV费用）. $185 = 185美元. | <https://china.usembassy-china.org.cn/zh/visa-information-zh/> |
| 비자 인터뷰 / 영사 인터뷰 | visa interview (consular interview) | 签证面谈 | **OFFICIAL**. Everyday word 面签 is also used by the embassy (面签预约). 대사관 인터뷰 = 使馆面签. | <https://china.usembassy-china.org.cn/zh/visas-zh/nonimmigrant-visas/> |
| 영사 | consular officer | 领事官员 | **OFFICIAL**. Families say 签证官; the embassy Q&A uses it too. | <https://china.usembassy-china.org.cn/zh/85000-student-visas-mission-china-has-issued-since-may-2021-cn/> |
| 214(b) | INA Section 214(b) refusal (presumed immigrant intent) | 214(b)拒签 | **REFERENCE**. Keep Latin. zh.wikipedia: 《移民与国籍法》第214(b)条; presumption = 类别推定. Agencies say 移民倾向 (이민 의도). | <https://zh.wikipedia.org/zh-cn/美国签证政策> |
| 행정 처리 (221(g)) | administrative processing / 221(g) | 行政审查（221(g)） | **COMMON**. Keep Latin. No official Chinese found. New Oriental uses 行政审查 and 行政审核; slang 被check. (Korean label supplied for reference; not found in the current Korean site text.) | <https://liuxue.xdf.cn/blog/blog_7955102.shtml> |
| D/S (재학 기간 체류) | duration of status (D/S) and the move to fixed admission periods | 身份持续有效期（D/S）；固定期限 | **OFFICIAL**. Keep Latin. Embassy Chinese on the Aug 2025 proposed rule: 身份持续有效期（duration of status）, 入境时间设定为固定期限, 不得超过4年. No Chinese text found for a 2026 final rule. | <https://china.usembassy-china.org.cn/zh/trump-administration-proposes-new-rule-to-end-foreign-student-visa-abuse/> |
| DSO | DSO (Designated School Official) | 指定学校官员（DSO） | **COMMON**. Keep Latin. WES Simplified Chinese: 指定的学校官员（DSO）; another WES page 指定学校工作人员. Families say 国际学生办公室顾问. (Korean label supplied for reference; not found in the current Korean site text.) | <https://www.wes.org/zh-hans/resource-library/blog/education-zh-hans/student-visa-work-options-2/> |
| OPT | OPT (Optional Practical Training) | OPT（可选实习培训） | **OFFICIAL**. Keep Latin. No single Chinese name: USCIS 可选实习培训; Embassy 2022 选择性实习（OPT）; zh.wikipedia 选择性实习训练. Always keep OPT; gloss once with the USCIS wording. | <https://www.uscis.gov/working-in-the-united-states/information-for-employers-and-employees/automatic-employment-authorization-document-ead-extension/automatic-employment-authorization-document-ead-extension-chinese> |
| STEM 전공 OPT 연장 | STEM OPT extension (24 months) | STEM OPT延期（24个月） | **OFFICIAL**. Keep Latin. USCIS Chinese: STEM 学生可选实习培训延期. 12개월과 36개월 = 12个月与36个月. | <https://www.uscis.gov/working-in-the-united-states/information-for-employers-and-employees/automatic-employment-authorization-document-ead-extension/automatic-employment-authorization-document-ead-extension-chinese> |
| E-Verify 가입 고용주 | E-Verify employer | 已加入E-Verify的雇主 | **UNVERIFIED**. Keep Latin. Gloss once as E-Verify（电子就业资格验证系统）, matching USCIS's Chinese name for Form I-9 (就业资格验证). | (none found) |
| I-983 | Form I-983 (Training Plan for STEM OPT Students) | I-983培训计划表 | **UNVERIFIED**. Keep Latin. No Chinese source. | (none found) |
| CIP 코드 | CIP code / DHS STEM Designated Degree Program List | CIP代码 / STEM指定学位专业清单 | **UNVERIFIED**. Keep Latin. No Chinese source. | (none found) |
| I-765 / EAD | Form I-765 / EAD (Employment Authorization Document) | I-765表 / 工作许可（EAD） | **OFFICIAL**. Keep Latin. USCIS Chinese: 《I-765 表格：工作许可申请表》 and 就业授权文件 / 工作许可证（EAD）. Families say 工卡. | <https://www.uscis.gov/working-in-the-united-states/information-for-employers-and-employees/automatic-employment-authorization-document-ead-extension/automatic-employment-authorization-document-ead-extension-chinese> |
| 실업일수 | unemployment days (90 / 150) | 失业天数（90天/150天） | **UNVERIFIED**. Standard agency wording; no official source found. | (none found) |
| cap-gap | cap-gap extension | Cap-Gap延期 | **UNVERIFIED**. Keep Latin. Keep Cap-Gap in Latin; no Chinese source. | (none found) |
| CPT | CPT (Curricular Practical Training) | CPT（课程实习训练） | **REFERENCE**. Keep Latin. WES: 课程实习（CPT）. (Korean label supplied for reference; not found in the current Korean site text.) | <https://zh.wikipedia.org/zh-cn/课程实习训练> |
| H-1B | H-1B specialty occupation visa | H-1B工作签证 | **OFFICIAL**. Keep Latin. Embassy H-1B FAQ uses H-1B签证; zh.wikipedia: 专业职位. 취업 비자 = 工作签证. | <https://china.usembassy-china.org.cn/zh/h-1b-faq/> |
| H-1B 캡 (85,000) | H-1B cap (65,000 regular + 20,000 U.S. master's) | H-1B名额（65000个常规名额 + 20000个硕士名额） | **REFERENCE**. Keep Latin. zh.wikipedia: 65000个名额 / 20000个优先名额. Agencies say 配额 / 名额 and 硕士名额. | <https://zh.wikipedia.org/zh-cn/H-1B签证> |
| H-1B 추첨 | H-1B registration and lottery (selection) | H-1B抽签 | **OFFICIAL**. Keep Latin. Embassy FAQ: H-1B抽签, 抽签申请. Registration = 电子注册 (unverified). | <https://china.usembassy-china.org.cn/zh/h-1b-faq/> |
| 임금 가중 추첨 | wage-weighted selection (2026 rule) | 按工资等级加权抽签 | **UNVERIFIED**. Embassy FAQ only describes the planned rule (优先考虑高技能、高薪资的外籍人员). Shorthand 加权抽签 is unverified. | <https://china.usembassy-china.org.cn/zh/h-1b-faq/> |
| 임금 레벨 | prevailing wage levels I-IV (Department of Labor) | 现行工资标准 一级至四级（Level I-IV） | **OFFICIAL**. Keep Latin. Embassy FAQ: 现行工资标准（美国劳工部）. Level labels unverified; keep Level I-IV in Latin. 레벨 I = 一级（Level I）. | <https://china.usembassy-china.org.cn/zh/h-1b-faq/> |
| cap-exempt | cap-exempt employers (universities, nonprofit research institutions) | 免配额雇主（cap-exempt） | **UNVERIFIED**. Keep Latin. No Chinese source. | (none found) |
| H-1B $10만 수수료 | H-1B $100,000 fee (2025 proclamation) | 10万美元H-1B费用 | **OFFICIAL**. Keep Latin. Embassy FAQ: 须附缴10万美元费用, 一次性收费. | <https://china.usembassy-china.org.cn/zh/h-1b-faq/> |
| EducationUSA | EducationUSA | EducationUSA美国留学咨询中心 | **OFFICIAL**. Keep Latin. Embassy name for the advising network; the older name 美国教育咨询中心 also appears. Useful when citing sources in zh copy. (Korean label supplied for reference; not found in the current Korean site text.) | <https://china.usembassy-china.org.cn/zh/u-s-consulate-general-wuhan-launches-educationusa-advising-center/> |

### 1.4 Green cards and immigration (41)

| Korean | English | Simplified Chinese | Notes | Source |
|---|---|---|---|---|
| 영주권 | green card | 绿卡 | **OFFICIAL**. The card itself is 永久居民卡（I-551表）; the USCIS Chinese guide says some people call it 绿卡. 영주권자 = 绿卡持有人 / 永久居民. | <https://www.uscis.gov/sites/default/files/document/guides/M-618_cs.pdf> |
| 영주권 (신분) | lawful permanent resident / permanent residency | 合法永久居民 | **OFFICIAL**. Same USCIS page also uses 合法永久居留权（绿卡） for the status. Use 永久居留权 where the Korean means the status rather than the card. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| 가족 영주권 / 가족 이민 | family-based immigration / family-based green card | 亲属移民 | **OFFICIAL**. U.S. Embassy China page title: 亲属移民签证. Subtypes there: 直系亲属类别和家庭优先类别. | <https://china.usembassy-china.org.cn/zh/visas-zh/immigrant-visas-zh/> |
| 취업이민 | employment-based immigration | 职业移民 | **OFFICIAL**. USCIS Chinese page writes 就业移民签证类别; the embassy writes 劳工类移民; mainland families and agencies overwhelmingly say 职业移民. Recommend 职业移民, with 就业移民 acceptable. 취업 영주권 = 职业移民绿卡. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| EB-1 | EB-1 (priority workers: extraordinary ability, outstanding researchers, multinational managers) | EB-1 职业移民第一优先 | **OFFICIAL**. Keep Latin. USCIS Chinese: EB-1A 杰出才能, EB-1B 杰出教授和研究人员, EB-1C 跨国公司经理和执行. 职业移民第一优先 is the usual first-mention gloss (not on a USCIS page). | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| EB-2 | EB-2 (advanced degree professionals) | EB-2 高级学位专业人士和杰出人才 | **OFFICIAL**. Keep Latin. Wording from the USCIS Chinese page. Shorter on-site gloss: EB-2（高学历专业人士）. 석사 이상 EB-2 = 硕士及以上学历走EB-2. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| EB-2 NIW | EB-2 NIW (National Interest Waiver) | 国家利益豁免（NIW） | **OFFICIAL**. Keep Latin. USCIS Chinese: 被称为国家利益豁免. Mainland agencies write NIW国家利益豁免 / EB-2 NIW. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| EB-3 (숙련직, 전문직, 비숙련직) | EB-3 (skilled workers, professionals, other/unskilled workers) | EB-3 技术劳工、专业人士和其他（非技术）劳工 | **OFFICIAL**. Keep Latin. USCIS Chinese wording. On-site: 전문직 = 专业人士, 숙련직 = 技术劳工, 비숙련직 = 非技术劳工. EB-3 취업이민 = EB-3职业移民. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| EB-5 투자이민 | EB-5 investment immigration (immigrant investor program) | EB-5投资移民 | **OFFICIAL**. Keep Latin. USCIS Chinese PDF: EB-5（移民投资者）区域中心. Everyday mainland term: EB-5投资移民. 투자이민 alone = 投资移民. | <https://www.uscis.gov/sites/default/files/document/legal-docs/eb5rcschinese.pdf> |
| TEA (고용촉진지역) | TEA (targeted employment area) | 目标就业区（TEA） | **COMMON**. Keep Latin. No U.S. government Chinese source found; Baidu Baike uses 目标就业区. (Korean label supplied for reference; not found in the current Korean site text.) | <https://baike.baidu.com/item/美国投资移民政策/9494094> |
| 리저널센터 | regional center | 区域中心 | **OFFICIAL**. (Korean label supplied for reference; not found in the current Korean site text.) | <https://www.uscis.gov/sites/default/files/document/legal-docs/eb5rcschinese.pdf> |
| I-526E | Form I-526E (Immigrant Petition by Regional Center Investor) | I-526E表（区域中心投资者移民申请） | **UNVERIFIED**. Keep Latin. Translation of the English form title; no Chinese source. (Korean label supplied for reference; not found in the current Korean site text.) | (none found) |
| 조건부 영주권 | conditional green card (2-year conditional permanent residence) | 有条件绿卡（两年期条件永久居民身份） | **OFFICIAL**. USCIS Chinese guide: 条件性永久居民（CR）, card valid two years; zh.wikipedia: 有条件的永久居民身份. 有条件绿卡 is the everyday term (unsourced). | <https://www.uscis.gov/sites/default/files/document/guides/M-618_cs.pdf> |
| 조건을 해제 (I-829) | removal of conditions (Form I-829) | 移除条件（I-829表） | **OFFICIAL**. Keep Latin. USCIS Chinese guide: I-829表（企业家移除条件申请）. Baike: 条件移除. Marriage-based equivalent I-751 = 移除留居条件申请. | <https://www.uscis.gov/sites/default/files/document/guides/M-618_cs.pdf> |
| E-2 소액투자 비자 | E-2 treaty investor visa | E-2条约投资人签证 | **REFERENCE**. Keep Latin. zh.wikipedia 美国签证: 条约投资人. 小额投资签证 is only a colloquial label. Important: China is not an E-2 treaty country, so PRC nationals qualify only through another nationality; the zh page must not present E-2 as open to Chinese citizens. | <https://zh.wikipedia.org/zh-cn/美国签证> |
| 노동허가 (PERM) | PERM labor certification | PERM劳工证 | **OFFICIAL**. Keep Latin. USCIS Chinese: 永久就业证明（通常被称为劳工证明）; DOL = 劳工部（DOL）. Mainland usage: 劳工证. First mention: 劳工证（PERM）. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| 이민청원 (I-140) | immigrant petition (Form I-140) | I-140移民申请 | **OFFICIAL**. Keep Latin. USCIS Chinese: I-140外来工作者移民申请; zh.wikipedia: 外籍劳工移民申请（I-140表）. 이민청원 = 移民申请 / 移民排期申请. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/nonimmigrant-pathways-for-stem-employment-in-the-united-states/nonimmigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| 신분 변경 (I-485) | adjustment of status (Form I-485) | 调整身份（I-485表） | **OFFICIAL**. Keep Latin. USCIS Chinese uses 调整身份 / 身份调整. The I-485 form title in the USCIS guide is I-485表（永久居留登记或变更身份申请）. The Korean/English site says change of status for I-485; that is wrong (I-485 is adjustment of status). Fix in zh and flag for KO/EN. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| 신분 변경 | change of status (nonimmigrant, e.g. F-1 to H-1B) | 身份变更 | **OFFICIAL**. USCIS Chinese: 将您的身份变更为TN. Everyday 转身份 (unsourced). 졸업 후 신분 변경 = 毕业后身份变更. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/nonimmigrant-pathways-for-stem-employment-in-the-united-states/nonimmigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| 영사수속 | consular processing | 领事处理 | **OFFICIAL**. zh.wikipedia: 海外领事流程. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| 대사관 인터뷰 (이민비자) | immigrant visa interview at the embassy/consulate | 移民签证面谈 | **OFFICIAL**. In China only 美国驻广州总领事馆 handles immigrant visas. 이민비자 = 移民签证. | <https://china.usembassy-china.org.cn/zh/visas-zh/immigrant-visas-zh/employment-based-immigration/> |
| 국립비자센터 | National Visa Center (NVC) | 美国国家签证中心（NVC） | **OFFICIAL**. Keep Latin. (Korean label supplied for reference; not found in the current Korean site text.) | <https://china.usembassy-china.org.cn/zh/visas-zh/immigrant-visas-zh/employment-based-immigration/> |
| 우선일자 | priority date | 优先日期 | **OFFICIAL**. zh.wikipedia: the queue is 俗称排期. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| Visa Bulletin | Visa Bulletin | 签证公告（Visa Bulletin） | **OFFICIAL**. Keep Latin. USCIS Chinese page literally says 移民部签证公告 (a mistranslation; it is a State Department publication). Use 美国国务院签证公告 or 签证公告（Visa Bulletin）; families call it 排期表. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| 최종 승인일 (Final Action Date) | final action date | 最终行动日期（表A） | **UNVERIFIED**. zh.wikipedia only describes it (最终移民批准日期). Agency usage 表A / 最终行动日期 not sourced. (Korean label supplied for reference; not found in the current Korean site text.) | <https://zh.wikipedia.org/zh-cn/美国永久居民> |
| 접수 가능일 (Dates for Filing) | dates for filing | 递交申请日期（表B） | **UNVERIFIED**. No source seen. (Korean label supplied for reference; not found in the current Korean site text.) | (none found) |
| 문호 | visa availability / cutoff dates (how far the chart has moved) | 排期 | **REFERENCE**. Korean 문호 (open/closed door) maps to mainland 排期. 문호가 열리다 = 排期前进 / 无排期（C）; 문호 후퇴 = 排期倒退 (Baike). | <https://zh.wikipedia.org/zh-cn/美国永久居民> |
| 아동신분보호법 (CSPA) | Child Status Protection Act (CSPA) | 儿童身份保护法（CSPA） | **UNVERIFIED**. Keep Latin. No Chinese page found on USCIS, zh.wikipedia or Baike; this is the usual literal rendering. | (none found) |
| 만 21세 미만 미혼 자녀 (함께 영주권을 받는 가족) | derivative beneficiaries (spouse and unmarried children under 21) | 随行家属（配偶及未满21岁的未婚子女） | **COMMON**. Baike exact phrase: 其配偶及未满21岁的未婚子女可同时申办. Embassy: 配偶和子女可申请随同或随后赴美移民. Legal term 派生受益人 unverified. 만 21세 미만 = 未满21周岁. | <https://baike.baidu.com/item/美国投资移民政策/9494094> |
| 주신청자 | principal applicant | 主申请人 | **REFERENCE**. (Korean label supplied for reference; not found in the current Korean site text.) | <https://zh.wikipedia.org/zh-cn/EB-2签证> |
| Schedule A | Schedule A (pre-certified shortage occupations, e.g. registered nurses) | 附表A（Schedule A） | **OFFICIAL**. Keep Latin. USCIS Chinese: 附表 A 第一组职业. 간호사 취업이민 = 护士职业移民. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| NCLEX-RN | NCLEX-RN | 美国注册护士执照考试（NCLEX-RN） | **COMMON**. Keep Latin.  | <https://baike.baidu.com/item/NCLEX-RN> |
| VisaScreen / CGFNS | VisaScreen certificate / CGFNS | VisaScreen证书（CGFNS 外国护校毕业生国际委员会） | **COMMON**. Keep Latin. Chinese name exists for CGFNS only (Baike); keep VisaScreen in Latin. | <https://baike.baidu.com/item/CGFNS> |
| 이민 변호사 | immigration attorney | 移民律师 | **OFFICIAL**. USCIS guide also uses 持证移民律师. 이민법 고문 = 移民法顾问. 대표 변호사 = 主理律师 / 首席律师. 뉴욕주 변호사 = 纽约州执业律师. | <https://www.uscis.gov/sites/default/files/document/guides/M-618_cs.pdf> |
| 미국 이민 변호사 협회 (AILA) | American Immigration Lawyers Association (AILA) | 美国移民律师协会（AILA） | **UNVERIFIED**. Keep Latin. No zh.wikipedia or Baike article; standard literal rendering used by Chinese-American firms. | (none found) |
| 미국 법무사 (캘리포니아) | Legal Document Assistant (California) | 加州法律文书助理（Legal Document Assistant，LDA） | **UNVERIFIED**. Keep Latin. No Chinese source. Do not use 律师 or 法务师. Make clear it is a non-lawyer document preparer registered with the county: 非律师，在县政府注册的法律文书助理. Korean 법무사 is a different (licensed) profession in Korea; avoid 司法书士. | (none found) |
| 미국 공증인 (뉴저지) | Notary Public (New Jersey) | 公证人（Notary Public，新泽西州） | **REFERENCE**. Keep Latin. zh.wikipedia 公证人 (notary public). Avoid 公证员, which in the PRC is a legally trained official; a U.S. notary gives no legal advice. | <https://zh.wikipedia.org/zh-cn/公证人> |
| 청원인 / 수혜자 | petitioner / beneficiary | 申请人（雇主或担保方）/ 受益人 | **OFFICIAL**. USCIS Chinese: 申请人（通常是雇主）and 受益人. Gloss 申请人 because it is ambiguous. (Korean label supplied for reference; not found in the current Korean site text.) | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| 고용주 스폰서 | employer sponsorship / sponsoring employer | 雇主担保 | **OFFICIAL**. USCIS Chinese: 担保雇主; embassy: 由未来的美国雇主担保. 고용주가 영주권을 신청 = 雇主为其申请绿卡. | <https://www.uscis.gov/working-in-the-united-states/stem-employment-pathways/immigrant-pathways-for-stem-employment-in-the-united-states/immigrant-pathways-for-stem-employment-in-the-united-states-chinese> |
| USCIS | U.S. Citizenship and Immigration Services (USCIS) | 美国公民与移民服务局（USCIS） | **OFFICIAL**. Keep Latin. USCIS's current Simplified Chinese pages (EAD page, M-618 guide) use 美国公民与移民服务局; the older EB-5 PDF and the Embassy use 及. Use 与 to match USCIS today. Mainland media usually just say 美国移民局. | <https://www.uscis.gov/working-in-the-united-states/information-for-employers-and-employees/automatic-employment-authorization-document-ead-extension/automatic-employment-authorization-document-ead-extension-chinese> |
| 이민법 로펌 | immigration law firm | 移民律师事务所 | **COMMON**. KL Legal Services (이민법 로펌) = KL Legal Services（移民律师事务所）. | (none found) |

### 1.5 Business and site terms (39)

| Korean | English | Simplified Chinese | Notes | Source |
|---|---|---|---|---|
| 홈 | Home | 首页 | **COMMON**. Navigation label. | <https://liuxue.xdf.cn/> |
| 회사소개 | About Us | 关于我们 | **COMMON**. Navigation label. Standard on mainland agency sites (New Oriental Vision Overseas uses 关于我们). | <https://liuxue.xdf.cn/> |
| 신입학 | Freshman Admissions | 本科新生申请 | **UNVERIFIED**. Navigation label. Mainland agencies say 美国本科申请; 本科新生申请 keeps the contrast with 转学申请. In running text 新生入学申请 or 本科申请. | <https://liuxue.xdf.cn/> |
| 편입학 | Transfer Admissions | 转学申请 | **COMMON**. Navigation label. New Oriental uses 转学申请 / 美国本科转学申请. 편입 alone = 转学. | <https://liuxue.xdf.cn/> |
| 대학원 | Graduate School | 研究生申请 | **COMMON**. Navigation label = 研究生申请 (the service). The institution itself = 研究生院. Mainland agencies also write 美国研究生. | <https://liuxue.xdf.cn/> |
| 입학 가이드 | Admissions Guides | 申请指南 | **COMMON**. Navigation label. 留学攻略 is the chattier alternative used by agencies; 申请指南 fits the site's tone. | <https://liuxue.xdf.cn/> |
| 합격 후기 | Acceptance Stories | 录取案例 | **COMMON**. Navigation label. Mainland agencies use 成功案例 / 录取案例; 录取故事 is closer to 후기 but rarer. Single story page title: 录取案例 or 录取经验分享. | <https://liuxue.xdf.cn/> |
| 이민과 비자 | Immigration & Visas | 移民与签证 | **UNVERIFIED**. Navigation label. | (none found) |
| 무료 상담 신청 | Request a Free Consultation | 申请免费咨询 | **COMMON**. CTA. Agencies also use 免费评估 (free assessment) for the same funnel. The site's 1:1 무료 진단 = 一对一免费评估. | <https://liuxue.xdf.cn/> |
| 상담 예약 | Book a Consultation | 预约咨询 | **COMMON**. CTA. Exact label on New Oriental Vision Overseas. | <https://liuxue.xdf.cn/> |
| 상담 | consultation | 咨询 | **COMMON**. 1:1 상담 = 一对一咨询. 무료 1:1 상담 = 免费一对一咨询. | <https://liuxue.xdf.cn/> |
| 자세히 보기 | View Details | 查看详情 | **UNVERIFIED**. UI label, standard mainland web wording. | (none found) |
| 메뉴 열기 | Open Menu | 打开菜单 | **UNVERIFIED**. UI label (aria). | (none found) |
| 메인 메뉴 | Main Menu | 主菜单 | **UNVERIFIED**. UI label (aria). | (none found) |
| 자주 묻는 질문 / Q&A | FAQ | 常见问题 | **COMMON**. 편입 Q&A = 转学常见问题 or keep 转学 Q&A; mainland sites use both Q&A and 问答. | <https://liuxue.xdf.cn/> |
| 컨설턴트 | consultant | 顾问 | **COMMON**. 升学顾问 / 留学顾问 when the context needs it. New Oriental labels its consultants 顾问. | <https://liuxue.xdf.cn/> |
| 총괄 컨설턴트 | Head Consultant | 首席顾问 | **UNVERIFIED**. CEO \| 미국 입시와 진로 전략 총괄 컨설턴트 = CEO \| 美国升学与职业规划首席顾问. | (none found) |
| 대표 | CEO | CEO / 创始人 | **COMMON**. Keep Latin. Mainland business copy keeps CEO in Latin letters. Jay 대표 = Jay（CEO） or 创始人 Jay; avoid 代表 (means representative). | (none found) |
| 튜터 | tutor | 辅导老师 | **COMMON**. Avoid 家教 for the brand's tutors (implies private home tutor). 개인 과외 in bios = 一对一家教 / 私人辅导. | (none found) |
| 멘토 | mentor | 导师 | **COMMON**. 学业导师 for academic mentor. | (none found) |
| Academic Coaching / 코칭 | Academic Coaching | Academic Coaching（学业辅导） | **UNVERIFIED**. Keep Latin. Brand program name on the keep list: keep Latin, add 学业辅导 once as a gloss. Generic 코칭 = 辅导 / 学习指导. | (none found) |
| 학습 계획 | study plan | 学习计划 | **COMMON**. 연간/월간 계획 = 年度/月度计划. (Korean label supplied for reference; not found in the current Korean site text.) | (none found) |
| 주간 리포트 | weekly report | 每周报告 | **COMMON**. 周报 is the shorter colloquial form. 성적/습관 변화 리포트 = 成绩与习惯变化报告. | (none found) |
| 로드맵 | roadmap | 规划路线图 | **COMMON**. 학생 개발 로드맵 = 学生成长规划路线图. Mainland agencies usually say 规划 / 升学规划. | (none found) |
| 학부모 | parents | 家长 | **COMMON**. Honorific 학부모님 has no equivalent; 家长 is neutral and respectful. | (none found) |
| 미국 유학 | studying in the U.S. | 赴美留学 | **COMMON**. Or 美国留学 as a noun phrase. New Oriental uses 美国本科 / 美国研究生 for levels. | <https://liuxue.xdf.cn/> |
| 유학원 | study abroad agency | 留学机构 | **COMMON**. 留学中介 is the everyday word but slightly pejorative; 留学机构 is neutral. | (none found) |
| 학원 | private academy | 培训机构 | **COMMON**. 补习班 for a cram class. 이공계 학원 = 理工科培训机构. 학원식 강의 = 补习班式授课. | (none found) |
| 설명회 | information session | 说明会 | **COMMON**. Agencies also use 讲座 / 宣讲会. | <https://liuxue.xdf.cn/> |
| 올케어 | All-Care | All-Care 全程服务 | **UNVERIFIED**. Keep Latin. Brand term; keep Latin. Proposed gloss 全程服务 (end-to-end service). 원비전 올케어 플랜 = OneVision All-Care Plan（全程服务方案）. Needs client sign-off. | (none found) |
| 미국 본사 | U.S. Headquarters | 美国总部 | **COMMON**.  | (none found) |
| 한국 사무소 | Korea Office | 韩国办事处 | **COMMON**.  | (none found) |
| 시카고 지사 | Chicago Branch | 芝加哥分部 | **COMMON**. 分公司 implies a separately registered branch company; 分部 is safer unless it is one. | (none found) |
| 한국 지사 | Korea Branch | 韩国分部 | **COMMON**.  | (none found) |
| 공인회계사 (CPA) | CPA (Certified Public Accountant) | 美国注册会计师（CPA） | **COMMON**. Keep Latin. Mainland readers know CPA; 注册会计师 alone could be read as the Chinese CPA (中国注册会计师). | (none found) |
| CCFC | CCFC (Certified College Financial Consultant) | CCFC（认证大学财务规划顾问） | **UNVERIFIED**. Keep Latin. No Chinese name exists; keep CCFC and gloss as on the Korean site. Issuer: American Institute of Certified College Financial Consultants (per FINRA). | <https://www.finra.org/investors/professional-designations/ccfc> |
| 학군 | school district | 学区 | **COMMON**.  | (none found) |
| 주거 | housing | 住房 | **COMMON**. Immigration & Housing = 移民与住房. | (none found) |
| 주 소득세 | state income tax | 州个人所得税 | **COMMON**. 州所得税 is also fine. | (none found) |

### 1.6 Korean-specific terms and addresses (17)

| Korean | English | Simplified Chinese | Notes | Source |
|---|---|---|---|---|
| 수능 | CSAT (College Scholastic Ability Test) | 韩国大学修学能力考试（修能，韩国高考） | **REFERENCE**. zh.wikipedia title 大学修学能力试验, short 修能; also called 韩国学测/联考. For mainland parents add 韩国高考 on first mention. EBS 수능 영어 강사 = EBS修能英语讲师. | <https://zh.wikipedia.org/zh-cn/大學修學能力試驗> |
| 한국 교육과정 평가원 | Korea Institute for Curriculum and Evaluation (KICE) | 韩国教育课程评价院 | **REFERENCE**. Named in the zh.wikipedia CSAT article as the body that runs 修能. 출제위원 = 命题委员. | <https://zh.wikipedia.org/zh-cn/大學修學能力試驗> |
| EBS | EBS (Korea Educational Broadcasting System) | 韩国教育广播公司（EBS） | **REFERENCE**. Keep Latin. zh.wikipedia mainland title 韩国教育广播公司; the CSAT article says 韩国教育广播公社. | <https://zh.wikipedia.org/zh-cn/韓國教育廣播公社> |
| 내신 | school grades (GPA) | 在校成绩 | **UNVERIFIED**. Korean 내신 has no mainland equivalent (内申 is not mainland usage). On this site it means the student's high school grades, so use 在校成绩 or 在校成绩（GPA）. 내신 수준 (GPA) = 在校成绩（GPA）. | (none found) |
| 특목고 | special-purpose high school | 特殊目的高中（特目高） | **COMMON**. Explain on first use: 韩国的外国语高中、科学高中等特殊目的高中. (Korean label supplied for reference; not found in the current Korean site text.) | <https://creatrip.com/zh-CN/blog/8823> |
| 외고 | foreign language high school | 外国语高中 | **COMMON**. Mainland readers know 外国语学校 (e.g. 外国语中学), so 韩国外国语高中 reads naturally. Creatrip writes 外语高中. (Korean label supplied for reference; not found in the current Korean site text.) | <https://creatrip.com/zh-CN/blog/8823> |
| 국제학교 | international school | 国际学校 | **COMMON**. 한국 국제학교 = 韩国的国际学校. Canada Ontario Curriculum 국제학교 = 加拿大安大略课程国际学校. | (none found) |
| 카카오톡 | KakaoTalk | KakaoTalk | **REFERENCE**. Keep Latin. On the keep list. zh.wikipedia gives 卡考说说 but nobody uses it. Gloss once: 韩国常用的即时通讯软件 KakaoTalk. Access from mainland China has been disrupted since 2014 (Citizen Lab), so a zh page needs a WeChat or email channel. | <https://zh.wikipedia.org/zh-cn/KakaoTalk> |
| 오픈채팅 | Open Chat | 开放聊天室 | **UNVERIFIED**. 카카오톡 오픈채팅 = KakaoTalk 开放聊天室 (Open Chat). No official Chinese UI string found. | (none found) |
| 네이버 카페 | Naver Cafe | Naver 论坛（Naver Cafe） | **REFERENCE**. Keep Latin. zh.wikipedia NAVER article calls Cafe 论坛 and notes mainland users cannot access NAVER 论坛和博客 since Oct 2018. Keep the Latin name so readers can find it. | <https://zh.wikipedia.org/zh-cn/Naver> |
| 네이버 블로그 | Naver Blog | Naver 博客 | **REFERENCE**. Keep Latin. Same access caveat as Naver Cafe. | <https://zh.wikipedia.org/zh-cn/Naver> |
| 인스타그램 | Instagram | Instagram | **COMMON**. Keep Latin. On the keep list. Mainland readers know it as Instagram / Ins; also blocked in mainland China. | (none found) |
| 해커스 어학원 | Hackers Academia | Hackers Academia（韩国 Hackers 语言学院） | **UNVERIFIED**. Keep Latin. Keep the official English name; optional gloss. | <https://www.facebook.com/HackersAcademia> |
| 서울시 강남구 테헤란로 126 GT 대공빌딩 4층 | 126 Teheran-ro, Gangnam-gu, Seoul | 首尔特别市江南区德黑兰路126 | **REFERENCE**. Chinese order runs large to small: 韩国首尔特别市江南区德黑兰路126 GT大公大厦4层 (or keep the building name in Latin: GT Daegong Building 4层). Give the Korean original alongside for taxis/maps. | <https://zh.wikipedia.org/zh-cn/德黑蘭路> |
| 경기도 성남시 분당구 황새울로319번길 8-4 비욘드워크 7층 734호 (서현동) | Suite 734, 7F, Beyondwork, 8-4 Hwangsaeul-ro 319beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do (Seohyeon-dong) | 韩国京畿道城南市盆唐区 Hwangsaeul-ro 319beon-gil 8-4 Beyondwork 7层734室（书岘洞） | **REFERENCE**. Province/city/district/dong have standard Chinese (京畿道, 城南市, 盆唐区 per zh.wikipedia). 황새울로 has no established Chinese form, so keep it romanized. 서현동 hanja is 書峴洞 (ko.wikipedia) = 书岘洞; the zh.wikipedia 盆唐区 page writes 书砚洞, which looks like an error. Keep the Korean original next to it. | <https://zh.wikipedia.org/zh-cn/盆唐區> |
| Buena Park (미국 본사) | 6131 Orangethorpe Ave. Ste 480, Buena Park, CA 90620 | 美国加州比埃纳帕克（Buena Park） | **REFERENCE**. Keep Latin. Keep the street address in English (mail and maps need it). City name per zh.wikipedia: 比埃纳帕克 (redirect from Buena Park, California); Chinese-American community also writes 布埃纳帕克. Safest: 加州 Buena Park. | <https://zh.wikipedia.org/zh-cn/比埃纳帕克> |
| Downers Grove (시카고 지사) | 732 Ogden Ave., Downers Grove, IL | 伊利诺伊州 Downers Grove（芝加哥郊区） | **REFERENCE**. Keep Latin. No settled Chinese name: the zh.wikipedia title is 当纳斯格罗夫 but its first sentence says 当勒斯格罗夫, and other pages write 唐纳斯格罗夫. Keep Downers Grove in Latin letters with 芝加哥郊区 as the gloss, and keep the English street address. | <https://zh.wikipedia.org/zh-cn/当纳斯格罗夫> |

## 2. University names (137)

Korean column shows how the Korean site writes the name (blank = the Korean site uses the English name). Short form = what mainland families commonly say; use it only after the full name has appeared once on the page.

| English | Korean (site) | Chinese | Short form | Notes | Source |
|---|---|---|---|---|---|
| University of California (system) |  | 加利福尼亚大学 | 加州大学 / UC | **REFERENCE**. zh-cn title displays 加州大学; Berkeley's official Chinese parent guide uses both forms. Campuses follow 加州大学X分校. | <https://zh.wikipedia.org/zh-cn/加利福尼亚大学> |
| University of California Office of the President (UCOP) | UC 총장실 | 加州大学校长办公室 | UCOP | **UNVERIFIED**. Only an image caption on the system article; no official Chinese name. 加州大学总校长办公室 is clearer for readers. | <https://zh.wikipedia.org/zh-cn/加利福尼亚大学> |
| UC Berkeley |  | 加州大学伯克利分校 | 伯克利 / UCB | **OFFICIAL**. Berkeley's own Simplified Chinese parent guide uses 加州大学伯克利分校 (25 times). Not 柏克莱 (Taiwan). | <https://calparents.berkeley.edu/sites/default/files/berkeley_parents_fam_guide_zh.pdf> |
| UCLA | UCLA | 加州大学洛杉矶分校 | UCLA | **REFERENCE**. Families say UCLA. | <https://zh.wikipedia.org/zh-cn/加州大学洛杉矶分校> |
| UC San Diego | UC 샌디에이고 | 加州大学圣地亚哥分校 | UCSD | **REFERENCE**. Wiki title uses the Xinhua place-name form 圣迭戈; the lead uses 圣地亚哥, the more common form. Use 圣地亚哥. | <https://zh.wikipedia.org/zh-cn/加州大学圣迭戈分校> |
| UC Davis | UC 데이비스 | 加州大学戴维斯分校 | UC Davis / 戴维斯 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/加州大学戴维斯分校> |
| UC Irvine | UC 어바인 | 加州大学尔湾分校 | UCI / 尔湾 | **REFERENCE**. 欧文分校 and 尔湾分校 are both widespread in mainland agency and family usage; 尔湾 also matches the city name the Chinese community in Irvine uses. Pick one site-wide. | <https://zh.wikipedia.org/zh-cn/加州大学尔湾分校> |
| UC Santa Barbara |  | 加州大学圣塔芭芭拉分校 | UCSB | **COMMON**. Wiki is inconsistent (圣塔巴巴拉 / 圣芭芭拉 / 圣巴巴拉); 圣塔芭芭拉 is the usual agency form. | <https://zh.wikipedia.org/zh-cn/加州大学圣巴巴拉分校> |
| UC Riverside |  | 加州大学河滨分校 | UCR / 河滨 | **REFERENCE**. System article campus list uses 河滨; the campus article title is 加州大学里弗赛德分校. 河滨 is the common form. | <https://zh.wikipedia.org/zh-cn/加利福尼亚大学> |
| UC Santa Cruz |  | 加州大学圣克鲁兹分校 | UCSC | **REFERENCE**. Wiki title 圣克鲁斯; 圣克鲁兹 is also common. Pick one. | <https://zh.wikipedia.org/zh-cn/加州大学圣克鲁斯分校> |
| UC Merced |  | 加州大学默塞德分校 | UC Merced | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/加州大学默塞德分校> |
| California State University (CSU system) |  | 加利福尼亚州立大学 | 加州州立大学 / CSU | **REFERENCE**. Families say 加州州立大学. | <https://zh.wikipedia.org/zh-cn/加利福尼亚州立大学> |
| California Community Colleges (system) |  | 加州社区学院系统 | 加州社区学院 / CCC | **REFERENCE**. Article title 加利福尼亚社区学院系统. In running text 社区大学 is what families say; see the community college entry. | <https://zh.wikipedia.org/zh-cn/加利福尼亚社区学院系统> |
| Riverside City College |  | 河滨城市学院 | RCC | **UNVERIFIED**. Wiki list entry says 里弗赛德市立学院; 河滨城市学院 keeps it consistent with 加州大学河滨分校. Unverified either way. | <https://zh.wikipedia.org/zh-cn/加利福尼亚社区学院系统> |
| Ivy League | 아이비리그 | 常春藤联盟 | 藤校 / 常春藤盟校 / 常青藤 | **REFERENCE**. zh-cn title 常春藤联盟; 常春藤盟校 redirects. 藤校 is the colloquial form parents use. 아이비리그 출신 = 常春藤名校背景. | <https://zh.wikipedia.org/zh-cn/常春藤盟校> |
| Harvard University | 하버드 | 哈佛大学 | 哈佛 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/常春藤盟校> |
| Yale University |  | 耶鲁大学 | 耶鲁 | **OFFICIAL**. Yale Center Beijing (耶鲁北京中心). | <https://centerbeijing.yale.edu/zh-hans> |
| Princeton University | 프린스턴 | 普林斯顿大学 | 普林斯顿 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/常春藤盟校> |
| Columbia University |  | 哥伦比亚大学 | 哥大 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/常春藤盟校> |
| Cornell University | 코넬 | 康奈尔大学 | 康奈尔 | **REFERENCE**. Cornell's China Center calls itself 康奈尔中国中心. | <https://zh.wikipedia.org/zh-cn/康奈尔大学> |
| Brown University |  | 布朗大学 | 布朗 | **REFERENCE**. Listed in the Ivy League table. | <https://zh.wikipedia.org/zh-cn/常春藤盟校> |
| University of Pennsylvania | 펜실베이니아대학교 | 宾夕法尼亚大学 | 宾大 / UPenn | **REFERENCE**. Avoid 宾州大学 (confused with Penn State). | <https://zh.wikipedia.org/zh-cn/宾夕法尼亚大学> |
| Penn Dental Medicine (School of Dental Medicine) |  | 宾夕法尼亚大学牙医学院 | 宾大牙医学院 | **UNVERIFIED**. Wiki uses both 牙科医学院 and 口腔医学院; no official Chinese name. | <https://zh.wikipedia.org/zh-cn/宾夕法尼亚大学> |
| Dartmouth College |  | 达特茅斯学院 | 达特茅斯 | **REFERENCE**. Not on the site yet; listed for Ivy completeness. | <https://zh.wikipedia.org/zh-cn/达特茅斯学院> |
| Massachusetts Institute of Technology (MIT) |  | 麻省理工学院 | 麻省理工 / MIT | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/麻省理工学院> |
| Johns Hopkins University |  | 约翰斯·霍普金斯大学 | 霍普金斯 / JHU | **OFFICIAL**. Joint center 南京大学-约翰斯·霍普金斯大学中美文化研究中心. 约翰霍普金斯大学 is the TW/HK form. Contains the Chinese 间隔号 (see open questions). | <https://hnc.nju.edu.cn/> |
| Northwestern University |  | 美国西北大学 | 西北 / NU | **REFERENCE**. Write 美国西北大学 to avoid confusion with 西北大学 in Xi'an. NWU in bios = 美国西北大学. | <https://zh.wikipedia.org/zh-cn/西北大学_(美国)> |
| Duke University | 듀크대학교 | 杜克大学 | 杜克 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/杜克大学> |
| Emory University | 에모리대학교 | 埃默里大学 | 埃默里 | **REFERENCE**. Wiki also lists 艾默里/艾默利. | <https://zh.wikipedia.org/zh-cn/埃默里大学> |
| University of Southern California (USC) |  | 南加州大学 | 南加大 / USC | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/南加州大学> |
| USC School of Cinematic Arts |  | 南加州大学电影艺术学院 | USC电影学院 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/南加州大学电影艺术学院> |
| New York University (NYU) | 뉴욕대학교 | 纽约大学 | 纽大 / NYU | **REFERENCE**. Not the same as 上海纽约大学 (NYU Shanghai). | <https://zh.wikipedia.org/zh-cn/纽约大学> |
| Parsons School of Design |  | 帕森斯设计学院 | 帕森斯 / Parsons | **COMMON**. Redirect; wiki title 帕森设计学院. 帕森斯 is the mainland standard. Parent school: 纽约新学院 (The New School). | <https://zh.wikipedia.org/zh-cn/帕森斯设计学院> |
| Harvey Mudd College |  | 哈维·穆德学院 | 哈维穆德 / HMC | **REFERENCE**. Contains the Chinese 间隔号. | <https://zh.wikipedia.org/zh-cn/哈维·穆德学院> |
| Williams College | 윌리엄스 | 威廉姆斯学院 | 威廉姆斯 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/威廉姆斯学院> |
| Boston University | 보스턴대학교 | 波士顿大学 | BU | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/波士顿大学> |
| Boston College | 보스턴칼리지 | 波士顿学院 | BC | **REFERENCE**. Not the same as Boston University. | <https://zh.wikipedia.org/zh-cn/波士顿学院> |
| Northeastern University | 노스이스턴대학교 | 美国东北大学 | 东北 / NEU | **REFERENCE**. Write 美国东北大学 to avoid confusion with 东北大学 in Shenyang. | <https://zh.wikipedia.org/zh-cn/东北大学_(美国)> |
| Purdue University |  | 普渡大学 | 普渡 | **REFERENCE**. Not 普度. | <https://zh.wikipedia.org/zh-cn/普渡大学> |
| University of Illinois Urbana-Champaign (UIUC) |  | 伊利诺伊大学厄巴纳-香槟分校 | UIUC / 伊大 | **REFERENCE**. Zhejiang University's joint institute writes 伊利诺伊大学厄巴纳香槟校区. | <https://zh.wikipedia.org/zh-cn/伊利诺伊大学厄巴纳-香槟分校> |
| UIUC Gies College of Business |  | 吉斯商学院 | Gies | **REFERENCE**. Named in the UIUC article body. | <https://zh.wikipedia.org/zh-cn/伊利诺伊大学厄巴纳-香槟分校> |
| University of Illinois Chicago (UIC) | 일리노이대학교 시카고 | 伊利诺伊大学芝加哥分校 | UIC | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/伊利诺伊大学芝加哥分校> |
| Illinois State University |  | 伊利诺伊州立大学 |  | **REFERENCE**. Avoid ISU (clashes with Iowa State). | <https://zh.wikipedia.org/zh-cn/伊利诺伊州立大学> |
| Stony Brook University (SUNY) |  | 纽约州立大学石溪分校 | 石溪 / SBU | **REFERENCE**. Wiki title 石溪大学; lead gives the full name. | <https://zh.wikipedia.org/zh-cn/纽约州立大学石溪分校> |
| University of Michigan-Ann Arbor | 미시간대학교 | 密歇根大学安娜堡分校 | 密大 / UMich | **REFERENCE**. Wiki title 密歇根大学 (Ann Arbor written 安阿伯); 安娜堡分校 is the common family form. Plain 密歇根大学 is enough on most pages. | <https://zh.wikipedia.org/zh-cn/密歇根大学> |
| Michigan State University | 미시간주립대학교 | 密歇根州立大学 | 密歇根州立 / MSU | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/密歇根州立大学> |
| University of Wisconsin-Madison | 위스콘신대학교 | 威斯康星大学麦迪逊分校 | 威斯康星麦迪逊 / UW-Madison | **REFERENCE**. University of Wisconsin Law School = 威斯康星大学法学院. | <https://zh.wikipedia.org/zh-cn/威斯康星大学麦迪逊分校> |
| University of Minnesota Twin Cities | 미네소타대학교 | 明尼苏达大学双城分校 | 明尼苏达大学 / 明大 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/明尼苏达大学> |
| University of Washington (Seattle) | 워싱턴대학교 | 华盛顿大学 | UW / 华大 | **REFERENCE**. Add （西雅图） on first mention to avoid confusion with 圣路易斯华盛顿大学 (WashU). | <https://zh.wikipedia.org/zh-cn/华盛顿大学> |
| Washington State University |  | 华盛顿州立大学 | WSU | **REFERENCE**. Washington State (the state) = 华盛顿州. | <https://zh.wikipedia.org/zh-cn/华盛顿州立大学> |
| University of Maryland, College Park | 메릴랜드대학교 | 马里兰大学帕克分校 | 马里兰大学 / UMD | **COMMON**. Redirect to wiki title 马里兰大学科利奇帕克分校 (rare in mainland usage). | <https://zh.wikipedia.org/zh-cn/马里兰大学帕克分校> |
| University of Florida | 플로리다대학교 | 佛罗里达大学 | UF | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/佛罗里达大学> |
| Indiana University Bloomington |  | 印第安纳大学伯明顿分校 | 印第安纳大学 / IU | **COMMON**. Redirect to wiki title 印第安纳大学布卢明顿分校 (Xinhua form). | <https://zh.wikipedia.org/zh-cn/印第安纳大学伯明顿分校> |
| IU Kelley School of Business |  | 凯利商学院 | Kelley | **REFERENCE**. Wiki title 凯莱商学院; 凯利商学院 is at least as common. Pick one. | <https://zh.wikipedia.org/zh-cn/凯莱商学院> |
| Indiana University Indianapolis | 인디애나대학교 인디애나폴리스 | 印第安纳大学印第安纳波利斯分校 | IU Indianapolis | **REFERENCE**. Created 2024 from the IUPUI split. | <https://zh.wikipedia.org/zh-cn/印第安纳大学印第安纳波利斯分校> |
| Syracuse University | 시러큐스대학교 | 雪城大学 | 雪城 | **REFERENCE**. Syracuse University College of Law = 雪城大学法学院. | <https://zh.wikipedia.org/zh-cn/雪城大学> |
| Texas A&M University | 텍사스A&M대학교 | 得克萨斯农工大学 | 德州农工 / TAMU | **REFERENCE**. 得 is the mainland standard form; 德州农工 is the everyday short form. | <https://zh.wikipedia.org/zh-cn/德州农工大学> |
| The University of Texas at Austin | 텍사스대학교 오스틴 | 得克萨斯大学奥斯汀分校 | 德州大学奥斯汀分校 / UT Austin | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/德州大学奥斯汀分校> |
| The University of Alabama | 앨라배마대학교 | 阿拉巴马大学 | UA | **COMMON**. zh-cn wiki displays 亚拉巴马大学 (official place-name form); mainstream sites use 阿拉巴马. Keep 阿拉巴马 to match UAB. | <https://www.eol.cn/liuxue/school/93266.html> |
| University of Alabama at Birmingham (UAB) | 앨라배마대학교 버밍햄 | 阿拉巴马大学伯明翰分校 | UAB | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/阿拉巴马大学伯明翰分校> |
| University of Arizona | 애리조나대학교 | 亚利桑那大学 | UArizona | **OFFICIAL**. The university's Chinese site is titled 亚利桑那大学中文官网. | <https://china.arizona.edu/school-overview> |
| Arizona State University | 애리조나주립대학교 | 亚利桑那州立大学 | ASU | **OFFICIAL**.  | <https://wpcarey.asu.edu/china-programs/about-asu> |
| Auburn University | 오번대학교 | 奥本大学 | Auburn | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/奥本大学> |
| Baylor University | 베일러대학교 | 贝勒大学 | 贝勒 | **OFFICIAL**. Official Chinese site. | <https://cn.baylor.edu/> |
| Case Western Reserve University | 케이스웨스턴리저브대학교 | 凯斯西储大学 | CWRU | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/凯斯西储大学> |
| The Catholic University of America | 미국가톨릭대학교 | 美国天主教大学 | CUA | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/美国天主教大学> |
| University of Cincinnati | 신시내티대학교 | 辛辛那提大学 | 辛辛那提 | **REFERENCE**. Same name used by 重庆大学辛辛那提大学联合学院. | <https://zh.wikipedia.org/zh-cn/辛辛那提大学> |
| Clemson University | 클렘슨대학교 | 克莱姆森大学 | 克莱姆森 | **COMMON**. zh-cn wiki shows 克莱门森大学; agencies use 克莱姆森. | <https://liuxue.xdf.cn/university/2692267/major.shtml> |
| Creighton University | 크레이턴대학교 | 克雷顿大学 | Creighton | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/克雷顿大学> |
| University of Colorado Anschutz Medical Campus | 콜로라도대학교 안슈츠 | 科罗拉多大学安舒茨医学校区 | CU Anschutz | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/科罗拉多大学系统> |
| University of Colorado Boulder | 콜로라도대학교 | 科罗拉多大学博尔德分校 | CU Boulder | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/科罗拉多大学博尔德分校> |
| University of Delaware | 델라웨어대학교 | 特拉华大学 | UD | **REFERENCE**. 德拉瓦大学 is the Taiwan form. | <https://zh.wikipedia.org/zh-cn/特拉华大学> |
| George Washington University | 조지워싱턴대학교 | 乔治华盛顿大学 | GWU / 乔治华盛顿 | **OFFICIAL**. The university writes it without the 间隔号; wiki title 乔治·华盛顿大学. | <https://graduate.engineering.gwu.edu/welcome-seas-chinese> |
| University of Iowa | 아이오와대학교 | 爱荷华大学 | UIowa | **OFFICIAL**. zh-cn wiki shows 艾奥瓦大学; the university uses 爱荷华. | <https://admissions.uiowa.edu/zh> |
| Iowa State University | 아이오와주립대학교 | 爱荷华州立大学 | 爱荷华州立 | **REFERENCE**. zh-cn view displays 艾奥瓦州立大学; families use 爱荷华. Ivy College of Business = 艾维商学院 (unverified); keep Ivy College of Business in Latin. | <https://zh.wikipedia.org/zh-cn/爱荷华州立大学> |
| The University of Kansas | 캔자스대학교 | 堪萨斯大学 | KU | **REFERENCE**. Not Kansas State (堪萨斯州立大学). | <https://zh.wikipedia.org/zh-cn/堪萨斯大学> |
| University of Kentucky | 켄터키대학교 | 肯塔基大学 | UK | **OFFICIAL**.  | <https://www.as.uky.edu/2plus2-cesl-chinese> |
| Loyola University Chicago | 로욜라대학교 시카고 | 芝加哥洛约拉大学 | LUC | **REFERENCE**. Alternate 芝加哥罗耀拉大学. | <https://zh.wikipedia.org/zh-cn/芝加哥洛约拉大学> |
| Loyola University Maryland | 로욜라대학교 메릴랜드 | 马里兰洛约拉大学 | Loyola Maryland | **REFERENCE**. Displays as 马里兰罗耀拉大学; use 洛约拉 to match Chicago. | <https://zh.wikipedia.org/zh-cn/马里兰洛约拉大学> |
| Marquette University | 마켓대학교 | 马凯特大学 | Marquette | **OFFICIAL**.  | <https://www.marquette.edu/business/graduate/chinese.php> |
| MGH Institute of Health Professions | MGH 보건전문대학원 | 麻省总医院健康职业学院 | MGH IHP | **UNVERIFIED**. No standard name. Renamed Mass General Brigham University of Health Professions effective 2026-09-01 (https://www.mgbu.edu/about/name-change); no Chinese name for the new name. | <https://www.forwardpathway.com/colleges?ID=166869> |
| Medical University of South Carolina | 사우스캐롤라이나의과대학교 | 南卡罗来纳医科大学 | MUSC | **COMMON**.  | <https://baike.baidu.com/item/南卡罗来纳医科大学/61964399> |
| The Ohio State University | 오하이오주립대학교 | 俄亥俄州立大学 | 俄亥俄州立 / OSU | **OFFICIAL**. China office: 美国俄亥俄州立大学中国代表处. | <https://oia.osu.edu/global-gateways/china-gateway/about-china-gateway> |
| Oregon Health & Science University | 오리건보건과학대학교 | 俄勒冈健康与科学大学 | OHSU | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/俄勒冈健康与科学大学> |
| The Pennsylvania State University-University Park | 펜실베이니아주립대학교 | 宾夕法尼亚州立大学帕克分校 | 宾州州立 / Penn State | **REFERENCE**. Main campus often just 宾夕法尼亚州立大学; 帕克分校 per eol.cn. | <https://zh.wikipedia.org/zh-cn/宾夕法尼亚州立大学> |
| University of Pittsburgh | 피츠버그대학교 | 匹兹堡大学 | 匹大 / Pitt | **OFFICIAL**.  | <https://www.pitt2you.pitt.edu/cn/about.html> |
| University of Rochester | 로체스터대학교 | 罗切斯特大学 | 罗切斯特 / UR | **OFFICIAL**. The university's own page writes 罗彻斯特大学; wiki title and most mainland usage 罗切斯特大学. Pick one (open question). | <https://www.rochester.edu/policies/discrimination-harassment/%E4%B8%AD%E5%9B%BD%E4%BA%BA-chinese/> |
| University of South Carolina | 사우스캐롤라이나대학교 | 南卡罗来纳大学 | 南卡大学 | **REFERENCE**. Never shorten to USC in Chinese copy. | <https://zh.wikipedia.org/zh-cn/南卡罗来纳大学> |
| University of Connecticut (UConn) | 코네티컷대학교 | 康涅狄格大学 | UConn / 康大 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/康涅狄格大学> |
| University of Massachusetts Amherst | 매사추세츠대학교 애머스트 | 马萨诸塞大学阿默斯特分校 | 麻省大学阿默斯特分校 / UMass | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/马萨诸塞大学阿默斯特分校> |
| University of Massachusetts Boston | 매사추세츠대학교 보스턴 | 马萨诸塞大学波士顿分校 | 麻省大学波士顿分校 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/马萨诸塞大学波士顿分校> |
| University of North Carolina at Chapel Hill | 노스캐롤라이나대학교 채플힐 | 北卡罗来纳大学教堂山分校 | 北卡教堂山 / UNC | **OFFICIAL**. zh-cn wiki title 北卡罗来纳大学查珀尔希尔分校; the school uses 教堂山. | <https://pcc-chinese.unc.edu/> |
| University of Nebraska Medical Center | 네브래스카대학교 메디컬센터 | 内布拉斯加大学医学中心 | UNMC | **UNVERIFIED**. No Chinese source found; literal rendering. | (none found) |
| University of San Francisco | 샌프란시스코대학교 | 旧金山大学 | USF | **OFFICIAL**. Official Chinese site. | <https://china.usfca.edu/> |
| University of Utah | 유타대학교 | 犹他大学 | The U | **OFFICIAL**.  | <https://www.che.utah.edu/our-chinese-community/> |
| University of Tennessee Health Science Center | 테네시대학교 보건과학센터 | 田纳西大学健康科学中心 | UTHSC | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/田纳西大学健康科学中心> |
| University of Tennessee, Knoxville | 테네시대학교 | 田纳西大学诺克斯维尔分校 | 田纳西大学 / UTK | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/田纳西大学诺克斯维尔分校> |
| University of Virginia | 버지니아대학교 | 弗吉尼亚大学 | 弗大 / UVA | **REFERENCE**. 维吉尼亚 is the Taiwan form. | <https://zh.wikipedia.org/zh-cn/弗吉尼亚大学> |
| Villanova University | 빌라노바대학교 | 维拉诺瓦大学 | 维拉诺瓦 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/维拉诺瓦大学> |
| American University | 아메리칸대학교 | 美利坚大学 | AU | **REFERENCE**. Avoid 美国大学 (ambiguous). | <https://zh.wikipedia.org/zh-cn/美利坚大学> |
| University of Arkansas | 아칸소대학교 | 阿肯色大学 | UArk | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/阿肯色大学> |
| Babson College | 뱁슨칼리지 | 百森商学院 | 百森 | **REFERENCE**. Wiki title 巴布森学院 lists 百森商学院, which is the form mainland business schools use (e.g. Tongji SEM). | <https://zh.wikipedia.org/zh-cn/巴布森学院> |
| Baruch College (CUNY) | 버룩칼리지 | 纽约市立大学巴鲁克学院 | 巴鲁克 | **REFERENCE**. zh-cn page title 纽约市立大学柏鲁克分校; 巴鲁克学院 listed as alternate. | <https://zh.wikipedia.org/zh-cn/巴鲁克学院> |
| University at Buffalo (SUNY) | 뉴욕주립대학교 버팔로 | 纽约州立大学布法罗分校 | 布法罗 / 水牛城 / UB | **OFFICIAL**. UB's Chinese fact sheet: 纽约州立大学布法罗(水牛城)分校. | <https://www.buffalo.edu/content/dam/www/internationaladmissions/documents/UB%20Fact%20Sheets/UB%20Fact%20Sheet%20-%20Chinese%20Simplified.pdf> |
| Brigham Young University (BYU) | BYU | 杨百翰大学 | BYU | **OFFICIAL**.  | <http://chineseflagship.byu.edu/cn/flagship/index.php?content=intro> |
| Chapman University | 채프먼대학교 | 查普曼大学 |  | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/查普曼大学> |
| University of Detroit Mercy | 디트로이트머시대학교 | 底特律慈悲大学 | 底特律梅西大学 | **REFERENCE**. Wiki title 底特律慈悲大学, alternate 底特律梅西大学. | <https://zh.wikipedia.org/zh-cn/底特律梅西大学> |
| Fordham University | 포덤대학교 | 福特汉姆大学 | 福特汉姆 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/福特汉姆大学> |
| Lehigh University | 리하이대학교 | 理海大学 | 理海 | **OFFICIAL**. Other forms 利哈伊 / 里海. | <https://www.lehigh.edu/~inis/pdf/admissions/Lehigh-University-Global-Chinese.pdf> |
| Louisiana State University | 루이지애나주립대학교 | 路易斯安那州立大学 | LSU | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/路易斯安那州立大学> |
| University of Maryland, Baltimore | 메릴랜드대학교 볼티모어 | 马里兰大学巴尔的摩分校 | UMB | **REFERENCE**. Not UMBC (马里兰大学巴尔的摩县分校). | <https://zh.wikipedia.org/zh-cn/马里兰大学巴尔的摩分校> |
| University of Miami | 마이애미대학교 | 迈阿密大学 | 迈大 | **REFERENCE**. Disambiguation; Florida school = 迈阿密大学 (佛罗里达州). Not Miami University (Ohio). | <https://zh.wikipedia.org/zh-cn/迈阿密大学> |
| University of Mississippi | 미시시피대학교 | 密西西比大学 | Ole Miss | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/密西西比大学> |
| North Carolina A&T State University | 노스캐롤라이나 A&T 주립대학교 | 北卡罗来纳农工州立大学 | NC A&T | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/北卡罗来纳农工州立大学> |
| University of Oklahoma | 오클라호마대학교 | 俄克拉何马大学 | OU | **REFERENCE**. 俄克拉荷马 is common. | <https://zh.wikipedia.org/zh-cn/俄克拉何马大学> |
| Oklahoma State University | 오클라호마주립대학교 | 俄克拉何马州立大学 | OK State | **REFERENCE**. Avoid OSU (Ohio State / Oregon State). | <https://zh.wikipedia.org/zh-cn/俄克拉何马州立大学> |
| Rutgers University | 럿거스대학교 | 罗格斯大学 | 罗格斯 | **OFFICIAL**. Full name 新泽西州立罗格斯大学. | <https://myrun.newark.rutgers.edu/sites/default/files/rutgers-newarks_-_gsg_one-sheet_-_chinese_0.pdf> |
| Stevens Institute of Technology | 스티븐스공과대학교 | 史蒂文斯理工学院 | 史蒂文斯 | **REFERENCE**. 斯蒂文斯理工学院 also common. | <https://zh.wikipedia.org/zh-cn/史蒂文斯理工学院> |
| Texas Christian University (TCU) | TCU | 得克萨斯克里斯汀大学 | TCU | **OFFICIAL**. TCU's China admissions page. 德克萨斯基督教大学 is common. Copy characters from the page body, not its <title> (look-alike radicals). | <https://admissions.tcu.edu/info-for/china.php> |
| Tulane University | 툴레인대학교 | 杜兰大学 | 杜兰 | **OFFICIAL**.  | <https://admission.tulane.edu/sites/default/files/about_chinese.pdf> |
| William & Mary | 윌리엄앤메리대학교 | 威廉与玛丽学院 | 威廉玛丽 / W&M | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/威廉与玛丽学院> |
| University of Dayton |  | 代顿大学 | UD | **UNVERIFIED**. zh-cn wiki uses 戴顿大学; 代顿 is the usual mainland transliteration of the city (代顿协议). Pick one. | <https://zh.wikipedia.org/zh-cn/戴顿大学> |
| Capella University |  | 凯佩拉大学 | Capella | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/凯佩拉大学> |
| Walden University |  | 瓦尔登大学 | Walden | **UNVERIFIED**. No Chinese source; keep English with gloss. | (none found) |
| Western Governors University |  | 西部州长大学 | WGU | **UNVERIFIED**. No reliable Chinese source; keep English. | (none found) |
| South College |  | South College |  | **UNVERIFIED**. No Chinese name; keep English. | (none found) |
| WorldQuant University |  | WorldQuant University | WQU | **UNVERIFIED**. No Chinese source; keep English (世坤 is WorldQuant's China brand, unverified). | (none found) |
| Tsinghua University |  | 清华大学 | 清华 | **OFFICIAL**.  | <https://www.tsinghua.edu.cn> |
| University of Oxford |  | 牛津大学 | 牛津 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/牛津大学> |
| University College London (UCL) |  | 伦敦大学学院 | UCL | **REFERENCE**. The site's "University of London (UCL)" should become 伦敦大学学院（UCL）. | <https://zh.wikipedia.org/zh-cn/伦敦大学学院> |
| University of London | 런던대학교 | 伦敦大学 |  | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/伦敦大学> |
| Korea University | 고려대학교 | 高丽大学 | 高大 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/高丽大学> |
| Ewha Womans University | 이화여자대학교 / 이화여대 | 梨花女子大学 | 梨大 | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/梨花女子大学> |
| University of Seoul | 서울시립대학교 | 首尔市立大学 |  | **REFERENCE**. Not 首尔大学. | <https://zh.wikipedia.org/zh-cn/首尔市立大学> |
| Kookmin University | 국민대학교 | 韩国国民大学 | 国民大 | **REFERENCE**. Wiki title 国民大学; add 韩国 for clarity. | <https://zh.wikipedia.org/zh-cn/国民大学> |
| Ajou University | 아주대학교 | 韩国亚洲大学 |  | **REFERENCE**. Wiki title 亚洲大学 (韩国); clashes with Taiwan's 亚洲大学, so add 韩国. | <https://zh.wikipedia.org/zh-cn/亚洲大学_(韩国)> |
| Seoul National University (SNU) | SNU | 首尔大学 | SNU | **REFERENCE**.  | <https://zh.wikipedia.org/zh-cn/首尔大学> |

## 3. When to keep English acronyms in Chinese copy

Mainland parents and agencies write most U.S. admissions and visa labels in Latin letters, and they search for them that way. A Chinese page that spells everything out in Chinese reads as machine-translated. The rules below follow what New Oriental, the U.S. Embassy and USCIS Chinese pages actually do.

**Rule 1. Always Latin, no gloss needed.** Parents use these every day:
GPA, SAT, ACT, AP, IB, GRE, GMAT, STEM, MBA, F-1, J-1, H-1B, I-20, OPT, CPT, EB-1, EB-2, EB-3, EB-5, UC, CSU, UCLA, USC, NYU, MIT, UIUC, CEO, CPA.
Optional one-time gloss on beginner pages: OPT（可选实习培训）, AP（大学先修课程）, IB（国际文凭）. For OPT use the USCIS wording 可选实习培训; the Embassy (选择性实习) and zh.wikipedia (选择性实习训练) differ.

**Rule 2. Latin label kept, Chinese gloss on first mention per page, Chinese first.** Pattern: 中文名（ACRONYM）, then the acronym alone.
提前决定（ED）, 提前行动（EA）, 限制性提前行动（REA）, 常规申请（RD）, 国家利益豁免（NIW）, 劳工证（PERM）, 目标就业区（TEA）, 儿童身份保护法（CSPA）, 学生和交流访问者信息系统（SEVIS）, 签证申请费（MRV费用）, 学生援助指数（SAI）, 转学录取保证协议（TAG）, 美国公民与移民服务局（USCIS）, 美国移民律师协会（AILA）, 美国国家签证中心（NVC）, 指定学校官员（DSO）, 社区大学（CC）.

**Rule 3. Latin name first, Chinese gloss once.** Use this where the Latin name is the thing families must type or recognize (a website, a form, a system):
Common App（通用申请系统）, CSS Profile（大学奖学金服务档案）, FAFSA（联邦学生援助免费申请）, ASSIST.org, UC TAP, IGETC, Cal-GETC, A-G科目要求, PIQ, SIR, DS-160申请表, E-Verify, Cap-Gap, Schedule A（附表A）, VisaScreen, CCFC.

**Rule 4. Translate; do not use the Latin form in running text.**
TOEFL 托福, IELTS 雅思 (add the Latin once if helpful), green card 绿卡, waitlist 候补名单, admit rate 录取率, essays 文书, recommendation letter 推荐信, extracurriculars 课外活动 (mainland copy rarely says EC), honors 荣誉课程, financial aid 学生资助, award letter 资助通知书, priority date 优先日期, Visa Bulletin 签证公告 (Latin once), community college 社区大学, liberal arts college 文理学院.

**Rule 5. Forms.** Keep the form number exactly (hyphen included) and add 表 when the form itself is meant: I-20表, I-140表, I-485表, I-829表, I-765表, I-983培训计划表, DS-160申请表. Never translate the number.

**Rule 6. Universities.** First mention: full Chinese name, then the English or acronym in parentheses if families know it by that, e.g. 加州大学圣地亚哥分校（UCSD）, 伊利诺伊大学厄巴纳-香槟分校（UIUC）. After that the short form is fine (UCSD, 伯克利, 哥大). Keep official English names of schools inside a university when there is no settled Chinese form (Questrom, Gies, Kogod): 波士顿大学 Questrom 商学院. Translate generic unit names: School of Nursing 护理学院, College of Business 商学院, Graduate School of Management 管理研究生院, School of Law 法学院. Translate majors into Chinese and keep the English program name in parentheses only when it is a proper name (Data Science 数据科学).

**Rule 7. Disambiguate.** Write 美国西北大学 and 美国东北大学 (China has universities with the same names), 华盛顿大学（西雅图）, 迈阿密大学（佛罗里达）. Never shorten University of South Carolina to USC (families read USC as 南加州大学). Avoid ISU, OSU, USF and UD in Chinese copy because each is ambiguous.

**Rule 8. Agencies and programs.** 美国公民与移民服务局（USCIS） (USCIS's current Chinese pages use 与; the Embassy and an older USCIS PDF use 及), 美国国务院, 美国劳工部（DOL）, 美国国土安全部（DHS）, EducationUSA美国留学咨询中心 (Embassy name). College Board is usually written 美国大学理事会（College Board） (UNVERIFIED, not checked against a College Board Chinese page).

**Rule 9. Typography.** Use full-width Chinese punctuation （）、，：；。“” around and between Chinese text, including around acronyms. Do not add spaces between Chinese characters and Latin letters or digits (F-1签证, DS-160申请表, 350美元); the Embassy pages do this, and USCIS pages are inconsistent. Money: 54,848美元 (or US$54,848 in tables). Dates: 2026年9月; Fall 2027 = 2027年秋季入学. Ages: 未满21周岁.

**Rule 10. Brand and keep-list terms.** Everything on the glossary keep list stays in Latin letters (OneVision, All-Care, Future Scholars, Application Atelier, Transfer Intensive, Academic Coaching & Study Lab, KL Legal Services, JTC). A short Chinese gloss may follow on first mention where the meaning is not obvious, e.g. Transfer Intensive（转学强化项目）. Glosses for brand names need client sign-off (see open questions).

## 4. Open questions

1. **社区大学 or 社区学院?** The brief asks for 社区大学, which New Oriental and most agencies use. The U.S. Embassy, zh.wikipedia and the CCC system article use 社区学院. Both are understood. This file uses 社区大学 per the brief; confirm and apply one form everywhere.
2. **House style vs Chinese punctuation.** The OneVision style rule bans middle dots and em dashes. Standard Chinese (GB/T 15834) uses the 间隔号 (a middle dot) inside transliterated names (约翰斯·霍普金斯大学, 哈维·穆德学院) and the 一字线 (a long dash) for ranges. Options: (a) exempt the zh site from that rule for these two marks; (b) drop the dot where a university does so itself (George Washington writes 乔治华盛顿大学) and write 约翰斯霍普金斯大学, 哈维穆德学院, which mainland readers accept but which is non-standard; (c) use 至 for ranges. Needs a decision.
3. **Place-name spellings.** zh.wikipedia, Xinhua place names and family usage disagree for several schools. Pick one per row and apply site-wide: Irvine 尔湾 or 欧文 (this file: 尔湾); Santa Barbara 圣塔芭芭拉 or 圣巴巴拉 (圣塔芭芭拉); San Diego 圣地亚哥 or 圣迭戈 (圣地亚哥); Santa Cruz 圣克鲁兹 or 圣克鲁斯 (圣克鲁兹); Riverside 河滨 or 里弗赛德 (河滨); Texas 得克萨斯 or 德克萨斯/德州 (得克萨斯 in full names, 德州 in short forms); Iowa 爱荷华 or 艾奥瓦 (爱荷华, the university's own); Alabama 阿拉巴马 or 亚拉巴马 (阿拉巴马); Rochester 罗切斯特 or 罗彻斯特 (罗切斯特; the university's own page uses 罗彻斯特); Dayton 代顿 or 戴顿; Kelley 凯利 or 凯莱; Clemson 克莱姆森 or 克莱门森.
4. **I-485 is mislabeled on the KO/EN site.** immigration.html says 신분 변경(I-485) / "change of status (I-485)". I-485 is adjustment of status (USCIS Chinese: 调整身份); change of status (身份变更) is a different, nonimmigrant process. The zh page should say 调整身份（I-485）. Suggest fixing Korean (신분 조정) and English (adjustment of status) at the same time.
5. **E-2 does not apply to PRC nationals.** China is not an E-2 treaty country, so mainland families can use E-2 only through another nationality. The CRITERIA rule "same facts, same offer" means the zh page cannot simply translate the Korean E-2 paragraph (or the UC residency line that mentions E-2 holders) without a note. Confirm against the State Department treaty-country list and decide how to word it.
6. **Who is the zh audience?** If it is families in mainland China, KakaoTalk (disrupted in China since 2014, per Citizen Lab), Naver Cafe and Naver Blog (not reachable from the mainland since 2018, per zh.wikipedia) and Instagram are poor contact channels. A WeChat ID or email may be needed for the zh CTA. If the audience is Chinese-speaking families in the U.S., this matters less.
7. **Korean people's names on zh pages.** The names rule keeps Korean-only names in Hangul on the English site. Chinese readers cannot read Hangul. Options: romanization as on the English site (Jay Choi, Donghyun Kim), Hangul, or the person's own hanja name if they provide one. Needs a decision per person.
8. **Hangul organization names on the keep list** (미국한인유학생협회, 미한유회, 엘코리아에듀그룹, 이피유, EZ이민, KLLAW이민법). Chinese readers cannot read them. Candidate glosses, all unverified: 美国韩人留学生协会, EZ移民. Ask the organizations for an official Chinese or English name, or keep the Hangul with a Chinese description.
9. **Brand glosses.** All-Care 全程服务, Academic Coaching 学业辅导, Transfer Intensive 转学强化项目 are proposals only. Confirm with the client whether brand names get any Chinese gloss.
10. **"U.S. Legal Document Assistant" (미국 법무사).** No Chinese source. Proposed: 加州法律文书助理（Legal Document Assistant），非律师. It must not read as 律师 or 法务, and Korean 법무사 (a licensed profession in Korea) should not be rendered as 司法书士. Needs Jay's sign-off; the English title is itself still unconfirmed per project notes.
11. **CSAT and 내신.** This file explains 수능 as 韩国大学修学能力考试（修能，韩国高考） and renders 내신 as 在校成绩 (GPA). Confirm that localizing rather than transliterating is wanted.
12. **MGH Institute of Health Professions was renamed** Mass General Brigham University of Health Professions effective 2026-09-01 (mgbu.edu). `scripts/lib/university-list.json` still uses the old name. No Chinese name exists for either; keep English.
13. **Bio inconsistency.** One bio says "University of London (UCL), master's degree" (Korean: 런던대학교). UCL is University College London (伦敦大学学院), a member of the University of London (伦敦大学). Check which the tutor means before translating.
14. **Schools with no Chinese name.** University of Nebraska Medical Center, Walden University, Western Governors University, South College, WorldQuant University, and the smaller institutions in bios (Atlanta College of Liberal Arts & Sciences, Melvin University, Korean Institute of Southern California) have no reliable Chinese form. Recommend keeping English.
15. **UCOP.** 加州大学校长办公室 appears only in a zh.wikipedia image caption. 加州大学总校长办公室 is clearer. UNVERIFIED either way.
16. **Second research pass.** The search budget ran out. Worth a follow-up pass, ideally checking mainland agency usage and any UC or CSAC Chinese PDFs, for: UC TAP, SIR, PIQ, IGETC, Cal-GETC, A-G, ASSIST.org, ADT, test-free, yield, deferral, CADAA, Cal Grant, EFC, aid appeal, CGS April 15 Resolution, I-526E, CSPA, AILA, I-983, CIP code, cap-gap, cap-exempt, wage-weighted selection, wage levels, E-Verify, dates for filing, final action date.

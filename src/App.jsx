import { useState } from "react";

const C = {
  eu: "#C9A84C",
  WEEE: "#4A90D9",
  Packaging: "#3DAA6E",
  Battery: "#E07B39",
  DE: "#6C8EBF",
  FR: "#7B68EE",
  ES: "#D4A017",
  UK: "#9E7BB5",
  bg: "#080D18",
  panel: "#0D1524",
  card: "#0B1120",
  border: "#1E293B",
  text: "#CBD5E1",
  dim: "#475569",
  bright: "#F1F5F9",
};

const TBADGE = {
  Regulation:      { bg:"#7C3AED", text:"#EDE9FE", label:"法规（直接适用）" },
  Regulation_draft:{ bg:"#6B7280", text:"#F3F4F6", label:"法规（草案）" },
  Directive:       { bg:"#1D4ED8", text:"#DBEAFE", label:"指令" },
  Directive_amend: { bg:"#2563EB", text:"#DBEAFE", label:"指令（修订）" },
  Directive_old:   { bg:"#374151", text:"#9CA3AF", label:"指令（旧/废止）" },
  Law:             { bg:"#B45309", text:"#FEF3C7", label:"上位法" },
  Decree:          { bg:"#065F46", text:"#D1FAE5", label:"法令" },
  Order:           { bg:"#1E3A5F", text:"#BFDBFE", label:"部长令" },
  Code:            { bg:"#1F2937", text:"#E5E7EB", label:"法典条文" },
  SI:              { bg:"#4A1D96", text:"#EDE9FE", label:"SI法规" },
  SI_amend:        { bg:"#5B21B6", text:"#EDE9FE", label:"SI修订" },
};

const DOMAIN_CN = { WEEE:"WEEE", Packaging:"包装", Battery:"电池" };
const DOMAINS = ["WEEE","Packaging","Battery"];
const FAMILY_COLOR = {
  "eu-w1":   "#3B82F6",
  "eu-p1":   "#A855F7",
  "eu-p2":   "#10B981",
  "eu-b1":   "#F97316",
};

const FAMILY_NAME = {
  "eu-wfd1": "WFD 2008/98",
  "eu-w1":   "WEEE 2012/19",
  "eu-p1":   "包装 94/62",
  "eu-p2":   "PPWR 2025/40",
  "eu-b1":   "电池 2023/1542",
};

const EU_LABEL = {
  "eu-w1": "Directive 2012/19/EU",
  "eu-p1": "Directive 94/62/EC",
  "eu-p2": "Regulation 2025/40 (PPWR)",
  "eu-b1": "Regulation 2023/1542",
  "eu-wfd1": "Directive 2008/98/CE (WFD)",
};

const COUNTRIES = [
  { key:"DE", flag:"🇩🇪", name:"德国" },
  { key:"FR", flag:"🇫🇷", name:"法国" },
  { key:"ES", flag:"🇪🇸", name:"西班牙" },
  { key:"UK", flag:"🇬🇧", name:"英国" },
];

const EU = {
  WFD:[
    { id:"eu-wfd1", type:"Directive",
      code:"Directive 2008/98/CE",
      date:"2008年11月19日；OJ L 312, 22.11.2008",
      title:"废弃物框架指令",
      summary:"所有EPR制度的共同法律母体。",
      desc:"WEEE、包装、电池三类制度均在此框架下运作，各领域专项指令/法规均援引本指令作为上位授权。\n\n确立废弃物层级（减量→重复使用→回收→能源回收→处置）、生产者责任延伸（EPR）原则、废弃物定义及终止废弃物状态标准。",
      source:"EUR-Lex: OJ L 312, 22.11.2008",
      url:"https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32008L0098" },
  ],
  WEEE:[
    { id:"eu-w1", type:"Directive",
      code:"Directive 2012/19/EU",
      date:"2012年7月4日；OJ L 197, 24.7.2012",
      title:"WEEE主指令",
      summary:"专门针对废弃电子电器的顶层指令。",
      desc:"确立WEEE定义、生产者义务、6大产品类别（Annexe III）、回收目标。\n\n2024/884定向修订，废除了原指令中违法的「溯及既往」条款，明确企业无需为特定生效日期（光伏板为2012年8月13日，开放范围产品为2018年8月15日）之前投放市场的历史遗留产品承担任何废弃物回收费用。",
      source:"EUR-Lex: OJ L 197, 24.7.2012, p.38",
      url:"https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32012L0019" },
  ],
  Packaging:[
    { id:"eu-p0", type:"Directive",
      code:"Directive 2019/904/UE",
      date:"2019年6月5日；OJ L 155, 12.6.2019",
      title:"一次性塑料指令（SUP）",
      desc:"禁止或限制10类特定一次性塑料产品上市（含餐饮包装、杯盖、吸管等），并对某些产品设定标注义务和生产者回收责任。直接影响包装EPR申报范围界定。法国通过AGEC及后续法令落实。",
      source:"EUR-Lex: OJ L 155, 12.6.2019",
      url:"https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0904" },
    { id:"eu-p1", type:"Directive_old",
      code:"Directive 94/62/EC",
      date:"1994年12月19日；OJ L 365, 31.12.1994",
      title:"包装与包装废弃物指令（旧，过渡期部分有效）",
      desc:"界定包装定义（初级/二级/三级），确立生产者回收义务。已被PPWR（2025/40）逐步取代，过渡期内部分条款仍有效。",
      source:"EUR-Lex: OJ L 365, 31.12.1994",
      url:"https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:31994L0062" },
    { id:"eu-p2", type:"Regulation",
      code:"Regulation (EU) 2025/40",
      date:"2024年12月19日通过；2025年2月11日生效；2026年8月12日强制适用",
      title:"PPWR 包装与包装废弃物法规（直接适用）",
      desc:"将指令升格为直接适用的EU法规，无需国内转化。引入最低再生材料含量要求、包装最小化、可重复使用目标、统一EPR申报口径。多项delegated acts陆续发布中。",
      source:"EUR-Lex: OJ L 2025/40, 22.1.2025",
      url:"https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R0040" },
  ],
  Battery:[
    { id:"eu-b1", type:"Regulation",
      code:"Regulation (EU) 2023/1542",
      date:"2023年7月28日通过；2023年8月17日生效",
      title:"EU电池法规（取代Directive 2006/66/EC）",
      desc:"直接适用于所有成员国。5大电池类别（新增LMT）。关键节点：碳足迹声明2025年2月18日（工业/EV）；QR码2026年8月18日；电池护照2027年2月18日；回收材料含量2030年起。",
      source:"EUR-Lex: OJ L 191, 28.7.2023",
      url:"https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1542" },
    { id:"eu-b2", type:"Regulation",
      code:"Règlement n°493/2012",
      date:"2012年6月11日",
      title:"电池回收率计算方法法规",
      desc:"规定电池回收工序效率的计算方法及核查机制，适用于所有eco-organisme回收目标的绩效计量。仍在EU 2023/1542框架下适用，作为技术性附属法规。",
      source:"EUR-Lex: OJ L 151, 12.6.2012",
      url:"https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32012R0493" },
    { id:"eu-b3", type:"Regulation",
      code:"Règlement n°1103/2010",
      date:"2010年11月29日",
      title:"电池标识标注法规",
      desc:"规定电池容量标注要求及汞/镉/铅含量化学符号标注格式，适用于便携电池和车用电池。在EU 2023/1542实施期间仍作为技术性标注依据适用。",
      source:"EUR-Lex: OJ L 313, 30.11.2010",
      url:"https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32010R1103" },
  ],
};

const NATIONAL = {
  DE:{ name:"德国", flag:"🇩🇪",
    WEEE:[{ id:"de-w1", type:"Law",
      code:"ElektroG（ElektroG4，2026年1月1日起现行）",
      transposesId:"eu-w1",
      date:"基础版BGBl. I S.1739（2015）；ElektroG4自2026年1月1日起",
      title:"电气电子设备法",
      desc:"德国WEEE主法。ElektroG3（2021，BGBl. I S.2523）引入平台/物流商义务§9a、§9b；2022年12月修订（BGBl. I S.2240）；ElektroG4自2026年1月1日起为现行版本。",
      source:"Umweltbundesamt官网；elektrogesetz.de",
      authority:"UBA（主管）；stiftung ear（受托执行）",
      keyArticles:"生产者定义§3；注册§6；平台/物流商§9a、§9b；处罚§45",
      guidance:[
        {label:"stiftung ear FAQ及注册指引", url:"https://www.stiftung-ear.de"},
        {label:"UBA执法说明", url:"https://www.umweltbundesamt.de/themen/abfall-ressourcen/elektroaltgeraete"},
      ],
      url:"https://www.elektrogesetz.de" }],
    Packaging:[{ id:"de-p1", type:"Law",
      code:"VerpackG + VerpackG2；VerpackDG草案（2025年底）",
      transposesId:"eu-p2",
      date:"2019年1月1日起生效；2021年修订；VerpackDG草案2025年底启动征询",
      title:"包装法（Verpackungsgesetz）",
      desc:"规定包装系统参与义务、LUCID注册等。PPWR导入将触发新VerpackDG（Verpackungs-Durchführungsgesetz），联邦环境部草案已于2025年底启动征询。",
      source:"ZSVR官网；Gleiss Lutz律所分析",
      authority:"ZSVR（Zentrale Stelle Verpackungsregister）",
      keyArticles:"运输包装§3(1)Nr.3；系统参与§3(8)；自行回收§15；LUCID注册§9",
      guidance:[
        {label:"ZSVR: Katalog systembeteiligungspflichtiger Verpackungen", url:"https://www.verpackungsregister.org"},
      ],
      url:"https://www.verpackungsregister.org" }],
    Battery:[{ id:"de-b1", type:"Law",
      code:"BattG（2009）→ 新BattDG（立法进行中）",
      transposesId:"eu-b1",
      date:"BattG 2009年；新BattDG适配EU 2023/1542，立法进行中",
      title:"电池法（BattG）及新BattDG",
      desc:"现行BattG 2009年制定。随EU Regulation 2023/1542生效，德国正制定新BattDG（Batteriedurchführungsgesetz）。建议持续关注UBA官网进展。",
      source:"UBA官网",
      authority:"UBA；stiftung ear（电池注册）",
      keyArticles:"待BattDG正式发布后更新",
      url:"https://www.umweltbundesamt.de" }],
  },
  FR:{ name:"法国", flag:"🇫🇷",
    AGEC:[
      { id:"fr-agec", type:"Law",
        code:"Loi n°2020-105 du 10 février 2020",
        date:"2020年2月10日通过；JO du 11 février 2020",
        title:"AGEC 反浪费与循环经济法",
        summary:"重塑法国各项EPR延伸责任体系、并确立产品生态设计红线的核心国内立法。",
        desc:"扩展「生产者」法定定义并确立电商平台连带责任；自2022年起将工业与商业包装（B2B）强制纳入EPR体系；针对特定电子设备推行「维修度指数」；全面升级电池等实物标识与可追溯性标准；并依法实施单一用途塑料的阶段性限制禁令。",
        source:"Légifrance: JORFTEXT000041553759",
        url:"https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000041553759" },
    ],
    WEEE:[
      { id:"fr-w1", type:"Code",
        code:"Code env. L.541-10 + R.543-172 et s.",
        transposesId:"eu-w1",
        date:"持续更新（Légifrance）",
        title:"环境法典：WEEE上位条款",
        desc:"法国WEEE制度的法典基础。具体义务由Décret及Arrêtés落实。ménager vs professionnel区分R.543-172 et s.；分销商回收义务R.543-180。",
        source:"Légifrance官网",
        authority:"ADEME；Ecosystem、Ecologic（授权eco-organismes）",
        keyArticles:"L.541-10；R.543-172；R.543-180；R.543-187",
        url:"https://www.legifrance.gouv.fr" },
      { id:"fr-w2", type:"Decree",
        code:"Décret n°2014-928 du 19 août 2014",
        transposesId:"eu-w1",
        date:"JO du 22 août 2014；配套五项Arrêtés du 8 oct. 2014",
        title:"WEEE转化法令（主法令）",
        desc:"明确转化Directive 2012/19/UE，规定产品分类、申报程序、eco-organisme要求。配套五项Arrêtés（JO du 15 oct. 2014），涵盖分销商回收义务等。",
        source:"Légifrance；ecologic-france.com确认",
        authority:"ADEME；Ecosystem；Ecologic",
        keyArticles:"R.543-172（生产者）；R.543-180（分销商）；R.543-187（申报）",
        guidance:[
        {label:"Ecologic FAQ及操作指引", url:"https://www.ecologic-france.com"},
        {label:"ADEME官方guidance", url:"https://www.ademe.fr"},
      ],
      url:"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000029412210" },
      { id:"fr-w3", type:"Order",
        code:"Arrêtés du 8 octobre 2014（五项）",
        date:"JO du 15 octobre 2014",
        title:"WEEE配套部长令（五项）",
        desc:"与Décret n°2014-928配套发布的五项Arrêtés，细化分销商回收义务（R.543-180）、eco-organisme认可条件、财务担保要求、申报格式及数据核查程序。是日常操作合规的直接依据。",
        source:"ecologic-france.com；Légifrance配套文件",
        authority:"ADEME；Ecologic；Ecosystem",
        keyArticles:"R.543-180（分销商回收义务）；eco-organisme认可条件；申报格式",
        url:"https://www.legifrance.gouv.fr" },
      { id:"fr-w4", type:"Order",
        code:"Arrêté du 27 octobre 2021",
        date:"2021年10月27日",
        title:"WEEE现行合规章程（Cahier des charges）",
        desc:"规定eco-organisme（Ecologic、Ecosystem、SOREN等）运营资质、年度目标、收费结构及合规报告要求的操作章程，是申请DEEE合规注册的直接依据。eco-organisme的最新agrément（2022年3月4日）均基于此章程发出。",
        source:"Légifrance；ADEME WEEE filière页面",
        authority:"ADEME；eco-organismes（Ecologic、Ecosystem、SOREN）",
        keyArticles:"eco-organisme资质要求；年度回收目标；合规报告格式",
        guidance:[
          {label:"ADEME WEEE filière页面", url:"https://filieres-rep.ademe.fr/dechets-dequipements-electriques-et-electroniques"},
        ],
        url:"https://www.legifrance.gouv.fr" },
      { id:"fr-w5", type:"Order",
        code:"Arrêté du 12 décembre 2022",
        date:"2022年12月12日",
        title:"DEEE数据申报令",
        desc:"规定生产者向eco-organisme及ADEME申报数据的格式、字段、频率和核查要求。包装和电池的同名申报令（同日发布）适用相同框架。",
        source:"Légifrance；ADEME WEEE filière页面",
        authority:"ADEME",
        keyArticles:"申报字段；申报频率；数据核查程序",
        url:"https://www.legifrance.gouv.fr" },
    ],
    Packaging:[{ id:"fr-p1", type:"Code",
      code:"Code env. L.541-10-1 + R.543-43 à R.543-65 + Décret n°2022-507",
      transposesId:"eu-p1",
      date:"持续更新；工商业包装2026年7月起适用CITEO Pro",
      title:"环境法典：包装条款 + Triman标识法令",
      desc:"家庭包装EPR法典基础。Décret n°2022-507规定Triman标识强制要求（绿点标识不可替代Triman）。工商业包装REP专项法令另行规定；2026年7月起适用CITEO Pro。",
      source:"Légifrance官网；CITEO官方资料",
      authority:"ADEME；CITEO（家庭包装）；CITEO Pro（工商包装，2026年7月起）",
      keyArticles:"L.541-10-1（REP filière列表）；L541-1 1°/5°（废弃物管理目标）；R.543-42至R.543-56（家庭包装废弃物）；R.543-73（数据申报）；R543-207至R543-213-1（图形纸）；R543-350至R543-355（包装与图形纸共同条款）",
      guidance:[
        {label:"CITEO申报指南", url:"https://www.citeo.fr"},
        {label:"ADEME方法论文件", url:"https://www.ademe.fr"},
      ],
      url:"https://www.legifrance.gouv.fr" },
      { id:"fr-p2", type:"Law",
        code:"Loi n°2023-305 du 24 avril 2023",
        date:"JO du 25 avril 2023；2024年1月1日起生效",
        title:"包装与图形纸合并法",
        desc:"将家庭包装REP与图形纸REP合并为单一filiere，自2024年1月1日起统一在CITEO申报。影响：原来单独注册图形纸（说明书、宣传册、目录册等）的生产者，现须纳入包装EPR统一口径。Décret n°2023-906为配套执行令。",
        source:"Légifrance；Pincvision分析",
        authority:"ADEME；CITEO（合并后统一管理）",
        keyArticles:"包装与图形纸合并；申报口径统一；2024年1月1日生效",
        guidance:[{label:"CITEO合并说明", url:"https://www.citeo.com/en/why-join-citeo/"}],
        url:"https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047508094" },
      { id:"fr-p3", type:"Decree",
        code:"Décret n°2023-906 du 28 septembre 2023",
        date:"JO du 29 septembre 2023",
        title:"包装与图形纸合并执行法令",
        desc:"Loi n°2023-305的配套执行法令，规定合并后申报格式、过渡安排及CITEO统一管理要求。",
        source:"Légifrance",
        authority:"ADEME；CITEO",
        keyArticles:"合并后申报格式；过渡安排；CITEO统一管理",
        url:"https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048137359" },
      { id:"fr-p4", type:"Order",
        code:"Arrêté du 7 décembre 2023",
        date:"2023年12月7日",
        title:"包装现行合规章程（Cahier des charges）",
        desc:"规定CITEO作为eco-organisme的运营资质、年度回收目标、eco-modulation（奖惩）规则及合规报告要求，是申请包装EPR注册的直接操作依据。含包装与图形纸合并后的新目标体系。",
        source:"Légifrance；ADEME包装filière页面",
        authority:"ADEME；CITEO",
        keyArticles:"eco-organisme资质；年度回收目标；eco-modulation规则；报告格式",
        guidance:[
          {label:"ADEME包装filière页面", url:"https://filieres-rep.ademe.fr/emballages-menagers-et-papiers-graphiques"},
          {label:"CITEO官网", url:"https://www.citeo.com"},
        ],
        url:"https://www.legifrance.gouv.fr" },
      { id:"fr-p5", type:"Order",
        code:"Arrêté du 20 juillet 2023",
        date:"2023年7月20日",
        title:"餐饮包装EPR专项令（Food Service Packaging）",
        desc:"确立餐饮服务包装的EPR适用范围，规定小格式/大格式食品包装的界定阈值。自2024年1月1日起，小格式食品包装无论终端消费者是否为家庭，均纳入家庭包装EPR。对B2B食品包装生产者影响重大。",
        source:"Légifrance: JORFTEXT000047873374；CITEO官网说明",
        authority:"ADEME；CITEO Pro",
        keyArticles:"小格式/大格式食品包装阈值（见附件）；2024年1月1日起适用",
        guidance:[{label:"CITEO FSP说明", url:"https://www.citeo.com/en/why-join-citeo/"}],
        url:"https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047873374" },
      { id:"fr-p6", type:"Order",
        code:"Arrêté du 12 décembre 2022",
        date:"2022年12月12日",
        title:"包装数据申报令",
        desc:"规定生产者向CITEO申报包装数据的格式、字段和频率。与DEEE和电池的同名申报令（同日发布）适用统一框架。",
        source:"Légifrance；ADEME包装filière页面",
        authority:"ADEME；CITEO",
        keyArticles:"申报字段；申报频率；数据核查",
        url:"https://www.legifrance.gouv.fr" }],
    Battery:[
      { id:"fr-b1", type:"Code",
        code:"Code env. L.541-10-1 6° + R.543-124 à R.543-129",
        date:"R.543-124至R.543-129经Décret n°2024-1221于2025年8月18日全面改写",
        title:"环境法典：电池REP条款（现行版本）",
        desc:"法国电池EPR制度的法典基础。原R.543-126至R.543-171条款已被2024-1221法令全面改写为R.543-124至R.543-129，覆盖所有新电池类别（便携、LMT、SLI、工业、EV）。L.541-10-1 6°为REP制度的立法创设条款。",
        source:"Légifrance",
        authority:"ADEME；Ecosystem（全类别）；Batribox（便携）；Recycler mon véhicule（EV）",
        keyArticles:"L.541-10-1 6°（REP立法创设）；R.543-124（生产者定义）；R.543-128（废旧电池管理义务）；R.543-129（处罚条款）",
        url:"https://www.legifrance.gouv.fr" },
      { id:"fr-b2", type:"Decree",
        code:"Décret n°2009-1139 du 22 septembre 2009",
        date:"JO du 24 septembre 2009；部分条款已被2024-1221取代",
        title:"电池REP创设法令（旧基础框架）",
        desc:"法国电池REP制度的创设法令，转化原Directive 2006/66/CE。核心条款已被Décret n°2024-1221全面更新，但作为制度历史沿革仍有参考价值。建议以新框架（2024-1221）为准。",
        source:"Légifrance；ADEME电池filière页面",
        authority:"Corepile（历史）；Screlec/Batribox（历史）",
        keyArticles:"生产者义务；注册要求；回收目标（已更新）",
        url:"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000021162303" },
      { id:"fr-b3", type:"Decree",
        code:"Décret n°2015-849 du 10 juillet 2015",
        date:"JO du 12 juillet 2015",
        title:"电池上市及废旧电池收集处理法令",
        desc:"对2009年基础框架的中期更新，细化电池上市要求及废旧电池收集与处理义务，填补2009年至2024年新框架之间的制度空白。",
        source:"Légifrance；ADEME电池filière页面",
        authority:"ADEME；Corepile；Screlec",
        keyArticles:"电池上市要求；收集义务；处理标准",
        url:"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000030876360" },
      { id:"fr-b4", type:"Law",
        code:"Loi n°2024-364 du 22 avril 2024",
        date:"JO du 23 avril 2024；Art.15电池条款",
        title:"EU适配法（电池REP新框架上位授权）",
        desc:"多领域EU法适配法，Art.15专门为电池EPR新框架提供国内法律授权：扩展生产者定义（含再制造电池运营商），授权政府发布实施法令（即2024-1221）。是整个新框架的立法母体。",
        source:"Légifrance；vie-publique.fr",
        authority:"法国议会立法；由政府通过Décret落实",
        keyArticles:"Art.15（生产者定义扩展；再制造电池运营商纳入REP）",
        url:"https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049441277" },
      { id:"fr-b5", type:"Decree",
        code:"Décret n°2024-1221 du 27 décembre 2024",
        transposesId:"eu-b1",
        date:"JO du 29 décembre 2024；主体条款2025年8月18日生效；R.543-128自2026年1月1日起",
        title:"电池REP核心实施法令（新框架主法令）",
        desc:"将EU Regulation 2023/1542 Chapter VIII转化为法国国内法的核心法令。全面改写Code de l environnement R.543-124至R.543-129：扩大REP范围至所有电池类别（含LMT、工业、EV）；重新定义生产者（含再制造/再利用运营商）；规定eco-organisme新agrément程序；设定违规处罚条款（R.543-129）。",
        source:"Légifrance: JORFTEXT000050854881；earthlaw.network分析",
        authority:"ADEME；Ecosystem；Batribox；Recycler mon véhicule",
        keyArticles:"R.543-124（生产者定义）；R.543-128（废旧电池管理合同义务，2026年1月起）；R.543-129（处罚）",
        guidance:[
          {label:"Décret原文 Légifrance", url:"https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050854881"},
          {label:"earthlaw分析", url:"https://earthlaw.network/fr/rep-batteries-la-reglementation-francaise-sadapte-au-droit-europeen/"},
        ],
        url:"https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050854881" },
      { id:"fr-b6", type:"Order",
        code:"Arrêté du 27 mars 2025",
        date:"2025年3月27日；2025年8月18日与新REP同步生效",
        title:"电池eco-organisme新合规章程（Cahier des charges）",
        desc:"规定Ecosystem（全类别）、Batribox（便携）、Recycler mon véhicule（EV）三家eco-organisme的运营资质、年度收集目标、eco-modulation规则（含再制造/碳足迹/可维修性奖惩）及报告要求。是注册合规操作的直接依据，有效期至2030年12月31日。",
        source:"Légifrance: JORFTEXT000051454603；recy.net分析",
        authority:"Ecosystem（全类别agrément至2030年）；Batribox（便携agrément至2030年）；Recycler mon véhicule（EV agrément至2030年）",
        keyArticles:"年度收集目标；eco-modulation规则；报告格式；有效期至2030年12月31日",
        guidance:[
          {label:"Arrêté原文 Légifrance", url:"https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000051454603"},
          {label:"ADEME电池filière页面", url:"https://filieres-rep.ademe.fr/piles-et-accumulateurs"},
        ],
        url:"https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000051454603" },
      { id:"fr-b7", type:"Order",
        code:"Arrêté du 12 décembre 2022",
        date:"2022年12月12日",
        title:"电池数据申报令",
        desc:"规定生产者向eco-organisme申报电池数据的格式、字段和频率。与DEEE和包装的同名申报令（同日发布）适用统一框架。",
        source:"Légifrance；ADEME电池filière页面",
        authority:"ADEME",
        keyArticles:"申报字段；申报频率；数据核查",
        url:"https://www.legifrance.gouv.fr" },
    ],
  },
  ES:{ name:"西班牙", flag:"🇪🇸",
    WEEE:[
      { id:"es-w1", type:"Decree",
        code:"Real Decreto 110/2015 + RD 27/2021",
        transposesId:"eu-w1",
        date:"BOE núm.45, 21/02/2015（BOE-A-2015-1762）；RD 27/2021修订",
        title:"WEEE皇家法令（主法令）",
        desc:"RD 110/2015转化Directive 2012/19/UE；RD 27/2021（BOE-A-2021-796）修订以转化EU 2018/849。上位法：Ley 7/2022。",
        source:"BOE官网；Recyclia官网",
        authority:"MITECO（环境部）；Registro Integrado Industrial（RII-AEE）",
        keyArticles:"生产者定义Art.3；注册Art.8；回收目标Art.29；处罚Ley 7/2022 Titulo VII",
        guidance:[
        {label:"MITECO官方FAQ（v5，2022年9月版）", url:"https://www.miteco.gob.es"},
        {label:"MITECO操作说明", url:"https://www.miteco.gob.es"},
      ],
      url:"https://www.boe.es/eli/es/rd/2015/02/20/110" },
      { id:"es-w2", type:"Law",
        code:"Ley 7/2022, de 8 de abril",
        date:"2022年4月8日",
        title:"废弃物与循环经济法（上位法）",
        desc:"西班牙循环经济领域上位立法，WEEE、包装、电池EPR制度均受约束，处罚条款位于Titulo VII。",
        source:"BOE官网",
        authority:"MITECO",
        keyArticles:"处罚Titulo VII；EPR通用原则",
        url:"https://www.boe.es/eli/es/l/2022/04/08/7" },
    ],
    Packaging:[{ id:"es-p1", type:"Decree",
      code:"Real Decreto 1055/2022, de 27 de diciembre",
      transposesId:"eu-p1",
      date:"2022年12月27日；2025年起工商业包装统一申报",
      title:"包装皇家法令",
      desc:"西班牙包装EPR核心执行法令，上位法为Ley 7/2022。2025年起工商业包装统一申报。",
      source:"BOE；Ecoembes官网",
      authority:"MITECO；Ecoembes（家庭包装）",
      keyArticles:"包装定义；生产者义务；申报要求",
      url:"https://www.boe.es/eli/es/rd/2022/12/27/1055" }],
    Battery:[{ id:"es-b1", type:"Decree",
      code:"Real Decreto 106/2008（修订中）",
      transposesId:"eu-b1",
      date:"2008年2月1日；正在修订以适配EU 2023/1542",
      title:"电池皇家法令",
      desc:"现行西班牙电池EPR法令，正在修订以适配EU Regulation 2023/1542。Ley 7/2022中也有电池相关条款。建议关注BOE及MITECO最新动态。",
      source:"BOE；RD 27/2021",
      authority:"ECOLEC；Pilas 2000",
      keyArticles:"生产者义务；回收目标；注册要求",
      url:"https://www.boe.es/eli/es/rd/2008/02/01/106" }],
  },
  UK:{ name:"英国", flag:"🇬🇧",
    WEEE:[{ id:"uk-w1", type:"SI",
      code:"SI 2013/3113（含历次修订至SI 2025/82）",
      transposesId:"eu-w1",
      date:"基础版2013年；最新修订SI 2025/82（2025年6月生效，新增OMP义务）",
      title:"WEEE Regulations 2013（现行合并版）",
      desc:"英国WEEE主法规。历次修订：SI 2015/1968；2018/102；2018/1214（open scope）；2019/188；2020/904；2024/221；SI 2025/82（新增OMP义务）。以legislation.gov.uk最新合并版为准。",
      source:"legislation.gov.uk；GOV.UK guidance；DAERA官网",
      authority:"Defra（政策）；EA（英格兰）；SEPA（苏格兰）；NRW（威尔士）；DAERA（北爱）",
      keyArticles:"生产者定义Reg.2（2025修订新增OMP）；注册Reg.16；处罚Reg.71",
      guidance:[
        {label:"GOV.UK official guidance", url:"https://www.gov.uk/guidance/waste-electrical-and-electronic-equipment-weee-regulation-for-producers"},
        {label:"EA agreed positions", url:"https://www.gov.uk/government/collections/producer-responsibility-regulations-guidance-for-producers-and-compliance-schemes"},
      ],
      url:"https://www.legislation.gov.uk/uksi/2013/3113/contents" }],
    Packaging:[{ id:"uk-p1", type:"SI",
      code:"SI 2024/1332（pEPR）",
      transposesId:"eu-p2",
      date:"2024年",
      title:"Producer Responsibility Obligations (Packaging) Regulations 2024",
      desc:"英国包装EPR制度新法规，替代旧制度。PackUK为新授权机构。注意：英国脱欧后不直接适用EU PPWR（2025/40），独立制度并行。",
      source:"legislation.gov.uk；Defra官网",
      authority:"Defra；EA；PackUK（新授权机构）",
      keyArticles:"生产者定义；申报义务；PackUK注册",
      guidance:[
        {label:"Defra/PackUK官方指引", url:"https://www.gov.uk/guidance/packaging-producer-responsibilities"},
        {label:"EA agreed positions（持续更新）", url:"https://www.gov.uk/government/collections/producer-responsibility-regulations-guidance-for-producers-and-compliance-schemes"},
      ],
      url:"https://www.legislation.gov.uk/uksi/2024/1332/contents" }],
    Battery:[{ id:"uk-b1", type:"SI",
      code:"SI 2008/2164（含历次修订）",
      transposesId:"eu-b1",
      date:"2008年（含历次修订）",
      title:"Batteries and Accumulators (Placing on the Market) Regulations 2008",
      desc:"英国电池EPR现行法规基础。脱欧后不直接适用EU Regulation 2023/1542，需关注英国自行修订动态（UKCA体系）。",
      source:"legislation.gov.uk；GOV.UK",
      authority:"EA（英格兰）；Defra（政策）",
      keyArticles:"生产者义务；注册要求；回收目标",
      url:"https://www.legislation.gov.uk/uksi/2008/2164/contents" }],
  },
};

export default function App() {
  const [country, setCountry] = useState("FR");
  const [domain, setDomain] = useState("ALL");
  // activeFamily: null | euId — drives which family is highlighted+expanded
  const [activeFamily, setActiveFamily] = useState(null);
  // miscOpen: independent open/close for cards with no family (Arrêtés etc)
  const [miscOpen, setMiscOpen] = useState(null);

  const dc = (key) => C[key] || "#aaa";

  const nationalIdsFor = (euId) => {
    const ctryData = NATIONAL[country];
    const ids = [];
    [...DOMAINS, "AGEC"].forEach(d => {
      (ctryData[d] || []).forEach(item => {
        if (item.transposesId === euId) ids.push(item.id);
      });
    });
    return ids;
  };

  // Which EU id is this card's family?
  const euIdOf = (item) => FAMILY_COLOR[item.id] ? item.id : (item.transposesId || null);

  // Is this card open? Family cards open when their family is active; misc cards use miscOpen
  const isOpen = (item) => {
    const euId = euIdOf(item);
    if (euId) return activeFamily === euId;
    return miscOpen === item.id;
  };

  // Click a card
  const handleCardClick = (item) => {
    const euId = euIdOf(item);
    if (euId) {
      setActiveFamily(prev => prev === euId ? null : euId);
      setMiscOpen(null);
    } else {
      setActiveFamily(null); // close any active family
      setMiscOpen(prev => prev === item.id ? null : item.id);
    }
  };

  // Click the ↳ tag: activate the EU family
  const jumpToEU = (euId) => setActiveFamily(prev => prev === euId ? null : euId);

  const visibleDomains = domain === "ALL" ? DOMAINS : [domain];

  const TypeBadge = ({ type }) => {
    const s = TBADGE[type] || { bg:"#374151", text:"#E5E7EB", label:type };
    return (
      <span style={{
        background:s.bg, color:s.text, fontSize:11, fontWeight:700,
        padding:"2px 6px", borderRadius:3, whiteSpace:"nowrap", flexShrink:0,
        letterSpacing:"0.03em",
      }}>{s.label}</span>
    );
  };

  const Card = ({ item, domainKey, side }) => {
    const open = isOpen(item);
    const famId = euIdOf(item);
    const famCol = famId ? FAMILY_COLOR[famId] : null;
    const isActive = famId && famId === activeFamily;
    // border色：激活时用family色，展开时用domain色，否则灰
    const baseCol = side === "eu" ? C.eu : dc(domainKey);
    const borderCol = isActive ? famCol : (open ? baseCol : C.border);
    const bgCol = isActive ? famCol+"18" : (open ? baseCol+"15" : C.card);
    return (
      <div onClick={() => handleCardClick(item)} style={{
        cursor:"pointer",
        borderLeft:"3px solid " + borderCol,
        background: bgCol,
        borderRadius:6, padding:"9px 12px", marginBottom:5,
        transition:"all 0.2s",
        outline: isActive ? "1px solid "+famCol+"66" : (open ? "1px solid "+baseCol+"44" : "none"),
        boxShadow: isActive ? "0 0 0 1px "+famCol+"33" : "none",
      }}>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center", marginBottom:3 }}>
          <code style={{ fontSize:12, fontWeight:700,
            color: isActive ? famCol : baseCol, flexShrink:0 }}>{item.code}</code>
          <TypeBadge type={item.type} />
          {item.transposesId && (
            <span
              onClick={e => { e.stopPropagation(); jumpToEU(item.transposesId); }}
              title={"点击定位："+EU_LABEL[item.transposesId]}
              style={{
                fontSize:11,
                color: FAMILY_COLOR[item.transposesId] || C.eu,
                border:"1px dashed "+(FAMILY_COLOR[item.transposesId]||C.eu)+"99",
                padding:"2px 7px", borderRadius:3, cursor:"pointer",
                letterSpacing:"0.02em", whiteSpace:"nowrap",
                background:(FAMILY_COLOR[item.transposesId]||C.eu)+"12",
                fontWeight: activeFamily === item.transposesId ? 700 : 400,
              }}>
              {"↳ "+(EU_LABEL[item.transposesId]||item.transposesId)}
            </span>
          )}
          {side === "eu" && FAMILY_COLOR[item.id] && nationalIdsFor(item.id).length > 0 && (
            <span style={{
              width:8, height:8, borderRadius:"50%",
              background: FAMILY_COLOR[item.id],
              display:"inline-block", flexShrink:0,
              boxShadow: isActive ? "0 0 5px "+FAMILY_COLOR[item.id] : "none",
            }}/>
          )}
        </div>
        <div style={{ fontSize:14, color:C.text, lineHeight:1.4 }}>{item.title}</div>
        {open && (
          <div style={{ marginTop:9, paddingTop:9, borderTop:"1px solid "+(famCol||baseCol)+"33" }}>
            <div style={{ fontSize:12, color:C.dim, marginBottom:5 }}>{"📅 "+item.date}</div>
            {item.summary && (
              <div style={{
                fontSize:14, fontWeight:700, color:"#F1F5F9",
                lineHeight:1.6, marginBottom:10,
                background:(famCol||baseCol)+"22",
                border:"1px solid "+(famCol||baseCol)+"44",
                borderRadius:6, padding:"6px 12px",
              }}>{item.summary}</div>
            )}
            <div style={{ fontSize:14, color:"#E2E8F0", lineHeight:1.8, marginBottom:6, whiteSpace:"pre-line" }}>{item.desc}</div>
            {item.authority && <div style={{ fontSize:12, color:"#94A3B8", marginBottom:3 }}>{"🏛 主管机构："+item.authority}</div>}
            {item.keyArticles && <div style={{ fontSize:12, color:"#94A3B8", marginBottom:6 }}>{"📌 关键条款："+item.keyArticles}</div>}
            {item.guidance && (
              <div style={{ marginBottom:8 }}>
                <div style={{ fontSize:12, color:"#64748B", marginBottom:5, fontWeight:600 }}>实操指引</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {item.guidance.map((g,i) => (
                    <a key={i} href={g.url} target="_blank" rel="noreferrer"
                      onClick={e=>e.stopPropagation()}
                      style={{ fontSize:12, color:"#64748B", textDecoration:"none",
                        border:"1px solid #334155", padding:"3px 8px", borderRadius:4 }}>
                      {"↗ "+g.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
            <div style={{ fontSize:12, color:C.dim, marginBottom:8 }}>{"📚 核实来源："+item.source}</div>
            <a href={item.url} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}
              style={{ display:"inline-block", fontSize:12, color:famCol||baseCol, textDecoration:"none",
                border:"1px solid "+(famCol||baseCol)+"55", padding:"3px 9px", borderRadius:4 }}>
              查看法律原文 →
            </a>
          </div>
        )}
      </div>
    );
  };

  const DomainBlock = ({ domainKey, items, side }) => {
    if (!items || items.length === 0) return null;
    const col = side === "eu" ? C.eu : dc(domainKey);
    return (
      <div style={{ marginBottom:18 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:col, display:"inline-block" }}/>
          <span style={{ fontSize:12, fontWeight:700, color:col, letterSpacing:"0.08em" }}>
            {DOMAIN_CN[domainKey]}
          </span>
          <span style={{ fontSize:11, color:C.dim }}>({items.length})</span>
        </div>
        {items.map(item => <Card key={item.id} item={item} domainKey={domainKey} side={side} />)}
      </div>
    );
  };

  const ctry = NATIONAL[country];
  const euCount = (EU.WFD?.length||0) + visibleDomains.reduce((n,d) => n+(EU[d]?.length||0), 0);
  const ctryCount = visibleDomains.reduce((n,d) => n+(ctry[d]?.length||0), 0);

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) setActiveFamily(null); }} style={{ minHeight:"100vh", background:C.bg, color:C.bright,
      fontFamily:"system-ui,-apple-system,sans-serif", padding:"20px 14px 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:12, letterSpacing:"0.14em", color:C.eu, fontWeight:700, marginBottom:3 }}>
            LAW INDEX · EPR 合规法律依据索引
          </div>
          <h1 style={{ fontSize:20, fontWeight:900, margin:0, color:"#F8FAFC" }}>
            法律依据全景索引 — 欧盟上位法 vs 成员国国内法
          </h1>
        </div>

        {/* Controls */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:18 }}>
          {/* Domain filter */}
          <div style={{ display:"flex", gap:5, alignItems:"center" }}>
            <span style={{ fontSize:12, color:C.dim, marginRight:2 }}>领域：</span>
            {["ALL","WEEE","Packaging","Battery"].map(d => {
              const active = domain === d;
              const col = d==="ALL" ? "#94A3B8" : dc(d);
              return (
                <button key={d} onClick={() => { setDomain(d); setOpenId(null); }} style={{
                  padding:"4px 11px", borderRadius:5, fontSize:13,
                  border:"1px solid "+(active ? col : C.border),
                  background: active ? col+"22" : "transparent",
                  color: active ? col : C.dim,
                  fontWeight: active ? 700 : 400,
                  cursor:"pointer", transition:"all 0.15s",
                }}>{d==="ALL"?"全部":DOMAIN_CN[d]}</button>
              );
            })}
          </div>
          {/* Country picker */}
          <div style={{ display:"flex", gap:5, alignItems:"center" }}>
            <span style={{ fontSize:12, color:C.dim, marginRight:2 }}>国家：</span>
            {COUNTRIES.map(({ key, flag, name }) => {
              const active = country === key;
              const col = dc(key);
              return (
                <button key={key} onClick={() => { setCountry(key); setOpenId(null); }} style={{
                  padding:"4px 10px", borderRadius:5, fontSize:16,
                  border:"1px solid "+(active ? col : C.border),
                  background: active ? col+"22" : "transparent",
                  color: active ? col : C.dim,
                  fontWeight: active ? 700 : 400,
                  cursor:"pointer", transition:"all 0.15s",
                }}>{flag}</button>
              );
            })}
          </div>
        </div>

        {/* Split layout */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, alignItems:"start" }}>

          {/* LEFT — EU */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              <div style={{ width:4, height:32, background:C.eu, borderRadius:2 }}/>
              <div>
                <div style={{ fontSize:15, fontWeight:800, color:C.eu }}>🇪🇺 欧盟上位法</div>
                <div style={{ fontSize:12, color:C.dim }}>{"EUR-Lex · eur-lex.europa.eu · "+euCount+" 项"}</div>
              </div>
            </div>
            <div style={{ background:C.panel, borderRadius:10, padding:"14px 12px",
              border:"1px solid "+C.eu+"44" }}>
              <div style={{ fontSize:11, color:C.eu, fontWeight:700, letterSpacing:"0.08em",
                marginBottom:14, padding:"3px 8px", background:C.eu+"18",
                borderRadius:4, display:"inline-block" }}>
                ★ eur-lex.europa.eu
              </div>
              {EU.WFD && EU.WFD.length > 0 && (
                <div style={{ marginBottom:18 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:"#B45309", display:"inline-block" }}/>
                    <span style={{ fontSize:12, fontWeight:700, color:"#B45309", letterSpacing:"0.08em" }}>
                      通用上位法（三领域适用）
                    </span>
                  </div>
                  {EU.WFD.map(item => <Card key={item.id} item={item} domainKey="WFD" side="eu" />)}
                  <div style={{ height:1, background:"#1E293B", margin:"14px 0 4px" }} />
                </div>
              )}
              {visibleDomains.map(d => (
                <DomainBlock key={d} domainKey={d} items={EU[d]} side="eu" />
              ))}
            </div>
          </div>

          {/* RIGHT — Country */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              <div style={{ width:4, height:32, background:dc(country), borderRadius:2 }}/>
              <div>
                <div style={{ fontSize:15, fontWeight:800, color:dc(country) }}>
                  {ctry.flag+" "+ctry.name+" 国内法"}
                </div>
                <div style={{ fontSize:12, color:C.dim }}>{"国内转化立法 · "+ctryCount+" 项"}</div>
              </div>
            </div>
            <div style={{ background:C.panel, borderRadius:10, padding:"14px 12px",
              border:"1px solid "+dc(country)+"44" }}>
              <div style={{ fontSize:11, color:dc(country), fontWeight:700, letterSpacing:"0.08em",
                marginBottom:14, padding:"3px 8px", background:dc(country)+"18",
                borderRadius:4, display:"inline-block" }}>
                {country === "UK"
                  ? "⚖ legislation.gov.uk"
                  : country === "FR"
                  ? "⚖ legifrance.gouv.fr"
                  : country === "DE"
                  ? "⚖ bundesgesetzblatt.de / gesetze-im-internet.de"
                  : country === "IT"
                  ? "⚖ gazzettaufficiale.it"
                  : country === "ES"
                  ? "⚖ boe.es"
                  : "⚖ irishstatutebook.ie"}
              </div>
              {ctry.AGEC && ctry.AGEC.length > 0 && (
                <div style={{ marginBottom:18 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:"#B45309", display:"inline-block" }}/>
                    <span style={{ fontSize:12, fontWeight:700, color:"#B45309", letterSpacing:"0.08em" }}>
                      通用上位法（三领域适用）
                    </span>
                  </div>
                  {ctry.AGEC.map(item => <Card key={item.id} item={item} domainKey="AGEC" side="country" />)}
                  <div style={{ height:1, background:"#1E293B", margin:"14px 0 4px" }} />
                </div>
              )}
              {visibleDomains.map(d => (
                <DomainBlock key={d} domainKey={d} items={ctry[d]} side="country" />
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ marginTop:16, padding:"10px 14px", background:C.panel,
          borderRadius:8, border:"1px solid "+C.border }}>
          <div style={{ fontSize:11, color:"#334155", fontWeight:700,
            letterSpacing:"0.08em", marginBottom:7 }}>文件类型图例</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"4px 8px" }}>
            {Object.entries(TBADGE).map(([k,s]) => (
              <span key={k} style={{ background:s.bg, color:s.text,
                fontSize:11, fontWeight:700, padding:"2px 6px", borderRadius:3 }}>
                {s.label}
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginTop:10, fontSize:12, color:"#1E293B", textAlign:"center" }}>
          数据截至 2026年3月 · 建议通过 EUR-Lex 及各国官方渠道核查最新版本
        </div>
      </div>
    </div>
  );
}

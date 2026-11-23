// Project data. Add or edit projects here.
//
// Fields
//   featured: show on the home page
//   preview:  "receipt" renders the SIPIM receipt; otherwise `image`, otherwise a category icon
//   note:     optional disclaimer shown in the case study dialog
//   outcomes: only write results you can explain; remove anything you cannot back up
//   links:    may be empty
export const projects = [
  {
    id: "jeda",
    featured: true,
    title: "Jeda: Student Wellbeing Reflection App",
    category: "Systems Development",
    text: "An anonymous reflection app where students track daily wellbeing patterns and use guided breathing and grounding exercises.",
    overview:
      "Jeda is a private reflection space designed for students writing their thesis. Short daily check-ins help users notice patterns in stress, energy, sleep, and study progress.",
    problem:
      "Students under academic pressure need a simple, non-judgmental way to reflect on their wellbeing and notice changes in their routines.",
    solution:
      "Built a web app with anonymous access codes, daily check-ins, personal trend dashboards, and guided relaxation exercises, with user-controlled data export and deletion.",
    keyFeatures: [
      "Anonymous access with a unique code",
      "Daily wellbeing check-ins and reflection history",
      "Interactive charts for stress, energy, and study progress",
      "Guided 4-7-8 breathing and 5-4-3-2-1 grounding exercises",
      "CSV data export and account deletion controls",
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Recharts"],
    preview: "jeda",
    image: null,
    links: [
      { label: "Live demo", url: "https://jeda-ten.vercel.app", type: "demo" },
      { label: "GitHub repository", url: "https://github.com/yonxxxy-is/jeda", type: "github" },
    ],
  },
  {
    id: "sipim-retail",
    featured: true,
    title: "SIPIM: Web-Based Retail Management System",
    category: "Systems Development",
    text: "A retail management system covering product catalogs, supplier management, stock tracking, and sales records with role-based access.",
    overview:
      "SIPIM addresses a common gap in small retail businesses: warehouse stock records drifting out of sync with the point-of-sale register.",
    problem:
      "Manual ledgers led to inaccurate stock counts, late supplier re-orders, and monthly reconciliation that took significant staff time.",
    solution:
      "Built a full-stack web application that deducts stock automatically on each sale, triggers purchase orders for low-stock items, and logs every transaction under role-based access control.",
    keyFeatures: [
      "Real-time inventory and stock movement logging",
      "Supplier and purchase order management",
      "Point-of-sale checkout with receipt reconciliation",
      "Role-based access control (owner and staff)",
      "Automated monthly revenue and expense reports",
    ],
    // Removed unverified figures (90% fewer discrepancies, 3 days to 2 hours, 100% auditable logs).
    // Add measured results back here if you have them.
    outcomes: [
      "Delivered a working system with point-of-sale, inventory, supplier, and reporting modules",
      "Added an activity log so every stock and sales change can be traced to a user",
      "Separated owner and staff permissions through role-based access",
    ],
    tags: ["Laravel", "React.js", "MySQL", "Database Design", "RESTful API", "Tailwind CSS"],
    preview: "receipt",
    image: null,
    links: [{ label: "GitHub repository", url: "https://github.com/sionfelix/sipim", type: "github" }],
  },
  {
    id: "alfagift-it-audit",
    featured: true,
    title: "IT Audit of the Alfagift Retail Application",
    category: "IT Audit & Governance",
    text: "An academic IT audit case study covering audit planning, a risk register, and working papers for 15 control activities, aligned with COBIT 2019 and ISO/IEC 27001.",
    overview:
      "The final project for the Information Systems Audit course at Universitas Atma Jaya Yogyakarta. It follows a full audit cycle for the Alfagift retail application of PT Sumber Alfaria Trijaya Tbk, from planning to the final report.",
    problem:
      "Alfagift connects a mobile app with warehouse and in-store point-of-sale systems across more than 19,000 stores, so weak access, change, and continuity controls can affect the whole omnichannel operation.",
    solution:
      "Planned and documented the audit using COBIT 2019 and ISACA ITAF: defined scope and objectives, prepared the audit plan, audit program, and document request list, scored risks with an ISO 31000 impact-likelihood matrix, and recorded test results in working papers (KKP) for 15 activities across 5 domains.",
    keyFeatures: [
      "Audit plan, audit program, and engagement documents",
      "Risk register scored with an ISO 31000 impact-likelihood matrix",
      "Document request list covering governance, security, and operations",
      "Working papers with test objectives, evidence references, and ratings for 15 activities in 5 domains",
      "Final audit report with an executive summary, findings matrix, and recommendations assigned by owner",
    ],
    outcomes: [
      "Rated each activity as finding or no finding, and each risk as Critical, High, Medium, or Low",
      "Mapped results to COBIT 2019 processes: EDM01, APO12, DSS05, BAI03, BAI06, DSS01, DSS02, DSS04, and MEA01",
      "Proposed prioritized recommendations with follow-up deadlines tied to risk level",
    ],
    note: "Coursework case study. Findings are for academic purposes and are not an official assessment of the company.",
    tags: ["IT Audit", "COBIT 2019", "ISO/IEC 27001", "ISO 31000", "Risk Register", "ISACA ITAF"],
    preview: "audit",
    image: null,
    links: [
      {
        label: "GitHub repository",
        url: "https://github.com/yonxxxy-is/it-audit-alfagift",
        type: "github",
      },
    ],
  },
  {
    id: "energy-transition-dashboard",
    featured: true,
    title: "Global Energy Transition: GDP vs Renewable Energy Share",
    category: "Data & BI",
    text: "An interactive Tableau dashboard exploring whether wealthier countries rely more on renewable energy, aligned with SDG 7 (affordable and clean energy).",
    overview:
      "A team project of four students built around one question: does a higher GDP mean a cleaner energy mix? The dashboard compares renewable and fossil energy shares across countries and income groups.",
    problem:
      "Energy and GDP indicators for many countries over several decades are hard to compare in tables, which hides whether income level and renewable adoption are related.",
    solution:
      "Combined renewable share, fossil share, and GDP data in Tableau and designed four views: a world map of renewable share, a top 10 ranking, a long-term trend of fossil versus renewable share, and a GDP versus renewable share scatter plot grouped by income category.",
    keyFeatures: [
      "World map of total renewable share by country",
      "Top 10 ranking of countries by renewable share",
      "Trend of average renewable and fossil share over time",
      "Scatter plot of GDP against renewable share, grouped by income category",
    ],
    outcomes: [
      "Presented the relationship between income level and renewable adoption in a single dashboard",
      "Published the dashboard on Tableau Public for open access",
      "Delivered as a team of four",
    ],
    tags: ["Tableau", "Data Visualization", "Exploratory Data Analysis", "SDG 7"],
    image: "/gallery/tableau-analytics.webp",
    imageAlt:
      "Tableau dashboard with a world map of renewable energy share, a top 10 ranking of countries, a trend line of fossil versus renewable share, and a GDP versus renewable share scatter plot.",
    links: [
      {
        label: "View on Tableau Public",
        url: "https://public.tableau.com/app/profile/sion.felix/viz/Doesarichercountrymeancleanerenergy/Insight",
        type: "tableau",
      },
    ],
  },
  {
    id: "iso27001-isms",
    title: "ISO/IEC 27001:2022 Foundation Certificate",
    category: "Certificate",
    text: "Foundation-level certificate for ISO/IEC 27001:2022 Information Security Management Systems, issued by CBQA Global.",
    overview: "CBQA Global lists this ISO/IEC 27001:2022 Foundation certificate as active. Open the PDF preview or verify it online.",
    image: "/gallery/iso27001-certificate.png",
    imageAlt: "First page of the CBQA Global ISO/IEC 27001:2022 Foundation certificate validation document.",
    imageFit: "cover",
    imagePosition: "top",
    document: "/certificates/cbqa-iso27001.pdf",
    tags: ["ISO/IEC 27001", "CBQA Global"],
    links: [
      { label: "Verify certificate", url: "https://validation.cbqaglobal.com/verify/ISMS%20602/25%204418", type: "certificate" },
    ],
  },
  {
    id: "tableau-certificate",
    title: "Tableau Fundamentals Certificate",
    category: "Certificate",
    text: "Completed Tableau Fundamentals through Tableau eLearning.",
    overview: "Certificate of completion for Tableau Fundamentals, offered by Tableau eLearning. Open the PDF preview or verify it through Skilljar.",
    image: "/gallery/tableau-certificate.png",
    imageAlt: "Tableau Fundamentals certificate of completion.",
    imageFit: "cover",
    imagePosition: "center",
    document: "/certificates/tableau-certificate.pdf",
    tags: ["Tableau", "Data Visualization"],
    links: [
      { label: "Verify certificate", url: "https://verify.skilljar.com/c/w6nv3am4m6jn", type: "certificate" },
    ],
  },
  {
    id: "bpmn-optimization",
    title: "SME Procurement and Inventory Workflow Optimization",
    category: "Business Analysis",
    text: "As-Is and To-Be process redesign in BPMN 2.0 to streamline vendor procurement and warehouse handoffs.",
    overview:
      "Analyzed the supply chain operations of a local distributor to remove administrative bottlenecks in purchase requisition approval and supplier delivery handoffs.",
    problem:
      "Coordination through instant messaging caused duplicate orders, late deliveries, and unclear accountability across three warehouse locations.",
    solution:
      "Mapped the As-Is process, identified four bottleneck handover points, and designed streamlined To-Be BPMN workflows supported by standard operating procedures (SOPs).",
    keyFeatures: [
      "End-to-end BPMN 2.0 swimlane models",
      "Bottleneck and root cause (fishbone) analysis",
      "Digital requisition and approval gateways",
      "Standard operating procedure (SOP) documentation",
    ],
    // Removed unverified figures (7 days to 2.5 days, 100% fewer duplicate orders, "adopted by staff").
    // The old "View Process Diagrams" link pointed to your LinkedIn profile and was removed.
    // Add a real link to the diagrams (PDF, Figma, or GitHub) when you have one.
    outcomes: [
      "Documented the current process and the redesigned process side by side",
      "Defined digital approval gateways and SOPs for each handoff",
    ],
    tags: ["BPMN 2.0", "Business Process Modeling", "Gap Analysis", "SOP Development"],
    image: null,
    links: [],
  },
  {
    id: "publication-gkj-condongcatur",
    title: "Pengembangan Website dalam Meningkatkan Akses Informasi dan Kegiatan Jemaat Gereja Kristen Jawa Condongcatur",
    category: "Publication",
    text: "Artikel prosiding tentang pengembangan website responsif dan pelatihan pengelolaan informasi bagi petugas GKJ Condongcatur.",
    overview:
      "Publikasi ini membahas pengembangan ulang website GKJ Condongcatur agar informasi dan kegiatan jemaat lebih mudah diakses dan dikelola. Prosesnya mencakup analisis kebutuhan, desain responsif, pengembangan dengan Laravel, dan pelatihan petugas gereja.",
    tags: ["Web Development", "Laravel", "Community Service"],
    links: [
      {
        label: "Read publication",
        url: "https://ojs.uajy.ac.id/index.php/prosidingkonstelasi/article/view/11307",
        type: "publication",
      },
    ],
  },
  {
    id: "publication-ai-umkm",
    title: "Implementasi Teknologi AI dalam Promosi UMKM: Program Pemberdayaan Komunitas Orang Tua SD Kanisius Kadirojo",
    category: "Publication",
    text: "Artikel GIAT tentang pelatihan pemanfaatan AI dan perangkat digital untuk membantu UMKM membuat konten promosi.",
    overview:
      "Program pengabdian kepada masyarakat ini melatih komunitas orang tua SD Kanisius Kadirojo menggunakan Google Gemini, Canva AI, Google Business Profile, dan perangkat video berbasis AI untuk membuat konten promosi usaha.",
    tags: ["Artificial Intelligence", "Digital Literacy", "UMKM"],
    links: [
      {
        label: "Read publication",
        url: "https://ojs.uajy.ac.id/index.php/giat/article/view/14411",
        type: "publication",
      },
    ],
  },
  {
    id: "sap-certificate",
    title: "SAP Enterprise Resource Planning (SD, MM, PP)",
    category: "Certificate",
    text: "Certificate of participation in the Enterprise Resource Planning program covering SAP modules SD, MM, and PP.",
    overview: "The certificate records participation in the Enterprise Resource Planning program from April to June 2026, conducted by the Faculty of Industrial Technology at Universitas Atma Jaya Yogyakarta.",
    image: "/gallery/sap-certificate.png",
    imageAlt: "SAP Enterprise Resource Planning certificate showing the modules SD, MM, and PP.",
    imageFit: "cover",
    imagePosition: "top",
    document: "/certificates/sap-certificate.pdf",
    tags: ["SAP", "ERP", "SD", "MM", "PP"],
    links: [
      {
        label: "Open certificate PDF",
        url: "/certificates/sap-certificate.pdf",
        type: "certificate",
      },
    ],
  },
];

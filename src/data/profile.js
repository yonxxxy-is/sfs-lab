// Edit content here. Every change is reflected across the site.
export const profile = {
  name: "Sion Felix Saragih",
  headline: "Sion Felix Saragih",
  subheadline:
    "Information Systems student focused on data analytics, IT governance, and business analysis.",
  status: "Open to internships and project collaboration",
  description:
    "I work where data, business processes, and information security meet: building dashboards, documenting workflows, and assessing IT controls against ISO/IEC 27001 and COBIT.",
  location: "Sleman, D.I. Yogyakarta, Indonesia",
  photo: null, // Put a photo at public/profile.webp when ready (a monogram is used until then)
  metrics: [
    { value: "3.76", label: "GPA (scale of 4.00)" },
    { value: "2", label: "Professional certifications" },
    { value: "2027", label: "Expected graduation" },
  ],
  highlights: [
    { label: "ISO/IEC 27001:2022 ISMS Foundation", tag: "2025", issuer: "CBQA Global" },
    { label: "Google Student Ambassador", tag: "2025–2026", issuer: "Google" },
    { label: "Chairman of I-Week #5", tag: "2025", issuer: "HIMSI UAJY" },
  ],
  banner: {
    title: "Google Student Ambassador and Chairman of I-Week #5",
    text: "Peer mentoring on digital tools with Google, and leadership of I-Week #5 at HIMSI UAJY, including planning, budget oversight, and coordination across multiple divisions.",
  },
  links: {
    email: "sionfelix2002@gmail.com", // Used only by the "Copy email" button; never rendered as text or a mailto: link
    linkedin: "https://linkedin.com/in/sionfelix",
    github: "https://github.com/yonxxxy-is",
    cv: "/Sion-Felix-Saragih-CV.pdf", // File lives in public/
  },
  pillars: [
    {
      title: "Data analytics and business intelligence",
      icon: "BarChart3",
      text: "Cleaning and modeling data, then presenting it in interactive Tableau dashboards and Excel reports that support decisions.",
    },
    {
      title: "IT governance and risk management",
      icon: "ShieldCheck",
      text: "Assessing information security controls against ISO/IEC 27001 and COBIT 2019, from risk registers to audit working papers.",
    },
    {
      title: "Systems and business process analysis",
      icon: "Workflow",
      text: "Documenting workflows in BPMN and building relational databases and web applications with Laravel, React, and MySQL.",
    },
  ],
  education: {
    school: "Universitas Atma Jaya Yogyakarta",
    degree: "Bachelor of Information Systems (S.Kom.)",
    gpa: "3.76 / 4.00",
    period: "Aug 2023 – Expected Feb 2027",
    coursework: [
      "Database Systems",
      "Business Process Modeling",
      "Information Security Management",
      "Information Systems Audit",
      "Web Application Development",
      "Statistical Analysis",
    ], // TODO: confirm this list matches the courses you actually took
    certs: [
      {
        name: "ISO/IEC 27001:2022 ISMS Foundation",
        issuer: "CBQA Global",
        year: "2025",
        credentialId: "ISMS 602/25 4418",
        link: "https://validation.cbqaglobal.com/verify/ISMS%20602/25%204418",
      },
      {
        // TODO: replace the placeholder credential ID and link with the real ones, or remove this entry.
        name: "Tableau Fundamentals",
        issuer: "Salesforce / Tableau",
        year: "2024",
        credentialId: "TAB-FND-2024",
        link: "https://public.tableau.com/",
      },
    ],
  },
  skills: {
    "Data analytics and BI": [
      "Tableau",
      "Microsoft Excel (Advanced)",
      "Data Cleaning",
      "Exploratory Data Analysis",
      "Visual Analytics",
      "KPI Dashboards",
    ],
    "Development and databases": [
      "Laravel (PHP)",
      "React.js",
      "MySQL",
      "Relational Database Design",
      "RESTful APIs",
      "Git & GitHub",
    ],
    "Governance, risk, and audit": [
      "ISO/IEC 27001 ISMS",
      "COBIT 2019",
      "IT Audit Planning (ISACA ITAF)",
      "Risk Registers (ISO 31000)",
      "IT Risk Management",
      "Information Security Policy",
    ],
    "Business analysis and operations": [
      "Business Process Modeling (BPMN)",
      "System Requirement Documentation (SRS)",
      "Inventory Management",
      "Retail Operations",
      "Cross-functional Leadership",
    ],
  },
  experience: [
    {
      role: "Google Student Ambassador",
      org: "Google",
      period: "May 2025 – Jan 2026",
      text: "Ran technology literacy campaigns and campus workshops that introduced students to Google Cloud and developer productivity tools.",
      photos: [],
    },
    {
      role: "Chairman of I-Week #5",
      org: "HIMSI UAJY",
      period: "2025",
      text: "Led the annual Information Systems Week, covering budget management, coordination across divisions, sponsor relations, and event delivery for hundreds of participants.",
      photos: [],
    },
    {
      role: "Promotion and Public Relations Staff",
      org: "Kantor Kerjasama & Promosi UAJY",
      period: "2024 – 2025",
      text: "Represented the university at promotional expos in high schools, prepared administrative documentation, and answered questions from prospective students.",
      photos: [],
    },
    {
      role: "Website Maintenance and Digital Operations",
      org: "Yayasan AAT Indonesia (Remote)",
      period: "2024",
      text: "Maintained content and uptime for a non-profit scholarship portal, keeping scholarship distribution data and stakeholder updates accurate.",
      photos: [],
    },
  ],
};

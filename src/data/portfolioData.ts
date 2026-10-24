/**
 * Full portfolio data for Ahmed Abo Bakr
 * Big Data Engineer & AI Solutions Architect
 */

export interface Project {
  id: string;
  title: string;
  category: 'Big Data' | 'AI & ML' | 'Full-Stack' | 'Data Engineering' | 'Security' | 'Database' | 'Heros Suite';
  description: string;
  longDescription: string;
  tags: string[];
  stars: number;
  forks: number;
  metrics: string;
  architecture: string;
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills: string[];
  featured?: boolean;
  category: 'AI & ML' | 'Big Data & Cloud' | 'Data & BI' | 'Software Engineering' | 'Security & Governance' | 'Global & UN';
}

export interface Experience {
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface Article {
  id: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  tags: string[];
}

export interface AppFeature {
  id: string;
  title: string;
  category:
    | 'Power Tools & Calculators'
    | 'Audio & Focus Studio'
    | '3D & Graphics'
    | 'Data Simulation'
    | 'Search & Filters'
    | 'Controls & Themes'
    | 'Accessibility & Mobile';
  description: string;
  icon: string;
  isUnlimited: boolean;
  status: 'Active' | 'Pro Ready';
}

export const PERSONAL_INFO = {
  name: "Ahmed Abo Bakr",
  title: "Big Data Engineer",
  tagline: "ETL/ELT · Data Warehousing · Real-time Streaming · Spark · Airflow · SQL · Cloud (AWS / Azure)",
  subtitle: "Architecting scalable, high-performance, cost-optimized data ecosystems.",
  bio: "Big Data Engineer passionate about architecting scalable, high-performance data solutions. Proven expertise in building end-to-end data platforms, real-time streaming pipelines, and enterprise data warehouses using Spark, Airflow, Python, and Cloud (AWS/Azure). Track record of designing secure data environments with RBAC, AES-256 encryption, and inference control, delivering systems that power data-driven insights. Top Performer — AI & ML Track, Route Academy. 73 certifications across 8 domains including Oxford, Google, AWS, UN, IBM, and Huawei.",
  location: "Cairo, Egypt",
  email: "Ahmedbakr@internet.ru",
  linkedin: "https://linkedin.com/in/ahmed-abo-bakr-1b2466288",
  github: "https://github.com/Ahmedbakr78",
  organization: "https://github.com/Nevai-Org",
  avatar: "/assets/avatar_pages.jpg",
  githubAvatar: "/assets/avatar_github.jpg",
  followers: "8,048+",
  connections: "500+",
  stats: {
    contributions: 2160,
    coreContributions: 410,
    totalRepositories: 137,
    publicPortfolioRepos: 22,
    matrixBridges: 25,
    pullRequests: "99%",
    codeReviews: "7%",
    certificationsCount: 73,
    projectsCount: 22,
    skillDomains: 8,
    academicGpa: "3.0 GPA",
  },
  education: {
    institution: "Helwan National University",
    degree: "Computer Science",
    gpa: "GPA 3.0",
    description: "Comprehensive computer science education covering data structures, algorithms, database systems, software engineering, artificial intelligence, and distributed systems."
  }
};

export const WHAT_I_DO = [
  {
    discipline: "Big Data Engineering",
    description: "Design and implement scalable data pipelines, real-time streaming solutions and enterprise data warehouses",
    stack: ["Spark", "Airflow", "Kafka", "ETL/ELT", "Data Warehousing", "Delta Lake"]
  },
  {
    discipline: "Cloud Architecture",
    description: "Build secure, scalable cloud infrastructure with containerization, microservices and event-driven architectures",
    stack: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "EKS"]
  },
  {
    discipline: "AI & Machine Learning",
    description: "Develop intelligent systems using NLP, LLMs, computer vision and predictive modeling",
    stack: ["NLP", "LLMs", "LLMOps", "XGBoost", "Hugging Face", "RAG"]
  },
  {
    discipline: "Database Solutions",
    description: "Design and optimize relational and NoSQL databases with advanced security, RBAC, encryption and performance tuning",
    stack: ["SQL Server", "Oracle PL/SQL", "PostgreSQL", "Database Security", "RBAC", "AES-256"]
  },
  {
    discipline: "Full-Stack Development",
    description: "Build modern web applications with seamless frontend-backend integration and browser studio extensions",
    stack: ["React 19", "Python", "Java", "TypeScript", "FastAPI", "Spring Boot", "Angular 17"]
  },
  {
    discipline: "Data Analytics & Visualization",
    description: "Transform raw data into actionable insights through statistical analysis, EDA and interactive dashboards",
    stack: ["Statistical Modeling", "EDA", "Regression", "Interactive Dashboards", "Kimball Schema"]
  }
];

export const NEVAI_ECOSYSTEM = [
  {
    area: "Privacy-First Search",
    built: "AI-powered search engine that runs entirely in the browser — no data leaves the device"
  },
  {
    area: "Sovereign Office Suite",
    built: "100% self-hosted productivity tools — docs, sheets, slides, forms, kanban, code, whiteboards"
  },
  {
    area: "Federated Architecture",
    built: "Data lives where users decide — no single central authority"
  },
  {
    area: "Decentralized Identity",
    built: "One identity across the whole federation, no central authority"
  },
  {
    area: "Open SDK",
    built: "Build on top of NEVAI instead of being locked inside it"
  },
  {
    area: "AI Agent Layer",
    built: "Intelligence built directly into the protocol"
  },
  {
    area: "Messaging Federation (25 Bridges)",
    built: "25 platform bridges (Matrix C-S API, media and formatting relay, presence and read-state sync)"
  }
];

export const HEROS_SUITE = [
  {
    name: "Heros PDF",
    description: "PDF viewer and editor studio — annotate, merge, split, search, watermark",
    tech: "Chromium MV3 • Canvas • 100% Local"
  },
  {
    name: "Heros Markdown",
    description: "Markdown studio — offline KaTeX math, every Mermaid diagram, RTL support",
    tech: "Chromium MV3 • KaTeX • Mermaid"
  },
  {
    name: "Heros NoteBook",
    description: ".ipynb viewer with a real Python runner via Pyodide WebAssembly",
    tech: "Chromium MV3 • Pyodide WASM • Python"
  },
  {
    name: "Heros Todo",
    description: "Markdown, PDF and LaTeX panel studio with workspaces and clickable tasks",
    tech: "Chromium MV3 • LaTeX • Workspaces"
  },
  {
    name: "Heros Player",
    description: "Remote control for YouTube Music, YouTube and Spotify tabs",
    tech: "Chromium MV3 • Media Controller"
  },
  {
    name: "markClipper",
    description: "Web clipper and Photo Lab — articles, selections and galleries to Markdown",
    tech: "Chromium MV3 • DOM Clipper • Photo Lab"
  }
];

export const TRAINING_PROGRAMS = [
  { program: "Route Academy — AI and ML Track", detail: "Top Performer" },
  { program: "NTI MEAN-Stack Training", detail: "100% Score" },
  { program: "JPMorganChase Software Engineering Simulation", detail: "Spring, Kafka, REST (Forage)" },
  { program: "Huawei Big Data Associate", detail: "National Telecommunication Institute (NTI)" },
  { program: "MCIT AI Advanced", detail: "Fast Lane in partnership with Microsoft" },
  { program: "Google Skillshop", detail: "Analytics and AI Certifications" },
  { program: "Oracle AI for You", detail: "Verified Badge" }
];

export const ROADMAP_ITEMS = [
  { section: "Platform", item: "NEVAI Federation Growth (25+ Matrix Bridges)", period: "2026-10 – 2027-06", status: "Active" },
  { section: "Heros Suite", item: "Firefox & Edge Ports + Store Publishing (v3.0)", period: "2026-11 – 2027-03", status: "Planned" },
  { section: "Big Data Skills", item: "Databricks & Delta Lake Enterprise Mastery", period: "2026-10 – 2027-03", status: "Active" },
  { section: "Streaming", item: "Streaming at Scale with Apache Flink", period: "2027-01 – 2027-06", status: "Planned" }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Executive Chairman & Founder",
    company: "NEVAI (@Nevai-Org)",
    period: "Jan 2026 - Present",
    description: "A decentralized, federated workspace platform built from the ground up with its own open protocol, identity layer, 25-bridge Matrix messaging federation, and Heros 6-extension browser suite.",
    achievements: [
      "Built privacy-first, AI-powered search engine running entirely in browser with no data leaving device",
      "Developed sovereign office suite offering 100% self-hosted productivity tools (docs, sheets, slides, forms, kanban, code, whiteboards)",
      "Shipped 25-bridge messaging federation over Matrix C-S API with media relay, presence, and read-state sync",
      "Built and shipped the Heros Browser Suite: 6 Chromium (MV3) extensions (PDF, Markdown, NoteBook with Pyodide WASM, Todo, Player, markClipper)",
      "Implemented federated architecture and decentralized identity without central authority lock-in",
      "Designed open SDK and integrated native AI agent layer directly into the protocol"
    ],
    skills: ["Decentralized Systems", "Matrix Federation", "Federated Architecture", "AI Search", "Chromium MV3", "TypeScript"]
  },
  {
    role: "Security Lead",
    company: "Secure Student Records Management System",
    period: "Jan 2025 - Mar 2025",
    description: "Multi-layered database security system designed for enterprise-grade academic compliance.",
    achievements: [
      "Developed multi-layered database security system integrating 5 comprehensive security models",
      "Established Role-Based Access Control (RBAC) reducing unauthorized access attempts by 95%",
      "Enforced multilevel security models preventing unauthorized data leakage across clearance tiers",
      "Integrated AES-256 cryptographic encryption for sensitive student and financial records",
      "Programmed inference control mechanisms to thwart statistical attacks on aggregated analytics"
    ],
    skills: ["Database Security", "RBAC", "AES-256", "Inference Control", "SQL Server", "Security Auditing"]
  },
  {
    role: "Project Lead Developer",
    company: "Five-A Analytics",
    period: "Oct 2024 - Dec 2024",
    description: "Automated machine learning platform handling large tabular datasets and automated model selection.",
    achievements: [
      "Architected automated ML platform processing 50,000+ data rows with automated pipeline triggers",
      "Configured 8 regression algorithms achieving 92% R-squared accuracy on benchmark validation",
      "Pioneered AI-powered natural language query module for instant ad-hoc analytical summaries",
      "Constructed interactive data visualization dashboards generating 12 distinct chart types",
      "Streamlined statistical hypothesis testing across 30 variable combinations",
      "Orchestrated 6-stage data pipeline reducing batch processing time to under 2 minutes"
    ],
    skills: ["Automated ML", "Regression", "Python", "Data Visualization", "ETL Pipelines", "EDA"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Web-to-Warehouse Product Intelligence Pipeline",
    category: "Big Data",
    description: "DEPI capstone: 35 permitted web/API sources → cleaning → fuzzy dedupe → 29-table Kimball warehouse → Airflow (33 tasks) → FastAPI (23 routers, 216 endpoints) → React 19 dashboard.",
    longDescription: "End-to-end enterprise product intelligence platform ingesting from 35 web and API sources, executing automated cleaning and fuzzy deduplication, modeling into a 29-table Kimball Star Schema warehouse (FACT_PRICE_HISTORY, DIM_PRODUCT, DIM_SOURCE, DIM_CATEGORY, DIM_DATE), validating 12 Data Quality rules, orchestrated by Apache Airflow across 33 tasks, served via FastAPI (23 routers, 216 endpoints) to a React 19 analytics dashboard.",
    tags: ["Python", "PostgreSQL", "Apache Airflow", "FastAPI", "React 19", "Kimball Warehouse"],
    stars: 1,
    forks: 0,
    metrics: "35 Sources • 29 Kimball Tables • 33 Airflow Tasks • 216 FastAPI Endpoints",
    architecture: "35 Web/API Sources -> Cleaning & Fuzzy Dedupe -> 29-Table Kimball Warehouse (12 DQ Rules) -> Airflow (33 Tasks) -> FastAPI (216 Endpoints) -> React 19 UI",
    githubUrl: "https://github.com/Ahmedbakr78/Web-to-Warehouse-Product-Intelligence-Pipeline",
    featured: true
  },
  {
    id: "2",
    title: "TourMate — MEAN-Stack Smart Tourism Platform",
    category: "Full-Stack",
    description: "Full MEAN-stack smart tourism platform with 4 role dashboards (Tourist, Driver, Guide, Admin), live tracking, Overpass/OSRM routing, Leaflet maps, and bilingual EN/AR + RTL Zara/Zen monochrome UI.",
    longDescription: "Built with Angular 17 standalone components, Express + MongoDB, JWT/bcrypt authentication, polling-based live tracking, Overpass/OSRM geospatial integration, Leaflet interactive maps, full i18n EN/AR with RTL support, Zara/Zen monochrome aesthetic, Swagger API documentation, Docker containerization, and CI pipelines.",
    tags: ["Angular 17", "Node.js", "Express", "MongoDB", "Leaflet", "Docker", "TypeScript"],
    stars: 1,
    forks: 0,
    metrics: "4 Role Dashboards • Live OSRM Tracking • EN/AR RTL • Docker & Swagger Ready",
    architecture: "Angular 17 Standalone SPA -> Express REST API + JWT Auth -> MongoDB + Overpass/OSRM Geospatial Engine",
    githubUrl: "https://github.com/Ahmedbakr78",
    featured: true
  },
  {
    id: "3",
    title: "Production-Grade End-to-End Big Data Pipeline",
    category: "Big Data",
    description: "Distributed computing, fault tolerance, automated validation, data quality checks and production monitoring across the full pipeline lifecycle.",
    longDescription: "Handles large-scale data ingestion, transformation, and analytics workloads using industry-standard frameworks. Implements fault tolerance, data quality checks, and real-time monitoring for production environments with Apache Spark structured streaming, Kafka distributed messaging, and Airflow orchestration.",
    tags: ["Shell", "Apache Spark", "Big Data", "Kafka", "Airflow", "ETL"],
    stars: 1,
    forks: 1,
    metrics: "1M+ records/sec ingestion • Sub-second latency • 99.9% uptime",
    architecture: "Kafka Event Broker -> Spark Streaming Engine -> Delta Lake Storage -> Hive Metastore",
    githubUrl: "https://github.com/Ahmedbakr78/engineer-a-production-grade-end-to-end-Big-Data-pipeline-that-demonstrates-advanced-proficiency",
    featured: true
  },
  {
    id: "4",
    title: "MIZAN — Egyptian Arabic Legal Assistant",
    category: "AI & ML",
    description: "NLP system for Egyptian Arabic legal documents with Retrieval-Augmented Generation, Gradio interface and complex legal terminology handling.",
    longDescription: "Features a user-friendly Gradio interface for query processing and document analysis. Handles complex legal terminology and context-specific interpretations with vector search, semantic embeddings, and customized LLM prompts fine-tuned on Egyptian legal statutes.",
    tags: ["Python", "NLP", "RAG", "Gradio", "Vector DB", "Embeddings"],
    stars: 1,
    forks: 0,
    metrics: "94% retrieval accuracy on Egyptian Civil & Penal codes",
    architecture: "ChromaDB Vector Store -> Hugging Face Embeddings -> Arabic Tokenizer -> Gradio UI",
    githubUrl: "https://github.com/Ahmedbakr78",
    featured: true
  },
  {
    id: "5",
    title: "5-A Nevai Search Engine",
    category: "AI & ML",
    description: "Privacy-focused AI-powered multi-source search engine (SPA) with enterprise-grade security, Chrome extension and RESTful API.",
    longDescription: "Zero-telemetry search platform and 5-Star-A task/project management ecosystem built to empower privacy-conscious power users. Implements advanced hybrid ranking algorithms and natural language understanding without storing query trails.",
    tags: ["Python", "JavaScript", "AI", "REST API", "Chrome Extension", "Privacy"],
    stars: 1,
    forks: 0,
    metrics: "Zero client data persistence • <180ms response time",
    architecture: "FastAPI REST Service -> BM25 + Semantic Hybrid Ranker -> Local IndexedDB Storage",
    githubUrl: "https://github.com/Ahmedbakr78/5-A-Nevai-Search-Engine",
    featured: true
  },
  {
    id: "6",
    title: "Secure Student Records Management System (SRMS)",
    category: "Security",
    description: "Database application enforcing five core database security models: RBAC, multilevel security, AES-256 encryption and inference control.",
    longDescription: "Enterprise academic database security system enforcing strict Role-Based Access Control (reducing unauthorized attempts by 95%), multilevel security clearance tiers, AES-256 cryptographic encryption at rest, and statistical inference control.",
    tags: ["Python", "Security", "RBAC", "AES-256", "Inference Control", "SQL"],
    stars: 1,
    forks: 1,
    metrics: "5 Core Security Models • 95% reduction in unauthorized access vectors",
    architecture: "Auth Gate -> RBAC Policy Engine -> Multilevel Security Filter -> AES-256 Encrypted Storage",
    githubUrl: "https://github.com/Ahmedbakr78/Data-Security-Secure-Student-Records-Management-System-SRMS-",
    featured: true
  },
  {
    id: "7",
    title: "Spotify Trends Visualization",
    category: "Big Data",
    description: "Unified full-stack ecosystem for streaming analytics: API orchestration, ETL pipeline, data warehousing, interactive dashboards and AI integration.",
    longDescription: "Features automated ETL pipelines that refresh streaming analytics continuously, warehousing transformed records into high-performance columnar storage with trend prediction and music recommendation algorithms.",
    tags: ["TypeScript", "Python", "Data Engineering", "AI", "Spotify API", "Dashboards"],
    stars: 1,
    forks: 1,
    metrics: "Over 200,000 track metrics parsed daily • 12 visual analytical charts",
    architecture: "Spotify Web API -> Python ETL Worker -> DuckDB Warehouse -> Interactive Analytics UI",
    githubUrl: "https://github.com/Ahmedbakr78/data-visualization-SpotifyTrends",
    featured: true
  },
  {
    id: "8",
    title: "House Price Prediction & Customer Segmentation",
    category: "AI & ML",
    description: "Dual ML workflows: regression with advanced preprocessing and state-of-the-art algorithms (XGBoost), plus unsupervised customer segmentation.",
    longDescription: "Implements two core analytical workflows: House price regression using feature engineering, outlier treatment, and XGBoost/ensemble regressors, paired with K-Means and hierarchical clustering for actionable customer segmentation.",
    tags: ["Jupyter", "XGBoost", "Python", "Scikit-Learn", "Regression", "Clustering"],
    stars: 1,
    forks: 1,
    metrics: "92% R-squared accuracy • Dual Supervised & Unsupervised Pipelines",
    architecture: "Raw Tabular Data -> Feature Engineering & Scaling -> XGBoost Regressor + K-Means Clustering",
    githubUrl: "https://github.com/Ahmedbakr78/House-Price-Prediction-Customer-Segmentation",
    featured: true
  },
  {
    id: "9",
    title: "Automated Multi-Modal X-Ray Fracture & Crack Reporting",
    category: "AI & ML",
    description: "Computer-vision medical system: detects and classifies bone fractures from X-ray images with automated clinical reporting.",
    longDescription: "Implements deep convolutional neural networks and transfer learning for bone fracture localization and severity classification, generating structured diagnostic reports from DICOM/radiograph inputs.",
    tags: ["Jupyter", "Computer Vision", "Healthcare", "PyTorch", "Deep Learning"],
    stars: 0,
    forks: 0,
    metrics: "91.8% classification sensitivity across 4 fracture categories",
    architecture: "DICOM Image Preprocessor -> ResNet-50 / YOLO Backbone -> Automated Clinical Report Generator",
    githubUrl: "https://github.com/Ahmedbakr78",
    featured: false
  },
  {
    id: "10",
    title: "GitHub Repository Mining — Advanced Data Mining",
    category: "Big Data",
    description: "Reproducible multi-stage data mining and NLP pipeline: repository data collection, preprocessing, feature engineering and association analysis.",
    longDescription: "Implements multi-threaded parallel processing for handling large-scale repository scraping, NLP readme profiling, and association rule mining to uncover software ecosystem patterns.",
    tags: ["Python", "Data Mining", "NLP", "Association Rules", "Parallel Processing"],
    stars: 0,
    forks: 0,
    metrics: "Parallel asynchronous workers parsing 500+ repos per batch",
    architecture: "GitHub GraphQL API -> Asyncio Worker Pool -> NLP Feature Engineering -> Association Analysis",
    githubUrl: "https://github.com/Ahmedbakr78",
    featured: false
  },
  {
    id: "11",
    title: "GitHub Ecosystem Mining App",
    category: "Data Engineering",
    description: "Web mining and repository data collection with data preprocessing, feature engineering and association rules in interactive notebooks.",
    longDescription: "Interactive data mining workbench for exploring open-source software ecosystems, language adoption trends, and dependency networks using Apriori/FP-Growth association rules.",
    tags: ["Jupyter", "Python", "Web Mining", "Feature Engineering", "Association Rules"],
    stars: 0,
    forks: 0,
    metrics: "End-to-end reproducible Jupyter mining workflow",
    architecture: "Web Scraper -> Preprocessing Pipeline -> FP-Growth Association Engine -> Visual Reports",
    githubUrl: "https://github.com/Ahmedbakr78",
    featured: false
  },
  {
    id: "12",
    title: "MR — Movie Analytics Dashboard (Cinematics)",
    category: "Data Engineering",
    description: "Web-based film-industry analytics platform: EDA, trend visualization, statistical modeling and box-office prediction.",
    longDescription: "Interactive notebooks and reporting dashboards uncovering budget-to-revenue ratios, genre longevity trends, and director influence factors utilizing multivariate regression and cluster analysis.",
    tags: ["Jupyter", "Analytics", "Python", "Visualization", "Statistical Modeling"],
    stars: 0,
    forks: 0,
    metrics: "Analysis of 45,000+ historical film entries across 100 years",
    architecture: "Raw Movie Data -> Scikit-learn Pipeline -> Seaborn / Plotly Dashboards",
    githubUrl: "https://github.com/Ahmedbakr78",
    featured: false
  },
  {
    id: "13",
    title: "5-A Student Management System",
    category: "Full-Stack",
    description: "AI-powered student management and search platform using FastAPI and React with predictive analytics.",
    longDescription: "Includes predictive analytics for student performance, automated early-warning alerts for struggling students, role-based dashboards for faculty and administrators, and grade calculation engines.",
    tags: ["TypeScript", "FastAPI", "React", "Python", "Predictive Analytics"],
    stars: 0,
    forks: 0,
    metrics: "Full academic record lifecycle • Automated predictive alerts",
    architecture: "React SPA -> FastAPI Asynchronous REST API -> SQLAlchemy ORM -> PostgreSQL DB",
    githubUrl: "https://github.com/Ahmedbakr78",
    featured: false
  },
  {
    id: "14",
    title: "Student Management System — Modular Architecture",
    category: "Full-Stack",
    description: "Engineered with distinct, measurable objectives to overcome common limitations in monolithic educational software.",
    longDescription: "Clean modular TypeScript architecture separating domain logic, academic scheduling, and student lifecycle microservices for maintainable enterprise deployments.",
    tags: ["TypeScript", "Modular Architecture", "Full-Stack", "Clean Architecture"],
    stars: 0,
    forks: 0,
    metrics: "Decoupled domain modules • Zero monolithic bottlenecks",
    architecture: "API Gateway -> Domain Service Modules -> Repository Pattern Data Layer",
    githubUrl: "https://github.com/Ahmedbakr78",
    featured: false
  },
  {
    id: "15",
    title: "Tour — Smart Tourism Platform",
    category: "Full-Stack",
    description: "Smart tourism platform — live tracking, real-time maps, multi-role dashboards and bilingual interface.",
    longDescription: "TypeScript-driven smart tourism application enabling real-time itinerary coordination, live GPS map telemetry, and multi-role coordination between travelers and local guides.",
    tags: ["TypeScript", "Real-Time Maps", "Bilingual UI", "Full-Stack"],
    stars: 0,
    forks: 0,
    metrics: "Real-time geospatial telemetry • Multi-role access",
    architecture: "TypeScript Client -> Geospatial Routing Service -> Real-Time Map Renderer",
    githubUrl: "https://github.com/Ahmedbakr78",
    featured: false
  },
  {
    id: "16",
    title: "Blockchain-Powered Voting System",
    category: "Security",
    description: "Decentralized voting with graphical interface, cryptographic security for voter anonymity and background data auditing.",
    longDescription: "Smart contract-based voting mechanics designed to eliminate single-point-of-failure tampering. Voter credentials are protected using cryptographic hashing and automated background ledger auditing.",
    tags: ["Python", "Blockchain", "Security", "Cryptography", "Smart Contracts"],
    stars: 0,
    forks: 0,
    metrics: "100% auditable ledger • Cryptographic voter anonymity",
    architecture: "Cryptographic Node Network -> Merkle Tree Verification -> Consensus Auditing Engine",
    githubUrl: "https://github.com/Ahmedbakr78",
    featured: false
  },
  {
    id: "17",
    title: "University Exam Management System (Oracle)",
    category: "Database",
    description: "Multi-user Oracle PL/SQL solution with strict separation of duties, robust business logic, exam scheduling, enrollment, grading and reporting.",
    longDescription: "Handles complex exam scheduling, hall assignments, invigilator allocations, grade processing, and automated result auditing with strict ACID constraints, triggers, and stored procedures.",
    tags: ["Oracle", "PL/SQL", "Database", "ACID", "Stored Procedures"],
    stars: 0,
    forks: 0,
    metrics: "Zero collision in 10,000+ exam seating allocations",
    architecture: "Oracle Database Engine -> PL/SQL Stored Procedures -> ACID Transaction Layer",
    githubUrl: "https://github.com/Ahmedbakr78",
    featured: false
  },
  {
    id: "18",
    title: "Heros PDF & Heros Markdown Studios",
    category: "Heros Suite",
    description: "Chromium (MV3) local-first studios: PDF annotation, merge, split & watermark studio + Markdown studio with offline KaTeX math, Mermaid diagrams & RTL.",
    longDescription: "Part of the 6-extension Heros Browser Suite (v2.2.0). Free, private, unlimited, and 100% local execution inside the browser with zero external telemetry.",
    tags: ["Chromium MV3", "TypeScript", "PDF Studio", "KaTeX", "Mermaid", "100% Local"],
    stars: 1,
    forks: 0,
    metrics: "100% Local Execution • Zero Telemetry • Offline KaTeX & Mermaid",
    architecture: "Chromium MV3 Service Worker -> Local FileSystem & Canvas Pipeline -> Zero-Latency Studio UI",
    githubUrl: "https://github.com/Ahmedbakr78/Heros_Suite",
    featured: true
  },
  {
    id: "19",
    title: "Heros NoteBook (Pyodide WASM) & Heros Todo",
    category: "Heros Suite",
    description: ".ipynb notebook viewer with a real in-browser Python runner via Pyodide WebAssembly, paired with a Markdown, PDF & LaTeX workspace task studio.",
    longDescription: "Executes real Python data science code (.ipynb notebooks) directly inside the browser tab via Pyodide WebAssembly without requiring a backend kernel, alongside Heros Todo for workspace management.",
    tags: ["Pyodide WASM", "Python in Browser", "Jupyter .ipynb", "LaTeX", "Chromium MV3"],
    stars: 1,
    forks: 0,
    metrics: "In-Browser Python WASM Runtime • Zero Server Dependency",
    architecture: ".ipynb Parser -> Pyodide WebAssembly Runtime -> Sandboxed Browser Execution",
    githubUrl: "https://github.com/Ahmedbakr78/Heros_Suite",
    featured: true
  },
  {
    id: "20",
    title: "Heros Player & markClipper Photo Lab",
    category: "Heros Suite",
    description: "Unified remote control for YouTube Music, YouTube & Spotify tabs + Web clipper and Photo Lab converting articles, selections & galleries to Markdown.",
    longDescription: "Completes the 6-extension Heros Browser Suite with cross-tab media transport orchestration and instant DOM-to-Markdown clipping with integrated Photo Lab processing.",
    tags: ["Chromium MV3", "Media Remote", "Web Clipper", "Markdown", "Photo Lab"],
    stars: 1,
    forks: 0,
    metrics: "6 Extensions in 1 Design Language • v2.2.0 Store Ready",
    architecture: "Cross-Tab Message Bus -> Media Session Controller & DOM Markdown Serializer",
    githubUrl: "https://github.com/Ahmedbakr78/Heros_Suite",
    featured: false
  },
  {
    id: "21",
    title: "ASL Hand Sign Recognition Ensemble",
    category: "AI & ML",
    description: "ASL hand sign recognition with MediaPipe and a TensorFlow model ensemble for real-time webcam inference.",
    longDescription: "Real-time American Sign Language alphabet and gesture recognition pipeline combining MediaPipe 21-point hand landmark extraction with a TensorFlow classification ensemble.",
    tags: ["MediaPipe", "TensorFlow", "Computer Vision", "Jupyter", "Real-Time Inference"],
    stars: 0,
    forks: 0,
    metrics: "Real-time 30+ FPS webcam hand landmark inference",
    architecture: "Webcam Frame Stream -> MediaPipe Hand Landmarks -> TensorFlow Ensemble Classifier",
    githubUrl: "https://github.com/Ahmedbakr78",
    featured: false
  },
  {
    id: "22",
    title: "Nevai Translate & 25-Bridge Matrix Federation",
    category: "Full-Stack",
    description: "Federated messaging bridge hub over Matrix C-S API connecting 25 platforms with media relay, presence sync, and privacy-first neural translation.",
    longDescription: "Core infrastructure under @Nevai-Org delivering 25 bidirectional messaging bridges over the Matrix Client-Server API with unified decentralized identity and end-to-end privacy.",
    tags: ["Matrix Protocol", "Federation", "TypeScript", "Decentralized Identity", "Nevai-Org"],
    stars: 1,
    forks: 0,
    metrics: "25 Messaging Platform Bridges • Matrix C-S API Sync",
    architecture: "Open Protocol + Governance -> 25 Matrix Platform Bridges -> Presence & Read-State Relay",
    githubUrl: "https://github.com/Nevai-Org",
    featured: true
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-01",
    title: "Google AI Professional Certificate",
    issuer: "Google",
    date: "October 2026",
    credentialId: "IGMH7QR80YHY",
    skills: ["Generative AI", "LLMs", "Deep Learning", "Google Cloud AI", "Prompt Engineering"],
    category: "AI & ML",
    featured: true
  },
  {
    id: "cert-02",
    title: "Google Business Intelligence Professional Certificate",
    issuer: "Google",
    date: "October 2026",
    credentialId: "N8QX9PQGBLLA",
    skills: ["Business Intelligence", "Data Modeling", "BigQuery", "Looker", "Data Dashboards"],
    category: "Data & BI",
    featured: true
  },
  {
    id: "cert-03",
    title: "DevOps Essentials",
    issuer: "Coursera",
    date: "October 2026",
    credentialId: "Credly Badge Verified",
    skills: ["CI/CD", "Docker", "DevOps Pipelines", "Infrastructure as Code"],
    category: "Big Data & Cloud",
    featured: true
  },
  {
    id: "cert-04",
    title: "Data Analysis and Business Applications",
    issuer: "Microsoft",
    date: "October 2026",
    credentialId: "72JPM2VXM9K1",
    skills: ["Data Analysis", "Excel Modeling", "Power BI", "Business Analytics"],
    category: "Data & BI",
    featured: true
  },
  {
    id: "cert-05",
    title: "Decisions, Decisions: Dashboards and Reports",
    issuer: "Google",
    date: "October 2026",
    credentialId: "DVBC01MW0A31",
    skills: ["Executive Reporting", "KPI Architecture", "Data Storytelling"],
    category: "Data & BI",
    featured: false
  },
  {
    id: "cert-06",
    title: "MLOps | Machine Learning Operations Specialization",
    issuer: "Duke University",
    date: "September 2026",
    credentialId: "FFI6MAZIV65Z",
    skills: ["MLflow", "Model Serving", "Data Drift", "CI/CD for ML", "Hugging Face"],
    category: "AI & ML",
    featured: true
  },
  {
    id: "cert-07",
    title: "Microsoft AI & ML Engineering (5-Course Specialization)",
    issuer: "Microsoft",
    date: "September 2026",
    credentialId: "BJQ4SWD8YQK9",
    skills: ["Azure Machine Learning", "Neural Networks", "Cognitive Services", "PyTorch"],
    category: "AI & ML",
    featured: true
  },
  {
    id: "cert-08",
    title: "Microsoft Azure for AI and Machine Learning",
    issuer: "Microsoft",
    date: "August 2026",
    credentialId: "A2GT06ZA9HT1",
    skills: ["Azure AI Services", "ML Studio", "Cloud Compute", "Model Deployment"],
    category: "Big Data & Cloud",
    featured: false
  },
  {
    id: "cert-09",
    title: "Building Intelligent Troubleshooting Agents",
    issuer: "Microsoft",
    date: "August 2026",
    credentialId: "PWFE4IDXYSK9",
    skills: ["Agentic AI", "Autonomous Troubleshooting", "Diagnostic Workflows"],
    category: "AI & ML",
    featured: false
  },
  {
    id: "cert-10",
    title: "AI and Machine Learning Algorithms and Techniques",
    issuer: "Microsoft",
    date: "May 2026",
    credentialId: "0M7Z3K64OUNF",
    skills: ["Supervised Learning", "Unsupervised Learning", "Dimensionality Reduction", "PCA"],
    category: "AI & ML",
    featured: false
  },
  {
    id: "cert-11",
    title: "AI for App Building",
    issuer: "Google",
    date: "April 2026",
    credentialId: "U8E7368DA8XU",
    skills: ["AI Application Architecture", "API Integration", "Model Orchestration"],
    category: "AI & ML",
    featured: false
  },
  {
    id: "cert-12",
    title: "AI for Data Analysis",
    issuer: "Google",
    date: "April 2026",
    credentialId: "TLVWLHHW2Z9N",
    skills: ["Statistical Modeling", "Automated Insights", "Data Transformation"],
    category: "Data & BI",
    featured: false
  },
  {
    id: "cert-13",
    title: "AI for Research and Insights",
    issuer: "Google",
    date: "April 2026",
    credentialId: "RLF4RHVGKJ1J",
    skills: ["Semantic Synthesis", "Document Intelligence", "Research Methods"],
    category: "AI & ML",
    featured: false
  },
  {
    id: "cert-14",
    title: "AI for Brainstorming and Planning",
    issuer: "Google",
    date: "April 2026",
    credentialId: "IG37T6W6GPQC",
    skills: ["Prompt Strategies", "Workflow Automation", "Ideation Frameworks"],
    category: "AI & ML",
    featured: false
  },
  {
    id: "cert-15",
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    date: "April 2026",
    credentialId: "D4VSBRUIW4VJ",
    skills: ["Python", "Pandas", "NumPy", "Jupyter", "REST APIs"],
    category: "Software Engineering",
    featured: true
  },
  {
    id: "cert-16",
    title: "Python Project for Data Engineering",
    issuer: "IBM",
    date: "April 2026",
    credentialId: "3KRLRT6X4RAF",
    skills: ["ETL Pipelines", "Data Ingestion", "Data Validation", "Python Web Scraping"],
    category: "Data & BI",
    featured: true
  },
  {
    id: "cert-17",
    title: "AWS AI Practitioner Challenge",
    issuer: "Udacity",
    date: "April 2026 - May 2036",
    credentialId: "a49190f6-303d-11f1-ba94-e7c940fb3e00",
    skills: ["AWS Bedrock", "SageMaker", "AWS Lambda", "Cloud AI Solutions"],
    category: "Big Data & Cloud",
    featured: true
  },
  {
    id: "cert-18",
    title: "Software Engineering",
    issuer: "Saylor University",
    date: "May 2026",
    credentialId: "8716016030AA",
    skills: ["Software Architecture", "Design Patterns", "Agile", "Testing"],
    category: "Software Engineering",
    featured: false
  },
  {
    id: "cert-19",
    title: "Blockchain Scalability and Distributed Systems",
    issuer: "University of Sydney",
    date: "April 2026",
    credentialId: "DRNBXOMTLDO6",
    skills: ["Consensus Algorithms", "Distributed Ledgers", "Sharding", "Cryptographic Protocols"],
    category: "Security & Governance",
    featured: true
  },
  {
    id: "cert-20",
    title: "Google AI",
    issuer: "Google",
    date: "April 2026",
    credentialId: "RYT0XQOE8XL2",
    skills: ["Foundations of AI", "Gemini Ecosystem", "Deep Learning"],
    category: "AI & ML",
    featured: false
  },
  {
    id: "cert-21",
    title: "AI Ethics, Responsible Use, and Creativity",
    issuer: "University of Michigan",
    date: "April 2026",
    credentialId: "VE6A7LOPL0AU",
    skills: ["Responsible AI", "Bias Mitigation", "Data Privacy", "Ethical Governance"],
    category: "Security & Governance",
    featured: false
  },
  {
    id: "cert-22",
    title: "Data Management and Analysis",
    issuer: "UNICEF",
    date: "March 2026",
    credentialId: "81OwuZVpOa",
    skills: ["Humanitarian Data", "Data Quality Assurance", "Emergency Response Analytics"],
    category: "Global & UN",
    featured: true
  },
  {
    id: "cert-23",
    title: "AI and Digital Transformation in Government",
    issuer: "University of Oxford",
    date: "March 2026",
    credentialId: "ca1ewxyi_1773548025382",
    skills: ["Digital Transformation", "Public Sector AI", "Governance", "Inclusive Design"],
    category: "Global & UN",
    featured: true
  },
  {
    id: "cert-24",
    title: "Software Engineering Simulation",
    issuer: "JPMorganChase",
    date: "March 2026",
    credentialId: "93HxuqhjCFujnEfSX",
    skills: ["Kafka Integration", "H2 Database", "Spring Framework", "REST APIs", "Message Queuing"],
    category: "Software Engineering",
    featured: true
  },
  {
    id: "cert-25",
    title: "Project Management Training",
    issuer: "INJAZ Egypt (PMI Content)",
    date: "February 2026",
    credentialId: "PMI-INJAZ-2026",
    skills: ["Project Lifecycle", "Scope Management", "Agile Execution"],
    category: "Security & Governance",
    featured: false
  },
  {
    id: "cert-26",
    title: "Small Business Management (Grade: 94%)",
    issuer: "Saylor University",
    date: "January 2026",
    credentialId: "4307406504AA",
    skills: ["Business Models", "Financial Operations", "Digital Strategy"],
    category: "Security & Governance",
    featured: false
  },
  {
    id: "cert-27",
    title: "Master AI with Gemini Google",
    issuer: "Google",
    date: "December 2025",
    credentialId: "OA-2025-1225002109428",
    skills: ["Gemini Pro", "Multimodal Prompts", "Research Automation"],
    category: "AI & ML",
    featured: false
  },
  {
    id: "cert-28",
    title: "Responsible Prompting for Business",
    issuer: "Founderz",
    date: "December 2025",
    credentialId: "OA-2025-1225002109362",
    skills: ["Prompt Engineering", "Enterprise AI Workflows"],
    category: "AI & ML",
    featured: false
  },
  {
    id: "cert-29",
    title: "Storytelling for Digital Marketing",
    issuer: "University of Chicago",
    date: "December 2025",
    credentialId: "OA-2025-1225002109361",
    skills: ["Data Storytelling", "Audience Engagement", "Marketing Strategy"],
    category: "Data & BI",
    featured: false
  },
  {
    id: "cert-30",
    title: "Master Digital PR",
    issuer: "Semrush",
    date: "December 2025",
    credentialId: "8a6c971ee4",
    skills: ["Brand Visibility", "Digital PR", "Audience Outreach"],
    category: "Data & BI",
    featured: false
  },
  {
    id: "cert-31",
    title: "Master Brand Voice Workshop",
    issuer: "Semrush",
    date: "December 2025",
    credentialId: "47201aed24",
    skills: ["Brand Strategy", "Content Architecture", "Tone Design"],
    category: "Data & BI",
    featured: false
  },
  {
    id: "cert-32",
    title: "Learning Microsoft 365 Copilot",
    issuer: "LinkedIn",
    date: "December 2025",
    credentialId: "0b9843b92cbf6ca9c76b496a9ab16f6a",
    skills: ["Copilot", "Office Automation", "Data Analysis"],
    category: "Data & BI",
    featured: false
  },
  {
    id: "cert-33",
    title: "Cisco Operating Systems Basics",
    issuer: "Cisco",
    date: "December 2025",
    credentialId: "78fd4151-e1e8-4e1f-af7d-b80ecaa66455",
    skills: ["Systems Engineering", "Linux Kernel", "OS Architecture"],
    category: "Software Engineering",
    featured: false
  },
  {
    id: "cert-34",
    title: "LLMOps: Real-World Applications with LLMs",
    issuer: "Udacity",
    date: "December 2025",
    credentialId: "UDACITY-LLMOPS-2025",
    skills: ["LLMOps", "Hugging Face", "LangChain", "Vector Indexing"],
    category: "AI & ML",
    featured: true
  },
  {
    id: "cert-35",
    title: "Databases Microsoft SQL Server Specialization",
    issuer: "Arab Bank",
    date: "December 2025",
    credentialId: "af76cff36c064b17a4bcbec65010b5ef",
    skills: ["T-SQL", "Subqueries", "Database Design", "Table Partitioning", "Data Integrity"],
    category: "Big Data & Cloud",
    featured: true
  },
  {
    id: "cert-36",
    title: "Artificial Intelligence and Machine Learning",
    issuer: "Route Academy",
    date: "December 2025",
    credentialId: "ROUTE-TOP-PERFORMER-2025",
    skills: ["NLP for Clinical Data", "Python", "Deep Learning", "Supervised Learning"],
    category: "AI & ML",
    featured: true
  },
  {
    id: "cert-37",
    title: "AI for Social Professionals",
    issuer: "VIVES University of Applied Sciences",
    date: "October 2025",
    credentialId: "ga49gur",
    skills: ["Social Impact Technologist", "AI in Healthcare", "Ethics"],
    category: "Global & UN",
    featured: false
  },
  {
    id: "cert-38",
    title: "Measuring What Matters: Learning Competencies",
    issuer: "University of Melbourne",
    date: "October 2025",
    credentialId: "71kwh66",
    skills: ["Self-Directed Learning", "Complexity Analysis", "Educational Assessment"],
    category: "Global & UN",
    featured: false
  },
  {
    id: "cert-39",
    title: "Strategic Communication & Teamwork",
    issuer: "IE University",
    date: "October 2025",
    credentialId: "OA-2025-102900189521",
    skills: ["Digital Skills for Work", "Team Leadership", "Strategic Planning"],
    category: "Security & Governance",
    featured: false
  },
  {
    id: "cert-40",
    title: "Microsoft Office 365 Specialist",
    issuer: "Microsoft",
    date: "October 2025",
    credentialId: "aa8392a85dd14fea8a73f05f80e92e7e",
    skills: ["Data Management", "Data Analyst", "Spreadsheet Modeling"],
    category: "Data & BI",
    featured: false
  },
  {
    id: "cert-41",
    title: "Research Methods: Peer & Community Research",
    issuer: "King's College London",
    date: "October 2025",
    credentialId: "vaffn6j",
    skills: ["Research Ethics", "Qualitative Analysis", "Peer Research"],
    category: "Global & UN",
    featured: false
  },
  {
    id: "cert-42",
    title: "Hugging Face Projects",
    issuer: "Simplilearn",
    date: "October 2025",
    credentialId: "95502911761007775436",
    skills: ["Hugging Face Transformers", "Fine-Tuning", "Model Hub"],
    category: "AI & ML",
    featured: true
  },
  {
    id: "cert-43",
    title: "Python for Data Science",
    issuer: "Cognitive Class (IBM)",
    date: "October 2025",
    credentialId: "ebd4b107604447fc9f439136fe68b350",
    skills: ["Python", "Data Wrangling", "Pandas", "Matplotlib"],
    category: "Software Engineering",
    featured: false
  },
  {
    id: "cert-44",
    title: "Understanding Embeddings for Natural Language Processing",
    issuer: "Hasso Plattner Institute",
    date: "October 2025",
    credentialId: "HPI-EMBED-2025",
    skills: ["Word Embeddings", "BoW", "TF-IDF", "Semantic Similarity", "Vector Math"],
    category: "AI & ML",
    featured: true
  },
  {
    id: "cert-45",
    title: "Parallel Programming",
    issuer: "Hasso Plattner Institute",
    date: "September 2025",
    credentialId: "HPI-PARALLEL-2025",
    skills: ["Parallel Computing", "Multi-Threading", "Concurrency", "Distributed Memory"],
    category: "Big Data & Cloud",
    featured: true
  },
  {
    id: "cert-46",
    title: "Google Analytics Certification",
    issuer: "Google Skillshop",
    date: "September 2025 - September 2026",
    credentialId: "0x294adad9e899a70d8b91ae9df6a7e98abe828c53a844fd05e96b07c0aceead14",
    skills: ["Google Analytics 4", "Event Tracking", "Funnel Analytics", "User Attribution"],
    category: "Data & BI",
    featured: true
  },
  {
    id: "cert-47",
    title: "SEO Essentials & Technical SEO Analyst",
    issuer: "Semrush",
    date: "September 2025 - September 2026",
    credentialId: "19c4fcb239",
    skills: ["Technical SEO", "Site Auditing", "Keyword Architecture", "Web Performance"],
    category: "Data & BI",
    featured: false
  },
  {
    id: "cert-48",
    title: "Building Climate Resilience Ecosystem Planning",
    issuer: "United Nations Environment Programme (UNEP)",
    date: "September 2025",
    credentialId: "BTQqyXsqIW",
    skills: ["Climate Resilience Data Analyst", "Ecosystem Adaptation", "GIS Modeling"],
    category: "Global & UN",
    featured: true
  },
  {
    id: "cert-49",
    title: "How to Prevent E-Waste",
    issuer: "UNITAR (United Nations)",
    date: "September 2025",
    credentialId: "z0FcVDC3qI",
    skills: ["Sustainable IT Analyst", "Circular Economy", "Green Data Centers"],
    category: "Global & UN",
    featured: false
  },
  {
    id: "cert-50",
    title: "Green Fiscal Policy",
    issuer: "UNITAR (United Nations)",
    date: "September 2025",
    credentialId: "5JxBZdgUMJ",
    skills: ["Green Finance Data Analyst", "Fiscal Modeling", "Carbon Economics"],
    category: "Global & UN",
    featured: false
  },
  {
    id: "cert-51",
    title: "Transboundary Air Pollution Regulation",
    issuer: "UNECE (United Nations)",
    date: "September 2025",
    credentialId: "s8IzS1exeY",
    skills: ["Regulatory Compliance IT Analyst", "Environmental Sensors Data"],
    category: "Global & UN",
    featured: false
  },
  {
    id: "cert-52",
    title: "Green Industrial Policy & Competitiveness",
    issuer: "UNITAR (United Nations)",
    date: "September 2025",
    credentialId: "svATektqdV",
    skills: ["Green Industrial Policy", "Sustainable Manufacturing", "Competitiveness Models"],
    category: "Global & UN",
    featured: false
  },
  {
    id: "cert-53",
    title: "Digital Program Planning Analyst",
    issuer: "United Nations",
    date: "September 2025",
    credentialId: "6KNHqLQOtf",
    skills: ["Digital Transformation", "Planning Analyst", "UN Sustainable Goals"],
    category: "Global & UN",
    featured: true
  },
  {
    id: "cert-54",
    title: "Climate Solutions Software Developer",
    issuer: "United Nations",
    date: "September 2025",
    credentialId: "6oZJNxHD6u",
    skills: ["Climate Software Solutions", "Green Architecture", "Environmental Data APIs"],
    category: "Global & UN",
    featured: true
  },
  {
    id: "cert-55",
    title: "Systems Engineering: Challenging Complexity",
    issuer: "The Open University",
    date: "September 2025",
    credentialId: "OU-SYSENG-2025",
    skills: ["Systems Engineering", "Distributed Architecture", "Complexity Theory"],
    category: "Software Engineering",
    featured: true
  },
  {
    id: "cert-56",
    title: "Amazon Aurora MySQL & Amazon RDS MySQL",
    issuer: "Amazon Web Services (AWS)",
    date: "September 2025",
    credentialId: "AWS-AURORA-2025",
    skills: ["Amazon Aurora", "Amazon RDS", "Read Replicas", "Database Scaling", "High Availability"],
    category: "Big Data & Cloud",
    featured: true
  },
  {
    id: "cert-57",
    title: "Huawei Big Data Associate (NTI)",
    issuer: "National Telecommunication Institute (NTI)",
    date: "September 2025",
    credentialId: "NTI-HUAWEI-BIGDATA",
    skills: ["Hadoop Ecosystem", "HDFS", "HBase", "Spark", "Hive", "Big Data Architecture"],
    category: "Big Data & Cloud",
    featured: true
  },
  {
    id: "cert-58",
    title: "Information Security Principles",
    issuer: "The Open University",
    date: "September 2025",
    credentialId: "OU-INFOSEC-2025",
    skills: ["Information Security", "Cryptographic Fundamentals", "Access Control"],
    category: "Security & Governance",
    featured: false
  },
  {
    id: "cert-59",
    title: "Machine Learning with Apache Spark",
    issuer: "Coursera / Databricks",
    date: "2026",
    credentialId: "SPARK-ML-2026",
    skills: ["Apache Spark", "Spark MLlib", "Distributed Feature Engineering", "Spark SQL"],
    category: "Big Data & Cloud",
    featured: true
  },
  {
    id: "cert-60",
    title: "Agentic AI with LangChain and LangGraph",
    issuer: "DeepLearning.AI",
    date: "2026",
    credentialId: "AGENTIC-AI-2026",
    skills: ["LangGraph", "LangChain", "Autonomous Agents", "Multi-Agent Systems"],
    category: "AI & ML",
    featured: true
  },
  {
    id: "cert-61",
    title: "Building Multimodal Generative AI Applications",
    issuer: "Coursera",
    date: "2026",
    credentialId: "MULTIMODAL-AI-2026",
    skills: ["Multimodal LLMs", "Vision-Language Models", "Audio Processing", "Embeddings"],
    category: "AI & ML",
    featured: true
  },
  {
    id: "cert-62",
    title: "Building RAG Applications: Get Started",
    issuer: "DeepLearning.AI",
    date: "2026",
    credentialId: "RAG-BUILDER-2026",
    skills: ["RAG Architecture", "Vector Retrieval", "Chunking Strategies", "Reranking"],
    category: "AI & ML",
    featured: true
  },
  {
    id: "cert-63",
    title: "Introduction to Big Data with Spark and Hadoop",
    issuer: "IBM",
    date: "2026",
    credentialId: "IBM-SPARK-HADOOP",
    skills: ["MapReduce", "HDFS", "Spark RDDs", "Distributed Processing"],
    category: "Big Data & Cloud",
    featured: false
  },
  {
    id: "cert-64",
    title: "Agentic AI with LangGraph, CrewAI, AutoGen, and BeeAI",
    issuer: "Advanced AI Specialization",
    date: "2026",
    credentialId: "AGENTIC-MULTI-2026",
    skills: ["CrewAI", "AutoGen", "BeeAI", "Collaborative Agent Swarms"],
    category: "AI & ML",
    featured: true
  },
  {
    id: "cert-65",
    title: "Vector Databases for RAG: An Introduction",
    issuer: "DeepLearning.AI",
    date: "2026",
    credentialId: "VECTOR-DB-2026",
    skills: ["Vector Indexing", "HNSW", "Cosine Similarity", "Pinecone", "ChromaDB"],
    category: "Big Data & Cloud",
    featured: false
  },
  {
    id: "cert-66",
    title: "MLOps Platforms: Amazon SageMaker and Azure ML",
    issuer: "Duke University",
    date: "2026",
    credentialId: "DUKE-MLOPS-PLATFORMS",
    skills: ["SageMaker Pipelines", "Azure ML Registry", "Model Monitoring"],
    category: "Big Data & Cloud",
    featured: true
  },
  {
    id: "cert-67",
    title: "DevOps, DataOps, MLOps",
    issuer: "Duke University",
    date: "2026",
    credentialId: "DUKE-DATAOPS-2026",
    skills: ["DataOps", "Data Quality Testing", "Automated Validation"],
    category: "Big Data & Cloud",
    featured: false
  },
  {
    id: "cert-68",
    title: "Python Essentials for MLOps",
    issuer: "Duke University",
    date: "2026",
    credentialId: "DUKE-PY-MLOPS",
    skills: ["CLI Tools", "Packaging", "FastAPI Serving", "Dockerization"],
    category: "Software Engineering",
    featured: false
  },
  {
    id: "cert-69",
    title: "The Path to Insights: Data Models and Pipelines",
    issuer: "Google",
    date: "2026",
    credentialId: "GOOGLE-DATAPATH-2026",
    skills: ["Data Modeling", "Star Schema", "Snowflake Schema", "Data Pipelines"],
    category: "Data & BI",
    featured: false
  },
  {
    id: "cert-70",
    title: "Deep Learning and Neural Networks with Keras",
    issuer: "IBM",
    date: "2026",
    credentialId: "IBM-KERAS-DL",
    skills: ["Neural Networks", "Keras", "TensorFlow", "Backpropagation"],
    category: "AI & ML",
    featured: false
  },
  {
    id: "cert-71",
    title: "Connect and Protect: Networks and Network Security",
    issuer: "Google",
    date: "2026",
    credentialId: "GOOGLE-NETSEC-2026",
    skills: ["Network Security", "TCP/IP", "Firewalls", "Intrusion Detection"],
    category: "Security & Governance",
    featured: false
  },
  {
    id: "cert-72",
    title: "AI Governance, Risk, and Executive Communication",
    issuer: "Vanderbilt / Coursera",
    date: "2026",
    credentialId: "AI-GOV-RISK-2026",
    skills: ["AI Risk Assessment", "EU AI Act Compliance", "Executive Briefings"],
    category: "Security & Governance",
    featured: true
  },
  {
    id: "cert-73",
    title: "Blockchain Scalability and Foundations",
    issuer: "University of Sydney",
    date: "2026",
    credentialId: "USYD-BLOCKCHAIN-2026",
    skills: ["Byzantine Fault Tolerance", "Scalable Protocols", "Zero Knowledge"],
    category: "Security & Governance",
    featured: false
  }
];

export const SKILL_CATEGORIES = [
  {
    domain: "Big Data & Distributed Systems",
    icon: "Database",
    skills: [
      { name: "Apache Spark", level: 95 },
      { name: "Apache Airflow", level: 92 },
      { name: "Apache Kafka", level: 90 },
      { name: "Hadoop / HDFS", level: 88 },
      { name: "ETL / ELT Pipelines", level: 96 },
      { name: "Real-time Streaming", level: 93 },
      { name: "Delta Lake / Parquet", level: 90 },
      { name: "Parallel Programming", level: 87 },
      { name: "Distributed Event Architectures", level: 91 }
    ]
  },
  {
    domain: "Cloud & Infrastructure",
    icon: "Cloud",
    skills: [
      { name: "Amazon Web Services (AWS)", level: 92 },
      { name: "Microsoft Azure", level: 90 },
      { name: "Docker Containers", level: 94 },
      { name: "Kubernetes (EKS / AKS)", level: 85 },
      { name: "Amazon SageMaker", level: 88 },
      { name: "Amazon Aurora MySQL", level: 91 },
      { name: "Amazon RDS", level: 92 },
      { name: "CI / CD Automation", level: 89 },
      { name: "Linux / Systems Engineering", level: 90 }
    ]
  },
  {
    domain: "AI, Machine Learning & NLP",
    icon: "Cpu",
    skills: [
      { name: "Natural Language Processing (NLP)", level: 94 },
      { name: "Large Language Models (LLMs)", level: 93 },
      { name: "LLMOps & MLOps", level: 90 },
      { name: "Retrieval-Augmented Generation (RAG)", level: 95 },
      { name: "LangChain & LangGraph", level: 89 },
      { name: "Hugging Face Transformers", level: 92 },
      { name: "Computer Vision (PyTorch)", level: 86 },
      { name: "Word Embeddings (BoW, TF-IDF)", level: 94 },
      { name: "Regression & Statistical Modeling", level: 92 },
      { name: "Agentic Autonomous Workflows", level: 88 }
    ]
  },
  {
    domain: "Databases, SQL & Warehousing",
    icon: "HardDrive",
    skills: [
      { name: "Microsoft SQL Server", level: 95 },
      { name: "Transact-SQL (T-SQL)", level: 96 },
      { name: "Oracle PL/SQL", level: 90 },
      { name: "Database Security & RBAC", level: 94 },
      { name: "AES-256 Encryption & Inference Control", level: 92 },
      { name: "Table Partitioning & Index Tuning", level: 93 },
      { name: "Data Warehousing (Star / Snowflake)", level: 91 },
      { name: "ACID Transaction Engineering", level: 92 }
    ]
  },
  {
    domain: "Languages & Frameworks",
    icon: "Code",
    skills: [
      { name: "Python", level: 98 },
      { name: "Java (Spring Boot / Kafka)", level: 88 },
      { name: "JavaScript / TypeScript", level: 90 },
      { name: "FastAPI / REST APIs", level: 92 },
      { name: "React", level: 90 },
      { name: "Shell Scripting (Bash)", level: 89 },
      { name: "C# / .NET", level: 82 }
    ]
  },
  {
    domain: "Analytics, BI & Governance",
    icon: "BarChart3",
    skills: [
      { name: "Data Mining & EDA", level: 94 },
      { name: "Google Analytics 4", level: 90 },
      { name: "Power BI & Looker Dashboards", level: 89 },
      { name: "Technical SEO & Web Performance", level: 88 },
      { name: "UN Climate & Sustainability Data", level: 91 },
      { name: "Research Ethics & Peer Methods", level: 92 },
      { name: "Strategic Communication & Team Leadership", level: 95 }
    ]
  }
];

export const ARTICLES: Article[] = [
  {
    id: "1",
    title: "Production-Grade Big Data Pipeline: Lessons from High-Throughput Ingestion",
    date: "October 2026",
    readTime: "6 min read",
    summary: "Architecting a fault-tolerant streaming pipeline with Spark Structured Streaming, Kafka, and Delta Lake with ACID transactional consistency.",
    content: "When designing data platforms that exceed millions of incoming events per minute, standard micro-batching can introduce bottlenecks. By decoupling the message ingestion buffer through multi-partition Kafka clusters and leveraging Apache Spark's watermarking for stateful streaming, we achieve sub-second end-to-end latency while guaranteeing exactly-once semantics through Delta Lake write-ahead logs.",
    tags: ["Big Data", "Spark", "Kafka", "Data Lakehouse"]
  },
  {
    id: "2",
    title: "MIZAN: Building Specialized Arabic Legal RAG Systems",
    date: "September 2026",
    readTime: "8 min read",
    summary: "Overcoming dialectal and morphological challenges in Arabic legal documents using custom tokenization and hybrid vector-keyword retrieval.",
    content: "Arabic morphology poses unique tokenization challenges for standard embedding models. In legal documents, small particle differences shift statutory rights completely. In project MIZAN, we paired custom morphological root tokenizers with hybrid dense-sparse vector retrievers (ChromaDB + BM25) to achieve 94% retrieval precision on complex statutory inquiries.",
    tags: ["NLP", "Arabic AI", "RAG", "Embeddings"]
  },
  {
    id: "3",
    title: "Privacy-First Decentralized Workspaces: The NEVAI Protocol",
    date: "August 2026",
    readTime: "7 min read",
    summary: "Designing in-browser vector search and peer-to-peer data synchronization without central authority dependency.",
    content: "Modern SaaS platforms lock enterprise intelligence inside proprietary silos. NEVAI was conceived as a sovereign office suite where data never leaves client boundaries unless explicitly shared over peer-to-peer WebSockets or WebRTC channels. In-browser client-side vector search and local SQLite enable full document synthesis at native speed without sending sensitive tokens to remote clouds.",
    tags: ["Decentralization", "WebRTC", "Privacy", "Architecture"]
  },
  {
    id: "4",
    title: "Multi-Layered Database Security: Mitigating Statistical Inference Attacks",
    date: "July 2026",
    readTime: "5 min read",
    summary: "Implementing RBAC, AES-256 field encryption, and inference query perturbation to eliminate data re-identification.",
    content: "Securing academic and financial records requires more than simply authenticating users. Attackers often execute overlapping aggregation queries to deduce sensitive individual records. By combining 5 security tiers, differential privacy perturbation, and strict Role-Based Access Control, we decreased unauthorized access and leakage vectors by over 95%.",
    tags: ["Security", "RBAC", "Cryptography", "SQL Server"]
  },
  {
    id: "5",
    title: "Automating Machine Learning: The Five-A Analytics Engine",
    date: "June 2026",
    readTime: "6 min read",
    summary: "From raw CSV to production-grade model selection in under 2 minutes: architecture of an autonomous tabular AutoML pipeline.",
    content: "AutoML often suffers from black-box opacity. Five-A Analytics was developed to balance speed with interpretability. The engine automatically conducts missing-value imputation, outlier detection, power transformations, cross-validates 8 distinct regression models, and generates natural-language explanations of feature importances.",
    tags: ["AutoML", "Python", "Data Science", "Scikit-Learn"]
  },
  {
    id: "6",
    title: "Real-Time Music Analytics with Spotify Web API and Streamlit",
    date: "May 2026",
    readTime: "5 min read",
    summary: "Constructing automated daily data ingestion jobs and dynamic trend visualizers for global listening patterns.",
    content: "Streaming platforms represent an endless firehose of cultural telemetry. By orchestrating daily cron extraction jobs against the Spotify Web API and loading audio analysis features into DuckDB columnar storage, we built real-time dashboards tracking acousticness, danceability, and viral velocity across genres.",
    tags: ["Data Engineering", "Streamlit", "Spotify API", "Analytics"]
  },
  {
    id: "7",
    title: "Cryptographic Anonymity in Distributed Voting Systems",
    date: "April 2026",
    readTime: "7 min read",
    summary: "Using Merkle trees and cryptographic blind signatures to maintain verifiable voter anonymity on an open ledger.",
    content: "Electronic voting has historically traded off anonymity for verifiability. Using cryptographic blind signatures and Merkle proof auditing, our blockchain voting architecture allows any participant to mathematically verify their ballot was tallied correctly in the public ledger without revealing who cast it.",
    tags: ["Blockchain", "Cryptography", "Security", "Consensus"]
  },
  {
    id: "8",
    title: "Deep Learning for Bone Fracture Detection in Medical Radiographs",
    date: "March 2026",
    readTime: "8 min read",
    summary: "Transfer learning workflows on DICOM radiographs achieving 91.8% sensitivity for clinical triage support.",
    content: "Radiologists in emergency centers face severe fatigue. We explored fine-tuning deep convolutional backbones on high-resolution X-ray datasets, utilizing CLAHE contrast enhancement and focal loss to address heavy class imbalances between hairline fractures and intact skeletal structures.",
    tags: ["Computer Vision", "Healthcare", "Deep Learning", "PyTorch"]
  },
  {
    id: "9",
    title: "Mining GitHub: What 100,000 Commits Reveal About Software Health",
    date: "February 2026",
    readTime: "6 min read",
    summary: "Parallel data extraction pipelines uncovering commit velocity, issue response times, and contributor retention.",
    content: "Open-source maintainers frequently struggle to measure project vitality. By parsing GitHub GraphQL telemetry using asynchronous worker pools, we analyzed commit density, PR merge duration, and bus factor risks across prominent repositories.",
    tags: ["Data Mining", "Asyncio", "Open Source", "Software Engineering"]
  },
  {
    id: "10",
    title: "High-Volume Examination Scheduling in Oracle PL/SQL",
    date: "January 2026",
    readTime: "5 min read",
    summary: "Guaranteed conflict-free university exam seating using ACID transaction locks and constraint solvers.",
    content: "Scheduling 10,000 students across 60 exam halls with faculty invigilators represents an NP-hard constraint satisfaction dilemma. Implementing deterministic stored procedures with row-level locks and transaction rollback safeguards ensured zero room or student double-bookings.",
    tags: ["PL/SQL", "Oracle", "Database Engineering", "ACID"]
  }
];

export const APP_FEATURES: AppFeature[] = [
  {
    id: "feat-1",
    title: "Ahmed Vibe 84-Sound Ambient Studio",
    category: "Audio & Focus Studio",
    description: "Mix 84 real-time procedural Web Audio API soundscapes across 8 categories (Nature, Rain, Urban, Places, Transport, Things, Noise) with zero external MP3 bloat.",
    icon: "Headphones",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-2",
    title: "Apple Dynamic Island Live Audio Bar",
    category: "Audio & Focus Studio",
    description: "Interactive top-bar Dynamic Island with live equalizer waveform, instant play/pause, master volume slider, and 1-tap preset switching.",
    icon: "Radio",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-3",
    title: "Big Data & Cloud Cluster Sizing Calculator",
    category: "Power Tools & Calculators",
    description: "Free interactive calculator for Apache Kafka partitions, Spark Structured Streaming executor cores/RAM, Delta Lake storage TB, and monthly cloud cost.",
    icon: "Calculator",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-4",
    title: "Live JSON to PySpark & Delta SQL Generator",
    category: "Power Tools & Calculators",
    description: "Paste any JSON event payload and instantly generate production-ready PySpark StructType code and Delta Lake SQL DDL schemas.",
    icon: "Code2",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-5",
    title: "Deep Focus Pomodoro + Vibe Audio Sync",
    category: "Power Tools & Calculators",
    description: "Built-in Pomodoro & Deep Work sprint timer (25m / 50m / Break) that automatically synchronizes with your Ahmed Vibe ambient audio mix.",
    icon: "Timer",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-6",
    title: "Executive Tech Spec & Markdown Scratchpad",
    category: "Power Tools & Calculators",
    description: "Local-first engineering scratchpad with Kimball Warehouse & RAG architecture templates, auto-saved to browser storage with 1-click .md export.",
    icon: "FileCode",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-7",
    title: "Interactive Big Data Pipeline Simulator",
    category: "Data Simulation",
    description: "Live interactive simulator showcasing Spark streaming, Kafka queues, and Airflow orchestration with real-time throughput metrics and chaos testing.",
    icon: "Activity",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-8",
    title: "SQL Query Playground & Sandbox",
    category: "Data Simulation",
    description: "Execute simulated T-SQL & Spark SQL queries against distributed analytics datasets right in your browser with immediate query plans.",
    icon: "Terminal",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-9",
    title: "Autonomous 3D Flowing Lines Engine",
    category: "3D & Graphics",
    description: "High-precision Three.js 3D geodesic & constellation geometry running at 60 FPS autonomously with zero cursor interference.",
    icon: "Boxes",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-10",
    title: "5-Preset 3D Shader Customizer",
    category: "3D & Graphics",
    description: "Switch live between 3D Flowing Wave, Architectural Line Tunnel, Wireframe Polyhedra, Horizon Contour Lines, or Zero-WebGL Power Saver.",
    icon: "Sparkles",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-11",
    title: "3D Tilt & Spring Elevation Project Cards",
    category: "3D & Graphics",
    description: "Interactive 3D perspective tilt with mouse-tracking radial spotlight glare and spring physics across all 22 flagship repositories.",
    icon: "Layers",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-12",
    title: "Studio Portrait Algebraic Color Grader",
    category: "3D & Graphics",
    description: "Real-time HTML5 Canvas portrait processor with 5 color grades (Studio, Natural, Warm, Mono, 3D Avatar) and zero-halo background unmixing.",
    icon: "Camera",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-13",
    title: "73 Verified Certifications Explorer",
    category: "Search & Filters",
    description: "Browse, filter, and verify all 73 certifications across Oxford, Google, Microsoft, AWS, IBM, and UN with 1-click credential ID copying.",
    icon: "Award",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-14",
    title: "100-Skill Interactive Matrix & Radar",
    category: "Search & Filters",
    description: "Explore 100+ technical competencies across 6 engineering domains with live search, category filtering, and proficiency telemetry.",
    icon: "Sliders",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-15",
    title: "Command Palette & Instant Search (⌘K)",
    category: "Search & Filters",
    description: "Global keyboard-driven command center indexing all 24 features, 22 projects, 73 certifications, and 10 engineering articles in milliseconds.",
    icon: "Search",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-16",
    title: "22 Flagship Repositories & Heros Suite",
    category: "Search & Filters",
    description: "Deep architectural blueprints, metrics, and tech tags for 22 production systems including the 6-extension Heros MV3 Browser Suite.",
    icon: "Cpu",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-17",
    title: "Dual Monochrome Theme (Onyx Dark & White)",
    category: "Controls & Themes",
    description: "Instant switch between high-contrast Onyx Black mode and pristine Minimal White mode with persistent local preference storage.",
    icon: "SunMoon",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-18",
    title: "Low-Transparency Crisp Liquid Glass UI",
    category: "Controls & Themes",
    description: "High-opacity, ultra-legible liquid glass windows and modals that keep text razor-sharp while letting the 3D background remain visible.",
    icon: "Layout",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-19",
    title: "ATS-Optimized Printable PDF Resume",
    category: "Controls & Themes",
    description: "One-click generation of a clean, recruiter-ready print and PDF curriculum vitae of Ahmed Abo Bakr's experience and credentials.",
    icon: "FileText",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-20",
    title: "Silent Smooth Navigation Mode",
    category: "Controls & Themes",
    description: "Optional instant zero-motion navigation mode in the Control Center for distraction-free reading and accessibility.",
    icon: "Zap",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-21",
    title: "Floating Rounded Mobile Slidebar Drawer",
    category: "Accessibility & Mobile",
    description: "Rounded floating mobile control drawer with integrated Vibe audio mini-deck, 2x2 Power Suite launcher, and 1-tap section pills.",
    icon: "Smartphone",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-22",
    title: "Scroll-Reactive Top Bar & Bottom Dock",
    category: "Accessibility & Mobile",
    description: "Smart pill navigation that automatically collapses text labels on scroll and at the page bottom while expanding smoothly on hover.",
    icon: "Maximize2",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-23",
    title: "10 Deep-Dive Engineering Articles Reader",
    category: "Search & Filters",
    description: "Full interactive reader for 10 architectural whitepapers covering Spark watermarking, Arabic Legal RAG (MIZAN), and RBAC encryption.",
    icon: "BookOpen",
    isUnlimited: true,
    status: "Active"
  },
  {
    id: "feat-24",
    title: "Direct Collaboration & vCard (.vcf) Export",
    category: "Accessibility & Mobile",
    description: "Download electronic business card (.vcf), copy verified contact details with instant confirmation, or dispatch a direct project inquiry.",
    icon: "Mail",
    isUnlimited: true,
    status: "Active"
  }
];


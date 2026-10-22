export const links = {
  email: "minhpham181004@gmail.com",
  github: "https://github.com/minhpham1810",
  linkedin: "https://www.linkedin.com/in/khoaminhpham18/",
  resume: "https://drive.google.com/file/d/1aR_fpbziSthGFP3z1JPHv-GsRbCeaYDS/view?usp=sharing",
  allPrs: "https://github.com/pulls?q=is%3Apr+author%3Aminhpham1810",
};

type Contribution = {
  status: "merged" | "open" | "closed";
  project: string;
  summary: string;
  pr: string;
  url: string;
};

// PR statuses checked October 22, 2026
export const openSource: Contribution[] = [
  {
    status: "merged",
    project: "Apache Sedona",
    summary:
      "Added support for Zstandard-compressed NetCDF4 raster data, including an HDF5 filter provider, regression fixture, and pixel-value checks.",
    pr: "#3379",
    url: "https://github.com/apache/sedona/pull/3379",
  },
  {
    status: "merged",
    project: "Apache Sedona",
    summary:
      "Aligned polygon orientation predicates with PostGIS semantics for nested geometry collections and non-polygonal inputs; added null-handling coverage across execution engines.",
    pr: "#3292",
    url: "https://github.com/apache/sedona/pull/3292",
  },
  {
    status: "merged",
    project: "Apache Sedona",
    summary:
      "Preserved explicit no-CRS metadata for locally constructed GeoSeries and GeoDataFrames, avoiding unnecessary distributed SRID discovery.",
    pr: "#3279",
    url: "https://github.com/apache/sedona/pull/3279",
  },
  {
    status: "merged",
    project: "Apache Sedona",
    summary:
      "Documented how to deploy and use Sedona R on AWS EMR, covering bootstrap installation, Spark connections, and JAR configuration.",
    pr: "#3334",
    url: "https://github.com/apache/sedona/pull/3334",
  },
  {
    status: "merged",
    project: "GA4GH Tool Registry Service",
    summary:
      "Corrected the OpenAPI bearer authentication scheme so API documentation and generated clients use native HTTP bearer authentication.",
    pr: "#280",
    url: "https://github.com/ga4gh/tool-registry-service-schemas/pull/280",
  },
  {
    status: "merged",
    project: "Harbor Satellite",
    summary:
      "Added a Go Report Card badge to make the project's Go code quality report accessible from its README.",
    pr: "#328",
    url: "https://github.com/container-registry/harbor-satellite/pull/328",
  },
  {
    status: "open",
    project: "MaterialX",
    summary:
      "Implemented node grouping that preserves internal and external connections, moved the operation into a reusable core API, and added tests plus a Shift+C editor shortcut.",
    pr: "#3002",
    url: "https://github.com/AcademySoftwareFoundation/MaterialX/pull/3002",
  },
  {
    status: "open",
    project: "FOSSASIA PSLab Python",
    summary:
      "Added an in-memory connection handler and a mock mode for ScienceLab so development and initialization tests can run without physical hardware.",
    pr: "#274",
    url: "https://github.com/fossasia/pslab-python/pull/274",
  },
  {
    status: "closed",
    project: "ELIXIR Cloud FOCA",
    summary:
      "Proposed normalizing MongoDB environment variables, adding access-control startup logs, modernizing resource loading, and extending tests. Closed without merging.",
    pr: "#256",
    url: "https://github.com/elixir-cloud-aai/foca/pull/256",
  },
  {
    status: "closed",
    project: "ELIXIR Cloud FOCA",
    summary:
      "Proposed complete MONGO_URI configuration with precedence checks, access-control setup logs, deprecation cleanup, documentation, and tests. Closed without merging.",
    pr: "#257",
    url: "https://github.com/elixir-cloud-aai/foca/pull/257",
  },
  {
    status: "closed",
    project: "Apache Sedona",
    summary:
      "Proposed filtering a known degenerate-collision stack trace to prevent straight-skeleton operations from flooding executor logs. Closed without merging.",
    pr: "#3280",
    url: "https://github.com/apache/sedona/pull/3280",
  },
  {
    status: "closed",
    project: "Harbor Satellite",
    summary:
      "Proposed centralizing password policy enforcement in the hashing function, with typed errors and updated handlers and tests. Closed without merging.",
    pr: "#331",
    url: "https://github.com/container-registry/harbor-satellite/pull/331",
  },
];

export const experience = [
  {
    role: "Open Source Contributor",
    org: "Apache Sedona",
    place: "Remote",
    dates: "Aug 2026 – Present",
    points: [
      "Contributed 4 merged pull requests to an open-source distributed geospatial engine, resolving crashes when reading affected compressed NetCDF4 datasets from Amazon S3.",
      "Optimized metadata lookup performance by storing coordinate systems at object construction, eliminating distributed Spark aggregation for local Python objects; verified zero Spark jobs with 8 new tests.",
      "Worked with maintainers through code review to align Java polygon checks with PostGIS, preserve null-input handling, and add regression tests across 4 modules.",
    ],
  },
  {
    role: "Data Science Student Fellow",
    org: "Dominguez Center for Data Science, Bucknell University",
    place: "Lewisburg, PA",
    dates: "Aug 2026 – Present",
    points: [
      "Working on A Kingdom of Names, a data mining project exploring the Holinshed Chronicles.",
    ],
  },
  {
    role: "Student Software Developer, KALMUS Research",
    org: "Bucknell University",
    place: "Lewisburg, PA",
    dates: "Oct 2025 – Present",
    points: [
      "Build asynchronous film-analysis workflows with two student developers and a faculty mentor; 10+ students and researchers have analyzed 50+ films on a high-performance computing cluster using SLURM.",
      "Implemented concurrent batch uploads for multi-gigabyte films, reducing batch upload time by an estimated 30%; reused completed results to avoid redundant computation.",
    ],
  },
  {
    role: "Interactive Developer Intern",
    org: "JPL Integrated Communications",
    place: "Harrisburg, PA",
    dates: "Jun 2026 – Aug 2026",
    points: [
      "Developed a networked Electron desktop application for macOS and Windows with synchronized video playback across devices, and added CMS and blog features to WordPress/PHP client sites.",
      "Owned the Node.js/Express backend on a three-person team, building real-time WebSocket messaging to synchronize controllers and projectors for an exhibit now installed on site.",
      "Built a WordPress-to-local content pipeline with caching, scheduled refreshes, and staged updates with rollback, enabling the exhibit to run fully offline from cached content.",
    ],
  },
  {
    role: "Student Software Developer, Institutional Research & Analytics",
    org: "Bucknell University",
    place: "Lewisburg, PA",
    dates: "Oct 2025 – May 2026",
    points: [
      "Built LangChain retrieval over ChromaDB and SQLite-backed conversation memory on a three-person team, grounding cited chatbot answers in a 491-page catalog and 17 policy documents.",
      "Implemented concurrent AI model calls and document searches with Python asyncio in FastAPI backend services; streamed partial responses through server-sent events so users could read before generation finished.",
    ],
  },
  {
    role: "Software Engineering Intern, Client Engagement",
    org: "Parker Dewey",
    place: "Lewisburg, PA",
    dates: "Feb 2026 – Apr 2026",
    points: [
      "Delivered a cybersecurity assessment platform as sole developer, working with the founder and a faculty mentor to build RESTful APIs, authentication, Stripe billing, and asynchronous AI reports.",
      "Implemented tenant-scoped data authorization with PostgreSQL queries and AES-256-GCM field encryption; mapped 5 security domains to 0–100 readiness scores and 4 risk tiers.",
    ],
  },
  {
    role: "Full Stack Developer (Contract)",
    org: "Daylily AI",
    place: "Remote",
    dates: "Aug 2025 – Nov 2025",
    points: [
      "Built Shopify applications using Liquid, TypeScript, and Shopify APIs, working across implementation, integration, deployment, and optimization.",
    ],
  },
  {
    role: "Computer Science Teaching Assistant",
    org: "Bucknell University",
    place: "Lewisburg, PA",
    dates: "Jan 2024 – Dec 2025",
    points: [
      "Helped students debug Python code, understand programming concepts, and improve their approach to projects in courses covering data structures, algorithms, and software design.",
    ],
  },
  {
    role: "Undergraduate Student Researcher",
    org: "Bucknell University",
    place: "Lewisburg, PA",
    dates: "Oct 2024 – May 2025",
    points: [
      "Developed an sEMG controller prototype with other students, exploring optimal sensor count and placement for hand gesture recognition in XR.",
      "Built Python data workflows for cleaning, organizing, and analyzing faculty research datasets.",
    ],
  },
];

export const toolkit = [
  { label: "Languages", items: "TypeScript, JavaScript, Python, Java, Go, C, C++, SQL" },
  { label: "Applications", items: "React, Next.js, Expo / React Native, Electron, FastAPI, Node.js, Express, Spring Boot" },
  { label: "AI and data", items: "LangChain, RAG, tool-calling agents, PyTorch, ChromaDB, PostgreSQL, MongoDB, Redis, SQLite, Spark" },
  { label: "Infrastructure", items: "Git, Docker, GitHub Actions, Linux, AWS, HPC / SLURM, WebSockets" },
];

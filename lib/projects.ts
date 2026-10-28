import thuocTracker from "@/content/projects/thuoctracker";
import freshnessTracker from "@/content/projects/freshness-tracker";
import kalmusWeb from "@/content/projects/kalmus-web";
import oiraChatbot from "@/content/projects/oira-chatbot";
import spotOn from "@/content/projects/SpotOn";
import unissh from "@/content/projects/unissh";
import feelBit from "@/content/projects/FeelBit";
import secureAuth from "@/content/projects/secure-auth";
import ecommerceMl from "@/content/projects/ecommerce-ml";
import architectureOfSleep from "@/content/projects/architecture-of-sleep";

type Entry = {
  slug: string;
  content: string;
  tags: string[];
  note?: string;
  // Thumbnails live in public/assets/thumbs/<slug>.jpg (960×600). Projects without
  // one show `tile` text on a dark panel instead.
  tile?: string;
  coursework?: boolean;
};

// Order here is the order on the home page and the prev/next order on case studies.
const entries: Entry[] = [
  { slug: "kalmus-web", content: kalmusWeb, tags: ["Next.js", "Python", "SLURM"] },
  { slug: "oira-chatbot", content: oiraChatbot, tags: ["FastAPI", "LangChain", "ChromaDB"] },
  {
    slug: "thuoctracker",
    content: thuocTracker,
    tags: ["Next.js", "FastAPI", "Raspberry Pi"],
    note: "HackPSU Fall 2026",
  },
  {
    slug: "freshness-tracker",
    content: freshnessTracker,
    tags: ["FastAPI", "Expo", "ESP32"],
    note: "Best First Hack · SASEhack 2026",
  },
  { slug: "spoton", content: spotOn, tags: ["React", "Node.js", "Groq"] },
  { slug: "feelbit", content: feelBit, tags: ["Spring Boot", "React", "PostgreSQL"] },
  { slug: "unissh", content: unissh, tags: ["Go", "SSH / SFTP"], tile: "$ unissh push" },
  { slug: "secure-auth", content: secureAuth, tags: ["C", "OpenSSL"], coursework: true, tile: "AES-256-CBC · HKDF · RSA" },
  { slug: "ecommerce-ml", content: ecommerceMl, tags: ["Python", "XGBoost"], coursework: true, tile: "ROC-AUC 0.831" },
  { slug: "architecture-of-sleep", content: architectureOfSleep, tags: ["R", "ggplot2"], coursework: true },
];

// Title and summary come from the markdown itself: the "# " line and the "### " line.
const lineAfter = (content: string, prefix: string) =>
  content.split("\n").find((line) => line.startsWith(prefix))?.slice(prefix.length) ?? "";

export const projects = entries.map((entry) => ({
  ...entry,
  title: lineAfter(entry.content, "# "),
  summary: lineAfter(entry.content, "### "),
}));

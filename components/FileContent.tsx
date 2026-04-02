"use client";

import MarkdownPreview from "./MarkdownPreview";
import PDFPreview from "./PDFPreview";

interface FileContentProps {
  filename: string;
  previewMode?: "code" | "preview" | "split";
  onFileClick?: (file: string) => void;
}

export default function FileContent({
  filename,
  previewMode = "code",
  onFileClick,
}: FileContentProps) {
  const getContent = (file: string) => {
    switch (file) {
      case "README.md":
        return `# Welcome to Minh's Portfolio 👋
### You are probably thinking: "Why the heck did I end up in fricking VS Code???" 
Oh, and before you start thinking this is some weird coding matrix glitch—nope, just me flexing my nerdy side.

If you’re here, you’ve already taken the first step into my digital lair. Think of this as my "workspace," where every tab is a story, every file a snippet of my journey, and every bug... well, let’s pretend they don’t exist.

Feel free to open up any folder, dig through whatever it shows, or even peek into the terminal (coming soon!).

Remember, if you see any red squiggles, it’s just a friendly reminder that perfection is overrated.

So go ahead, click around, and let’s debug the world together!

And by the way, I'm **Minh Pham**, a passionate developer who loves building amazing things. Nice to meet you!

## About This Site

This portfolio mimics the VS Code interface to showcase my work in a unique way. Feel free to explore the different sections using the sidebar!

## Quick Links

- 📝 [About Me](about.md)
- 💼 [Experience](experience.md)
- 🚀 [Projects](projects/)
- 🛠️ [Skills](skills.md)
- 📧 [Contact](contact.md)

---

> "Code is like humor. When you have to explain it, it's bad." – Cory House`;

      case "about.md":
        return `# About Me
Hello! I'm Minh Pham, a software developer with a passion for building things that are both useful and well-crafted.
![My picture](IMG_7714.JPEG|30%)
## Education
**Bucknell University** — B.S. in Computer Science, Data Science Co-Major
*Aug 2023 – May 2027 | Lewisburg, PA*
- GPA: 3.39 | Dean's Scholarship | Dean's List
- Relevant Coursework: Data Structures & Algorithms, Software Engineering & Design, Applied Machine Learning, Computer Systems

## Background
- 🏠 Origin: Hai Phong, Vietnam
- 📍 Location: Lewisburg, PA
- 🌐 Languages: Vietnamese, English, Mandarin

## Interests
- Full-Stack Web Development
- Machine Learning & AI
- Open Source Contribution
- Human-Computer Interaction

## Philosophy
I believe in writing clean, maintainable code and creating user experiences that delight and inspire.

---
Feel free to reach out if you'd like to collaborate on a project or just chat about technology!`;

      case "skills.md":
        return `# Skills & Technologies

## Programming Languages

\`\`\`typescript
const languages = [
  'Python', 'TypeScript', 'JavaScript',
  'Java', 'C', 'SQL', 'HTML/CSS', 'Go'
];
\`\`\`

## Frameworks & Libraries

- **Frontend**: React, Next.js, Tailwind CSS, Three.js
- **Backend**: FastAPI, Node.js, LangChain
- **ML/AI**: PyTorch, scikit-learn
- **Job Scheduling**: SLURM

## Tools & Platforms

- **Cloud**: AWS (S3, EC2, Elastic Beanstalk, Aurora)
- **DevOps**: Docker, GitHub Actions, NGINX
- **Databases**: SQLite, MongoDB, ChromaDB
- **Auth**: Clerk (Google OAuth)
- **Other**: Arduino IDE, Git

## Currently Learning

- Advanced RAG architectures
- System design & distributed systems
- UI/UX design principles

## Soft Skills

- Problem Solving
- Team Collaboration & Code Review
- Technical Communication
- Continuous Learning`;

      case "contact.md":
        return `# Get In Touch

I'd love to hear from you! Whether you have a question, want to collaborate on a project, or just want to say hi, feel free to reach out.

## Contact Information

- 📧 Email: minhpham181004@gmail.com
- 💼 LinkedIn: [Minh Pham](https://www.linkedin.com/in/khoaminhpham18/)
- 🐱 GitHub: [@minhpham1810](https://github.com/minhpham1810)


---

Looking forward to connecting with you!`;

      case "portfolio-website.md":
        return `# Project 1: Portfolio Website (This one)
A modern portfolio website built with Next.js, styled to mimic the familiar VS Code interface—because where better to showcase code than our favorite editor? It features markdown support with live code view, preview, and simultaneous split view for the best browsing experience.
## Links
- [Live Demo](https://minhpham1810-github-enq3gkl56-minhpham1810s-projects.vercel.app/)
- [GitHub Repository](https://github.com/minhpham1810/minhpham1810.github.io)
## Features
- 🎨 VS Code themed UI
- ⚡ Fast and responsive
- 🎯 Easy to navigate
## Technologies
- Next.js
- TypeScript
- Tailwind CSS

`;

      case "SpotOn.md":
        return `# SpotOn: AI-powered Music Discovery App

### Discover music that truly resonates—before you even hit play.

SpotOn is a full-stack web app that combines Spotify’s vast music catalog with AI to bring you smarter, mood-driven song recommendations. Whether you're crafting the perfect playlist or exploring new genres, SpotOn helps you connect with music on a deeper level.
## Links
- [Live Demo](https://spot-on-six.vercel.app/)
- [GitHub Repository](https://github.com/minhpham1810/SpotOn)
## Key Features
- 🔐 Spotify Login: Personalize your experience with secure Spotify authentication.
- 🔎 Smart Song Search: Find songs instantly with real-time Spotify API integration.
- 📄 Detailed Song Info: View metadata like album, artist, genre, credits, and cover art.
- 💾 Save to Library: Add your favorite tracks directly to your Spotify collection.
- 🤖 AI Summaries: Google Gemini powers unique song descriptions based on themes and moods.
- 🧭 Smooth Navigation: Intuitive React Router flow for effortless browsing.
## Technologies
- Frontend: React.js, React Router, Tailwind CSS
- Backend: Node.js with secure token management, API routing, and AI integration
- Deployment: Docker containerized app running on AWS Elastic Beanstalk (migrated to Vercel because I'm broke) with GitHub Actions CI/CD
- APIs: Spotify Web API and Google Gemini AI API for personalized music insights
`;

      case "FeelBit.md":
        return `# FeelBit – Your Daily Mood Companion
FeelBit is a thoughtful mood-tracking app designed to help users explore and understand their emotions better. By combining quick mood logging with personal journaling, it empowers users to reflect on their mental well-being and spot emotional patterns.
## Links
- [GitHub Repository](https://github.com/minhpham1810/FeelBit)
## Key Features
- 😊 Track Your Mood: Select an emoji from 1 to 5 that matches how you feel each day.
- 🔍 Identify Triggers: Pick from common life factors like school, work, or relationships that might affect your mood.
- 📝 Express Yourself: Write personal journal entries to capture thoughts and feelings in your own words.
## Technologies
- Frontend: JavaFX
- Backend: Java, MongoDB
- Deployment: Build and run locally using Gradle
- APIs: Google Gemini API
`;

      case "experience.md":
        return `# Experience

## Software Developer — Academic Chatbot
**Bucknell University** | Lewisburg, PA | *Oct 2025 – Present*
- Developed a full-stack academic catalogue chatbot using a Next.js (TypeScript, Tailwind) frontend and FastAPI (RESTful) backend, enabling real-time, citation-based answers for course and program information.
- Implemented secure authentication with Clerk (Google OAuth) to manage user accounts and protect session history, feedback, and analytics features.
- Engineered a Retrieval-Augmented Generation (RAG) pipeline with LangChain, ChromaDB and OpenAI API, ensuring all responses are grounded in official catalogue PDFs and URLs.
- Built a UUID-based session architecture with SQLite for persistent chat history, feedback tracking, and analytics.
- Exposed feedback endpoints and instrumentation hooks to track user sentiment, model fallback cases, and retrieval quality.

## Frontend Developer — KALMUS Movie Barcode Generator
**Bucknell University** | Lewisburg, PA | *Oct 2025 – Present*
- Built a Next.js frontend (React, TypeScript, Tailwind) enabling video upload, configuration, and visualization (Plotly.js) of KALMUS movie color barcodes executed on the university's HPC cluster.
- Implemented job monitoring with queueing, submitting, status states, and error handling by integrating with internal API endpoints connected to SLURM.
- Created reusable components (upload, config panel, barcode display) and added client-side validation and loading states for a smooth long-running workflow.

## Full Stack Developer (Contractor)
**Daylily Software Inc.** | Remote | *Aug 2025 – Nov 2025*
- Built 3 Shopify storefronts using Liquid (HTML/CSS), JavaScript/TypeScript, and Storefront/Admin APIs.
- Delivered custom theme features including dynamic product filtering, cart logic, and storefront customization scoped directly with clients.
- Tested and iterated on each module based on client feedback in a fast-paced contract environment.

## Undergraduate Researcher
**Bucknell University** | Lewisburg, PA | *Oct 2024 – May 2025*
- Engineered a surface electromyography (sEMG) controller prototype for amputees using Myoware sensors and Arduino to control a virtual limb in AR.
- Trained a real-time hand gesture classifier in PyTorch, applying time-domain feature extraction for embedded deployment.
- Conducted validation experiments evaluating sensor placement, gesture accuracy, and latency for real-time prosthetic control.

## Computer Science Teaching Assistant
**Bucknell University** | Lewisburg, PA | *Jan 2024 – Present*
- Supported CSCI203 (Intro to CS) and CSCI204 (Data Structures), helping 20+ students with Python and core data structures.
- Led weekly study groups and drop-in help sessions, focusing on OOP concepts and algorithmic problem solving.
- Assisted instructors in grading programming assignments and delivering detailed feedback to support student learning.`;

      case "ecommerce-ml.md":
        return `# E-Commerce Review Quality Prediction
A data analytics and machine learning pipeline to identify low-quality customer reviews using behavioral, temporal, and text-derived features.
## Links
- [GitHub Repository](https://github.com/minhpham1810/csci349_2025fa_final_project)
## Key Features
- 📊 End-to-end data pipeline: cleaning, feature engineering, and model evaluation
- 🤖 Trained and compared Logistic Regression, Random Forest, and XGBoost classifiers
- 📈 Achieved ROC-AUC of 0.831 on held-out test data
- 🔍 Applied text-derived features alongside behavioral and temporal signals
## Technologies
- Languages: Python
- Libraries: scikit-learn, pandas, NumPy, Matplotlib
- Models: Logistic Regression, Random Forest, XGBoost
`;

      case "resume.pdf":
        return "PDF_FILE"; // Special marker for PDF files

      default:
        return "# File not found\n\nThe requested file does not exist.";
    }
  };

  const content = getContent(filename);

  // Handle PDF files
  if (content === "PDF_FILE") {
    const googleDriveUrl =
      "https://drive.google.com/file/d/1QSsVxVJhaRG4e9JTLWfmaey2veORUwJd/view?usp=drive_link";
    return <PDFPreview googleDriveUrl={googleDriveUrl} />;
  }

  const lines = content.split("\n");

  // Render code view
  const renderCodeView = () => (
    <div className="p-4 font-mono text-sm">
      <div className="flex">
        {/* Line numbers */}
        <div className="pr-4 text-vscode-textMuted select-none">
          {lines.map((_, index) => (
            <div key={index} className="text-right">
              {index + 1}
            </div>
          ))}
        </div>
        {/* Content */}
        <div className="flex-1">
          <pre className="whitespace-pre-wrap break-words">
            {lines.map((line, index) => {
              // Simple markdown-like highlighting
              let processedLine = line;

              // Headers
              if (line.startsWith("# ")) {
                return (
                  <div
                    key={index}
                    className="text-blue-400 font-bold text-xl mb-2"
                  >
                    {line.slice(2)}
                  </div>
                );
              }
              if (line.startsWith("## ")) {
                return (
                  <div
                    key={index}
                    className="text-blue-300 font-bold text-lg mb-2"
                  >
                    {line.slice(3)}
                  </div>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <div key={index} className="text-blue-200 font-bold mb-1">
                    {line.slice(4)}
                  </div>
                );
              }

              // Lists
              if (line.startsWith("- ") || line.startsWith("* ")) {
                return (
                  <div key={index} className="text-green-400">
                    {line}
                  </div>
                );
              }

              // Links
              if (line.includes("[") && line.includes("]")) {
                return (
                  <div key={index} className="text-blue-400">
                    {line}
                  </div>
                );
              }

              // Code blocks
              if (line.startsWith("```")) {
                return (
                  <div key={index} className="text-yellow-400">
                    {line}
                  </div>
                );
              }

              // Quotes
              if (line.startsWith("> ")) {
                return (
                  <div
                    key={index}
                    className="text-gray-400 italic border-l-2 border-gray-600 pl-2"
                  >
                    {line.slice(2)}
                  </div>
                );
              }

              // Bold text
              if (line.includes("**")) {
                return (
                  <div key={index} className="text-yellow-300">
                    {line}
                  </div>
                );
              }

              // Default
              return (
                <div key={index} className={line === "" ? "h-5" : ""}>
                  {line || " "}
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </div>
  );

  // Render based on preview mode
  if (previewMode === "preview") {
    return <MarkdownPreview content={content} onFileClick={onFileClick} />;
  } else if (previewMode === "split") {
    return (
      <div className="flex h-full">
        <div className="flex-1 border-r border-vscode-border overflow-auto">
          {renderCodeView()}
        </div>
        <div className="flex-1 overflow-auto bg-vscode-bg">
          <MarkdownPreview content={content} onFileClick={onFileClick} />
        </div>
      </div>
    );
  }

  // Default: code view - return renderCodeView()
  return renderCodeView();
}

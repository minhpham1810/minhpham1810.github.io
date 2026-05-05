const content = `# KALMUS Web — Film Color Analysis Platform

### Bringing computational film color analysis to the browser, powered by HPC.

KALMUS Web is a full-stack web application built around the KALMUS Python toolkit for quantitative color analysis of films. Users upload video files through the browser, the server submits processing jobs to a SLURM-managed HPC cluster, and interactive color barcodes and statistics are rendered back in real time—no local processing required.

## Links
- [GitHub Repository](https://github.com/minhpham1810/kalmus_web)
- [Live Website](https://kalmus.bucknell.edu/) (currently restricted to Bucknell University's network)

## Demo
![video](kalmus_demo.mp4)

## Key Features
- 📤 Chunked Upload: Large video files are uploaded in parallel chunks for reliability and speed.
- 🎨 Color Barcodes: Generates film color barcodes and associated statistics using the KALMUS pipeline.
- 📊 Interactive Visualizations: Hue/light scatter plots, RGB cubes, histograms, and 3D bar plots rendered with Plotly.js.
- ⚙️ HPC Integration: Automated SLURM job submission offloads all heavy computation to university compute nodes.
- 🔄 Live Job Tracking: Real-time status updates (pending → running → completed/failed) polled from the frontend.
- 🎬 Metadata Enrichment: Automatic movie metadata lookup and caching via the OMDb API.
- 🔐 Institutional Auth: Header-based authentication compatible with Shibboleth and CAS for campus use.
- 🗂️ File-Based Output: Each job folder stores all inputs and outputs (metadata.json, barcode.json, summary.json, barcode.png)—no database required.

## Technologies
- Frontend: Next.js (React, TypeScript), Tailwind CSS, Plotly.js
- Backend: Next.js API Routes (Node.js), Python 3 with KALMUS library
- Job Scheduling: SLURM Workload Manager
- Storage: Shared NFS filesystem bridging web server and compute nodes
- APIs: OMDb (movie metadata)

## Architecture
User uploads video → Next.js API stitches chunks and generates SLURM batch scripts → Compute node runs KALMUS Python pipeline → Results saved to shared NFS → Frontend polls job status and renders interactive plots.
`;

export default content;

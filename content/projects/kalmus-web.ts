const content = `# KALMUS Web

### A browser interface for film-color analysis running on university HPC infrastructure.

## Context

KALMUS is a Python toolkit for quantitative film-color analysis. Its compute-heavy workflow was difficult to access without local setup and familiarity with the underlying scripts.

## My role

Built with a three-person team under a faculty mentor. My work includes the web interface and the product workflow around upload, configuration, job submission, status, results, and failure states, plus interactive visualizations, synchronized side-by-side comparisons, and barcode downloads for screens or high-resolution printing.

## System

The browser uploads large video files in chunks. Next.js API routes assemble the upload and generate a SLURM batch script. A compute node runs the Python analysis, then writes metadata, summaries, color barcodes, and visualization data to shared NFS storage. The frontend polls job state and renders the completed outputs with Plotly.js.

## Engineering decisions

- Upload videos in four concurrent requests with 5–25 MB chunks, cutting batch upload time by an estimated 30% while allowing individual request recovery.
- Model the long-running workflow explicitly as pending, running, completed, and failed states.
- Store each job's inputs and outputs together on the shared filesystem instead of adding a database that the workflow did not require.
- Keep institutional authentication compatible with the university's Shibboleth and CAS headers.
- Support searchable film-edition metadata, with duplicate checks that distinguish different editions of the same film.

## Demo

![video](kalmus_demo.mp4)

## Stack

Next.js, React, TypeScript, Tailwind CSS, Plotly.js, Node.js API routes, Python, KALMUS, SLURM, shared NFS storage, and the OMDb API.

## Links

- [View the repository](https://github.com/minhpham1810/kalmus_web)
- [Open the Bucknell deployment](https://kalmus.bucknell.edu/) — restricted to the university network`;

export default content;

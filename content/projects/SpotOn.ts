const content = `# SpotOn

### Music discovery with cited AI research, sample tracing, and audio matching.

## Context

Spotify is effective at retrieving music, but catalog metadata alone does not explain a song's emotional and sonic fingerprint, credits, or cultural context. SpotOn combines real-time catalog search with sourced AI research in one product flow.

## What I built

The React and TypeScript client handles Spotify PKCE OAuth, real-time song search, detail views, and a local playlist. Server-side API handlers keep research credentials and third-party orchestration out of the browser; the same handlers run on Vercel or in a containerized Node.js server.

The tool-calling agent researches songs through Spotify, Genius, and live web search, using Gemini by default through an OpenAI-compatible API. It streams progress and cited reports through server-sent events, labels findings as verified, inferred, or speculative, and caches completed research in Upstash Redis.

Song reports can be shared as generated report cards, using the native share sheet where available and a PNG download as the fallback.

The sample family tree follows Genius sampling relationships. A Python matcher compares available 30-second previews using fingerprints designed to tolerate pitch and tempo changes, with an A/B player for confirmed matches. A held-out evaluation confirmed 4 of 30 linked pairs and falsely confirmed 0 of 60 unrelated pairs; a miss can reflect either a matcher limitation or a sample outside the preview.

## Deployment and operations

Production remains on Vercel. I also built Docker packaging, Kubernetes deployment exercises, and a Terraform-managed Cloud Run demo environment with GitHub Actions delivery using short-lived credentials. The repository includes load tests, structured request logs, alerts, Trivy vulnerability scanning, and a documented rollback drill that restored traffic after a failed release check. The Cloud Run service is brought up for demos rather than kept running continuously.

## Engineering decisions

- Use PKCE for browser Spotify login and keep research service credentials on the server.
- Separate Spotify catalog facts from sourced AI research, and label each finding as verified, inferred, or speculative.
- Stream long-running research progress through SSE and cache completed reports in Redis.
- Run containers as a non-root user with a read-only filesystem, smoke-test releases, and scan images in CI.
- Bound fresh-research spending with shared rate limits that refuse new runs if the limiter is unavailable.
- Move the deployment from AWS Elastic Beanstalk to Vercel while preserving the application flow.

## Demo

![video](spoton_demo.mp4)

## Stack

React, TypeScript, Vite, Node.js, Python, Gemini, Spotify Web API, Genius, Tavily, Vercel, Redis, Docker, Kubernetes, Terraform, Google Cloud Run, and GitHub Actions.

## Links

- [Open the live product](https://spot-on-six.vercel.app/)
- [Read the matcher evaluation](https://github.com/minhpham1810/SpotOn/blob/master/matcher/eval/RESULTS.md)
- [Read the operations runbook](https://github.com/minhpham1810/SpotOn/blob/master/docs/ops/runbook.md)
- [View the repository](https://github.com/minhpham1810/SpotOn)`;

export default content;

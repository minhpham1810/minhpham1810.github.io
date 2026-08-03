const content = `# SpotOn

### AI music research with sourced context and direct-to-account playlist saving.

## Context

Spotify is effective at retrieving music, but catalog metadata alone does not explain a song's emotional and sonic fingerprint, credits, or cultural context. SpotOn combines real-time catalog search with sourced AI research in one product flow.

## What I built

The React and TypeScript client handles Spotify OAuth, real-time song search, detail views, and direct-to-account playlist saving. A Node.js backend keeps credentials, Spotify API requests, and Groq-powered research orchestration out of the browser.

The tool-calling agent can run up to six research rounds and two live web searches per report. It streams progress through server-sent events and caches completed research in Upstash Redis.

## Engineering decisions

- Keep OAuth tokens and third-party API orchestration behind the backend boundary.
- Separate Spotify catalog facts from sourced AI research in the product experience.
- Stream long-running research progress through SSE and cache completed reports in Redis.
- Containerize the application and automate delivery with GitHub Actions.
- Move the deployment from AWS Elastic Beanstalk to Vercel while preserving the application flow.

## Demo

![video](spoton_demo.mp4)

## Stack

React, TypeScript, Node.js, Groq, Spotify Web API, Vercel, Upstash Redis, Docker, and GitHub Actions.

## Links

- [Open the live product](https://spot-on-six.vercel.app/)
- [View the repository](https://github.com/minhpham1810/SpotOn)`;

export default content;

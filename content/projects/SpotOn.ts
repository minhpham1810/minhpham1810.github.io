const content = `# SpotOn

### Music discovery that adds context before asking for another play.

## Context

Spotify is effective at retrieving music, but catalog metadata alone does not explain why a song might fit a mood or moment. SpotOn connects search, saved music, and generated context in one product flow.

## What I built

The React client handles Spotify authentication, real-time song search, detail views, and saved-library actions. A Node.js backend manages tokens, Spotify API requests, and Gemini calls so credentials and model orchestration stay out of the browser.

Gemini produces short descriptions based on available song themes and mood context. The generated layer supplements Spotify's catalog data rather than replacing it.

## Engineering decisions

- Keep OAuth tokens and third-party API orchestration behind the backend boundary.
- Separate catalog facts from generated descriptions in the product experience.
- Containerize the application and automate delivery with GitHub Actions.
- Move the deployment from AWS Elastic Beanstalk to Vercel while preserving the application flow.

## Demo

![video](spoton_demo.mp4)

## Stack

React, React Router, Tailwind CSS, Node.js, Docker, GitHub Actions, Spotify Web API, and Google Gemini API.

## Links

- [Open the live product](https://spot-on-six.vercel.app/)
- [View the repository](https://github.com/minhpham1810/SpotOn)`;

export default content;

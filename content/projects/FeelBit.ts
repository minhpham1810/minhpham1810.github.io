const content = `# FeelBit

### Mood tracking and reflection, built as a JavaFX desktop app and rewritten for the web.

## Product

FeelBit lets a user record a daily mood, associate it with common triggers, and add a private journal entry. Mood analytics surface patterns over time, while cached Gemini-powered wellness suggestions provide optional support for reflection.

## What I built

FeelBit was developed with a four-person Scrum team as a desktop application using JavaFX, MongoDB, and the Gemini API. I then rebuilt it for the web as a React client and Spring Boot API backed by PostgreSQL and Flyway migrations, with a Docker Compose setup that runs the system consistently across environments.

## Engineering focus

- Model mood, trigger, journal, and analytics data behind a Spring Boot service boundary
- Use one-hour JWT access tokens and rotating seven-day refresh tokens stored as SHA-256 hashes
- Protect credentials with BCrypt and automatically restore authenticated sessions
- Cache AI-powered wellness suggestions to reduce repeated model work

## Stack

Java, Spring Boot, React, PostgreSQL, Flyway, Docker Compose, JWT, BCrypt, and Google Gemini API. The original desktop version uses JavaFX and MongoDB.

## Repository

- [View FeelBit on GitHub](https://github.com/minhpham1810/feelbit)
- [View the web rewrite branch](https://github.com/minhpham1810/feelbit/tree/spring-react)
`;

export default content;

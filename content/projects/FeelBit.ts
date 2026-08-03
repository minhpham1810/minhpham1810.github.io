const content = `# FeelBit

### A containerized full-stack mood platform for private reflection and trend tracking.

## Product

FeelBit lets a user record a daily mood, associate it with common triggers, and add a private journal entry. Mood analytics surface patterns over time, while cached Gemini-powered wellness suggestions provide optional support for reflection.

## What I built

I rebuilt the original JavaFX project as a React client and Spring Boot API backed by PostgreSQL and Flyway migrations. Docker packages the system consistently across environments.

## Engineering focus

- Model mood, trigger, journal, and analytics data behind a Spring Boot service boundary
- Use one-hour JWT access tokens and rotating seven-day refresh tokens stored as SHA-256 hashes
- Protect credentials with BCrypt and automatically restore authenticated sessions
- Cache AI-powered wellness suggestions to reduce repeated model work

## Stack

Java, Spring Boot, React, PostgreSQL, Flyway, Docker, JWT, BCrypt, and Google Gemini API.

## Repository

[View FeelBit on GitHub](https://github.com/minhpham1810/FeelBit)
`;

export default content;

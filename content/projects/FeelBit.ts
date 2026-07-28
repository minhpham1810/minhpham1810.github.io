const content = `# FeelBit

### A desktop mood journal built around quick logging and private reflection.

## Product

FeelBit lets a user record a daily mood, associate it with common triggers, and add a private journal entry. The history view brings those records together so patterns can be reviewed over time.

## What I built

The JavaFX interface handles the logging and history workflows. Java services persist entries in MongoDB, while a Gemini integration supports generated reflection prompts.

## Engineering focus

- Model mood, trigger, and journal data as one daily record
- Keep persistence separate from JavaFX view logic
- Build and package the application with Gradle
- Treat generated prompts as optional support for reflection

## Stack

Java, JavaFX, MongoDB, Gradle, and Google Gemini API.

## Repository

[View FeelBit on GitHub](https://github.com/minhpham1810/FeelBit)
`;

export default content;

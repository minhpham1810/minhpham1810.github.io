const content = `# Freshness Tracker

### A hardware-to-mobile food-waste prototype that estimates remaining freshness from measured temperature exposure.

> **SASEhack 2026:** Best First Hack award and Pitch Competition finalist recognition.

## Context

A printed date assumes food stayed cold the whole time. It does not know about the warm car ride home or a fridge that runs warm, so households either discard food that was fine or keep it too long. Freshness Tracker answers "how many days does this item have left?" from what actually happened to it.

Built with a four-person team.

## System

A BME688 sensor on an ESP32 reads temperature, humidity, and gas inside the fridge and uploads to ThingSpeak every minute. A FastAPI backend polls that channel and runs a Python freshness engine, and an Expo mobile app shows per-item days left, status, confidence, and alerts.

The engine integrates temperature into an effective-age budget with a Q10 rate multiplier relative to 4 °C, so time spent warm burns more shelf life. Gas anomalies and a manual label score are extra evidence that can only shorten an estimate, never extend it.

## Engineering decisions

- Route every telemetry source — HTTP, ThingSpeak, simulator, and CSV replay — through one ingest path, and recompute alerts from scratch on each change so they cannot drift.
- Fail visibly: stale data shows as disconnected, and out-of-range exposure withholds the estimate instead of guessing.
- Restrict the local tool-calling assistant to validated tools so every freshness number comes from the engine, not the model.
- Scan labels with a local vision model, then let the user review and edit every field before an item is created.
- Ship six scripted simulator scenarios and pytest suites for the engine, simulator, and API so the whole pipeline runs without a fridge.

## Limits

This is an experimental waste-reduction prototype. Its estimates have not been validated as food-safety measurements, several food profiles are still placeholders, and there is no authentication or multi-fridge support.

## Stack

Python, NumPy, SciPy, FastAPI, SQLite, Expo, React Native, TypeScript, Ollama, ESP32, BME688, ThingSpeak, and pytest.

## Links

- [Watch the demo](https://www.youtube.com/watch?v=7eOdVOMNjco)
- [View the Devpost submission](https://devpost.com/software/claudius-maximus)
- [View the repository](https://github.com/minhpham1810/food-tracker)`;

export default content;

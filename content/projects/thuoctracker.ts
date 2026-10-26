const content = `# ThuocTracker

### A connected medicine cabinet for patients, families, and doctors.

## Context

Built at HackPSU Fall 2026 with a four-person team. ThuocTracker connects medication reminders at a physical cabinet with dose history and alerts for a patient's care team, so using a smartphone is not the only way to keep track.

## My role

I built the Next.js doctor dashboard and cabinet touchscreen, including patient charts, medicine management, dose history, live alerts, and accessible cabinet controls. I also integrated Auth0 across the web, mobile app, and backend, working alongside teammates responsible for the backend and mobile app, Raspberry Pi runtime, and physical cabinet.

## System

A Raspberry Pi cabinet and touchscreen connect to a FastAPI backend backed by PostgreSQL. The Expo app gives patients, families, and doctors access to the same records. Scheduled reminders identify the right drawer; the patient opens it by hand and confirms the dose on the screen or phone. Missed-dose, low-supply, and expiration alerts keep the care team informed.

Label scanning uses a local model through Ollama with a Gemini fallback. Voice questions draw on the actual dose log and schedule, with ElevenLabs speech output. Scanned prescription fields remain editable for human review, and the AI does not change doses.

## Engineering decisions

- Keep dose state and alert rules in the backend so the cabinet, dashboard, and phones share one source of truth.
- Give the cabinet screen a read-only state endpoint separate from the Pi's command queue so polling the screen cannot consume a hardware command.
- Use large cabinet controls and visible dose states alongside spoken reminders.
- Connect Auth0 login to the application's existing backend sessions across web and mobile.

## Stack

Next.js, React, TypeScript, Expo / React Native, FastAPI, PostgreSQL, Auth0, Raspberry Pi, ESP32, Ollama, Gemini, and ElevenLabs.

## Repository

[View ThuocTracker on GitHub](https://github.com/minhpham1810/thuoctracker)`;

export default content;

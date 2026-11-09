const content = `# Umbra

### A deterministic TypeScript game engine with replayable tests and tools for AI agents.

## Context

An agent's bug report is more useful when a developer can reproduce it. Umbra makes headless simulation, checkpoints, and recorded inputs part of the engine, so agents can explore a game and return a replay of what happened.

## What I built

The 2D/3D engine uses schema-validated components, ordered systems, seeded randomness, and optional Rapier physics. Games run in Node or the browser; Canvas 2D and Three.js views read simulation state without changing it.

Agent tools run headless playtests, inspect state, search for outcomes by branching from checkpoints, and verify replays through an MCP server. Found routes are rerun from the beginning to check that they reproduce. Search is bounded: failing to find a route does not prove an outcome is impossible.

The browser Studio scrubs recorded runs, shows events and state, and checks the final simulation hash. For the platformer repair workflow, it compares failing and repaired replays and highlights changed level geometry.

## Engineering decisions

- Use fixed simulation ticks and record inputs so the same run can be replayed across environments.
- Validate game components and tool inputs with schemas before running the simulation.
- Keep rendering separate from simulation and exclude presentation components from the state hash.
- Check saved replays and compare simulation hashes in Node and headless Chromium in CI.
- Restore checkpoints during route search instead of restarting every candidate from the first tick.

## Stack

TypeScript, Node.js, Zod, Rapier, Three.js, Canvas 2D, MCP, Vite, Vitest, Playwright, and GitHub Actions.

## Links

- [Read the documentation](https://minhpham1810.github.io/umbra/)
- [Try the playground](https://minhpham1810.github.io/umbra/playground/)
- [Explore Replay Studio](https://minhpham1810.github.io/umbra/studio/)
- [View the repository](https://github.com/minhpham1810/umbra)`;

export default content;

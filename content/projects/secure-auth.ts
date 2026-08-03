const content = `# Secure Client-Server Authentication

### Challenge-response authentication and encrypted sessions, implemented in C.

## Context

This systems project explores what an authentication flow requires below the abstractions provided by web frameworks: credential storage, replay resistance, session encryption, message framing, and authorization.

## System

The server stores SHA-256 password hashes and uses RSA key generation plus a challenge-response flow to resist replay attacks. After authentication, AES-256-CBC protects session traffic with keys derived through HKDF.

USER and ADMIN roles enforce command-level authorization. Cryptography, database access, and protocol definitions live in separate C modules so each boundary can be reasoned about independently.

## Engineering focus

- Nonce-based challenge-response flow to resist replay
- SHA-256 password hashing and RSA key generation
- Replay-attack protection
- AES-256-CBC sessions with HKDF-derived keys
- Role-based access control
- Explicit protocol and module boundaries

## Stack

C, OpenSSL, SHA-256, RSA, AES-256-CBC, HKDF, and Makefile.

## Repository

[View the authentication project](https://github.com/minhpham1810/csci307-s26/tree/main/Projects/Project02)
`;

export default content;

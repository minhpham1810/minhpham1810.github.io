const content = `# Secure Client-Server Authentication

### Challenge-response authentication and encrypted sessions, implemented in C.

## Context

This systems project explores what an authentication flow requires below the abstractions provided by web frameworks: credential storage, replay resistance, session encryption, message framing, and authorization.

## System

The server stores salted password hashes. During authentication it issues a dynamic nonce, allowing the client to prove knowledge of a credential without sending the stored value directly. After authentication, AES-256-CBC protects session traffic.

USER and ADMIN roles enforce command-level authorization. Cryptography, database access, and protocol definitions live in separate C modules so each boundary can be reasoned about independently.

## Engineering focus

- Nonce-based challenge-response flow to resist replay
- Salted SHA-256 password hashing
- AES-256-CBC session encryption
- Role-based access control
- Explicit protocol and module boundaries

## Stack

C, OpenSSL, SHA-256, AES-256-CBC, and Make.

## Repository

[View the authentication project](https://github.com/minhpham1810/csci307-s26/tree/main/Projects/Project02)
`;

export default content;

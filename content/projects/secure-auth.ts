const content = `# Secure Client-Server Authentication

### Challenge-response auth with AES-encrypted channels and role-based access control, written in C.

A low-level systems project implementing a secure client-server communication system from scratch. The focus was on practical cryptographic integration — from salted password hashing to encrypted session traffic — using only C and OpenSSL.

## Links
- [GitHub Repository](https://github.com/minhpham1810/csci307-s26/tree/main/Projects/Project02)

## Key Features
- 🔐 Challenge-Response Auth: SHA-256 hashing with salted passwords and dynamic nonces to prevent replay attacks and credential exposure
- 🔒 Encrypted Sessions: All post-authentication traffic protected with AES-256-CBC to prevent eavesdropping
- 👥 Role-Based Access Control: USER and ADMIN roles enforce privilege separation — sensitive commands restricted by role
- 🗂️ Modular Architecture: Separate modules for cryptography, database management, and protocol definitions keep responsibilities clean

## Technologies
- Language: C
- Cryptography: OpenSSL (SHA-256, AES-256-CBC)
- Build System: Makefile
`;

export default content;

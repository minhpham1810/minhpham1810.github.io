const content = `# unissh

### A Go CLI that sends clipboard images to remote servers over SSH.

## Context

Getting a screenshot onto a remote machine usually means saving it, finding it, and running a copy command by hand. unissh uploads the image currently on the clipboard over SSH/SFTP, with no daemon to install on the remote side.

## What I built

- A push command that reads the clipboard image and uploads it over SFTP
- An interactive setup wizard for first-time configuration
- Saved connection profiles with a terminal profile picker
- SSH agent support on both Unix and Windows

## Engineering focus

- Separate clipboard access, configuration, SSH connections, and the terminal interface into focused packages
- Keep the remote side dependency-free by relying only on a standard SSH server
- Cover setup and SSH client behavior with Go tests, and publish builds through a GitHub Actions release workflow

## Stack

Go, Cobra, Charm (huh and Lip Gloss), SFTP, and GitHub Actions.

## Repository

[View unissh on GitHub](https://github.com/minhpham1810/unissh)`;

export default content;

# ⚡ Vishesh Code: The Advanced Engineering Agent CLI

![License: Hybrid](https://img.shields.io/badge/License-Hybrid-blue.svg)
![Status: Research](https://img.shields.io/badge/Status-Frontier_Research-orange.svg)
![Runtime: Bun/Node](https://img.shields.io/badge/Runtime-Bun%2FNode-green.svg)

[LinkedIn](https://www.linkedin.com/in/vishesh-sanghvi/) | [Portfolio](https://vishesh-ai.vercel.app/)

**Vishesh Code** is an AI agent that works directly in your terminal. It doesn’t just suggest code; it performs engineering tasks. It reads your files, runs your bash commands, and manages its own memory so you can build complex systems in one continuous session.

---

## 💎 The \"Wow\" Factor: Context Management

Most AI chats crash or \"forget\" the goal when the conversation gets long. **Vishesh Code** has an automatic **Compaction Engine**. 
*   **What it does:** It summarizes old thoughts and \"compresses\" history automatically.
*   **The Result:** You can work on a 50-file project for 5 hours straight, and the agent will still remember the original plan you gave it on turn one.

---

## 🔥 Key Capabilities

*   **💻 True Terminal Access:** It can run `grep`, `npm test`, `git commit`, and even custom shell scripts safely.
*   **📝 High-Precision Editing:** Instead of rewriting whole files (which is slow and expensive), it uses a smart-diff system to change only the exact lines of code needed.
*   **🔌 MCP Integration:** Connect to \"Intelligence Servers\" (Database, GitHub, Slack) to give the agent more data.
*   **🥚 Companion System:** Hatch a unique **\"vishesh\"** AI sidekick that grows as you debug.

---

## 🕹️ Intelligent Agent Loop

When you ask it to do something, it doesn't just guess. It follows a professional engineering flow:
1.  **🔍 Explore:** Searches your folder to find relevant files.
2.  **📖 Read:** Deep-scans the code and its dependencies.
3.  **⚒️ Edit:** Writes the fix using a precision toolset.
4.  **🧪 Test:** Runs your test suite to verify the fix works.
5.  **✅ Finish:** Confirms completion only when the task is fully validated.

---

## 🛠️ Setup (60 Seconds)

### **Standard (Bun)**
```bash
bun install && bun run build:prod
bun dist/cli.mjs
```

### **Manual (Node.js/NPM)**
```bash
npm install --force
# 1. Build the production bundle:
npx esbuild src/entrypoints/cli.tsx --bundle --platform=node --format=esm --outfile=dist/cli.mjs --alias:bun:bundle=./src/shims/bun-bundle.ts --tsconfig=tsconfig.json --banner:js=\"#!/usr/bin/env node\" --define:MACRO.VERSION='\"1.0.0-custom\"' --define:process.env.USER_TYPE='\"external\"' --define:MACRO.PACKAGE_URL='\"@visheshcode\"' \"--define:MACRO.ISSUES_EXPLAINER=\\\"contact Vishesh Sanghvi\\\"\" --loader:.js=ts --loader:.tsx=tsx
# 2. Run:
node dist/cli.mjs
```

---

## 💡 Pro-Tips for Developers
*   **Generate Content:** Use `/linkedin` to automatically draft social updates about your build progress.
*   **Control Tokens:** Use `/compact` to manually shrink the history and save costs.
*   **Stay Safe:** The agent is local-first. It only sends what it needs to the LLM.

---

## 🤝 Connect with the Developer
Built and maintained by **Vishesh Sanghvi**, a systems architect passionate about frontier AI agents and terminal-first engineering.

*   **LinkedIn:** [vishesh-sanghvi](https://www.linkedin.com/in/vishesh-sanghvi/)
*   **Portfolio:** [vishesh-ai.vercel.app](https://vishesh-ai.vercel.app/)

---
> [!IMPORTANT]
> **Disclaimer:** This is a frontier research project based on the Claude Code architecture (2025). Enhanced and customized by Vishesh Sanghvi for portfolio demonstration.

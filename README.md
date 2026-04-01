# ⚡ Vishesh Code

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black)
![Bun](https://img.shields.io/badge/Bun_1.1+-000000?logo=bun&logoColor=white)
![Node](https://img.shields.io/badge/Node_20+-339933?logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-Research-blue)

[LinkedIn](https://www.linkedin.com/in/vishesh-sanghvi/) · [Portfolio](https://vishesh-ai.vercel.app/)

A terminal-based AI coding agent. It reads files, runs shell commands, edits code, searches the web, and manages multi-hour sessions — all from a single terminal window. Built on the leaked Claude Code architecture (~1,941 source files, ~512K lines of TypeScript).

---

## What It Actually Does

This is not a chatbot wrapper. It is a **stateful agent** with a tool-use loop. When you give it a task, it:

1. **Searches** your project using `GlobTool` and `GrepTool` to find relevant files
2. **Reads** them with `FileReadTool`
3. **Edits** code using `FileEditTool` (diff-based, not full-file rewrites)
4. **Runs** shell commands via `BashTool` or `PowerShellTool`
5. **Verifies** results by running tests or reading output
6. **Loops** back if something failed — it does not stop on first error

The agent decides which tools to call, in what order, and whether to retry. You just describe the task in plain English.

---

## 38 Built-In Tools

Every tool below exists as a real, implemented TypeScript module in `src/tools/`:

| Category | Tools | What They Do |
|---|---|---|
| **Shell** | `BashTool`, `PowerShellTool`, `REPLTool` | Run any terminal command with timeout and safety checks |
| **Files** | `FileReadTool`, `FileWriteTool`, `FileEditTool` | Read/write/patch files. Edit uses diff-matching, not full rewrites |
| **Search** | `GlobTool`, `GrepTool`, `ToolSearchTool` | Find files by pattern, search content by regex, discover tools |
| **Web** | `WebFetchTool`, `WebSearchTool` | Fetch URLs, search the internet |
| **Agents** | `AgentTool`, `SkillTool` | Spawn sub-agents (forks) for parallel research or verification |
| **Tasks** | `TaskCreateTool`, `TaskListTool`, `TaskGetTool`, `TaskUpdateTool`, `TaskStopTool`, `TaskOutputTool` | Background task management |
| **Teams** | `TeamCreateTool`, `TeamDeleteTool` | Multi-agent team orchestration |
| **Planning** | `EnterPlanModeTool`, `ExitPlanModeTool`, `TodoWriteTool` | Structured planning and TODO tracking |
| **Worktree** | `EnterWorktreeTool`, `ExitWorktreeTool` | Git worktree isolation for safe experiments |
| **MCP** | `MCPTool`, `ListMcpResourcesTool`, `ReadMcpResourceTool`, `McpAuthTool` | Connect to any Model Context Protocol server |
| **Notebook** | `NotebookEditTool` | Edit Jupyter `.ipynb` files |
| **LSP** | `LSPTool` | Language Server Protocol — go-to-definition, find references |
| **Scheduling** | `ScheduleCronTool`, `SleepTool` | Schedule tasks, add delays |
| **Comms** | `SendMessageTool`, `RemoteTriggerTool` | Send messages, trigger remote actions |
| **Other** | `AskUserQuestionTool`, `BriefTool`, `ConfigTool`, `SyntheticOutputTool` | Ask user questions, configure settings |

---

## Context Management (How It Handles Long Sessions)

The biggest engineering challenge in agentic systems is **context window overflow**. This codebase has three layers to handle it:

1. **Auto-Compaction** (`src/services/compact/autoCompact.ts`) — When token count gets high, it automatically summarizes old conversation turns into a compact summary, then continues with that summary as context.

2. **History Snip** (`src/services/compact/snipCompact.ts`) — Removes the oldest tool results that are no longer relevant, keeping only the important ones.

3. **Micro-Compaction** (`src/services/compact/microCompact.ts`) — Compresses individual tool outputs that are too large (e.g., a 10,000-line grep result gets trimmed to the relevant matches).

These three systems work together. The result: you can run a 5-hour session without the agent forgetting what it was doing.

---

## Slash Commands

There are 80+ slash commands in `src/commands/`. Here are the most useful ones:

| Command | What It Does |
|---|---|
| `/help` | Lists all available tools and commands |
| `/compact` | Manually trigger context compaction to save tokens |
| `/buddy` | Interact with your AI companion (19 species including custom "vishesh" species) |
| `/linkedin` | Generate LinkedIn post drafts about your project progress |
| `/review` | Run a code review on your current changes |
| `/init` | Set up CLAUDE.md project instructions |
| `/model` | Switch between Claude models |
| `/cost` | Show current session token usage and cost |
| `/diff` | Show git diff of current changes |
| `/commit` | Generate a commit message and commit |
| `/plan` | Enter structured planning mode |
| `/mcp` | Manage MCP server connections |
| `/memory` | Manage persistent memory entries |
| `/export` | Export conversation history |
| `/clear` | Clear conversation and start fresh |

---

## The Companion System ("Buddy")

Located in `src/buddy/`. Every user gets a procedurally generated AI companion with:

- **19 species**: duck, goose, blob, cat, dragon, octopus, owl, penguin, turtle, snail, ghost, axolotl, capybara, cactus, robot, rabbit, mushroom, chonk, **vishesh**
- **6 eye styles**, **14 hat types**, **5 rarity tiers** (common → legendary)
- **3 evolving stats**: Debug Skill, Patience, Chaos
- **ASCII art sprites** that render in the terminal with animations

The "vishesh" species is a custom addition with its own unique sprite and face signature (`<·✦·>`).

---

## Tech Stack

| Layer | Technology | Location |
|---|---|---|
| Runtime | Bun 1.1+ (Node.js 20+ compatible) | `package.json` |
| Language | TypeScript 5.7 | `tsconfig.json` |
| UI Framework | React 19 + Ink (terminal React renderer) | `src/components/` |
| Bundler | esbuild | `scripts/build-bundle.ts` |
| LLM SDK | `@anthropic-ai/sdk` | `src/services/api/claude.ts` |
| MCP Client | `@modelcontextprotocol/sdk` | `src/services/mcp/` |
| Linter | Biome | `biome.json` |
| Telemetry | OpenTelemetry | `src/utils/telemetry/` |

---

## Project Structure

```
src/
├── entrypoints/       # CLI bootstrap (cli.tsx)
├── tools/             # All 38 tool implementations
├── commands/          # All 80+ slash commands
├── services/
│   ├── api/           # Anthropic API client, retry logic, streaming
│   ├── compact/       # Auto-compaction, micro-compaction, snip
│   ├── mcp/           # MCP client connections
│   └── analytics/     # Usage tracking (GrowthBook)
├── buddy/             # Companion system (sprites, types, companion logic)
├── constants/         # System prompts, model configs
├── utils/             # Helpers (git, auth, config, tokens, etc.)
├── components/        # React/Ink terminal UI components
├── hooks/             # React hooks for state management
├── query.ts           # The core agent loop (1,731 lines)
├── Tool.ts            # Tool interface and registry
├── main.tsx           # Main application entry (~808K)
└── commands.ts        # Slash command registry
```

---

## Setup

### With Bun (recommended)
```bash
bun install
bun run build:prod
bun dist/cli.mjs
```

### With Node.js
```bash
npm install --force
npx tsx scripts/build-bundle.ts
node dist/cli.mjs
```

### With Docker
```bash
docker build -t vishesh-code .
docker run -it --rm -e ANTHROPIC_API_KEY=sk-... vishesh-code
```

> **Note:** An Anthropic API key is required to run the agent. The CLI will prompt you on first launch.

---

## What I Changed From the Original

| Change | File(s) |
|---|---|
| Added "vishesh" buddy species with custom ASCII sprite | `src/buddy/types.ts`, `src/buddy/sprites.ts` |
| Built `/linkedin` slash command for post generation | `src/commands/linkedin.ts`, `src/commands.ts` |
| Rebranded system identity to "Vishesh Code" | `src/constants/system.ts` |
| Updated package metadata | `package.json`, `server.json`, `mcp-server/` |
| Rewrote documentation | `README.md` |

---

## Connect

**Vishesh Sanghvi** — [LinkedIn](https://www.linkedin.com/in/vishesh-sanghvi/) · [Portfolio](https://vishesh-ai.vercel.app/)

---

> **Disclaimer:** This is a research fork of the Claude Code CLI (leaked March 2025). It requires an Anthropic API key to function. Not affiliated with Anthropic.

<h1 align="center">
  <a href="https://github.com/skinheadH/HBB-prompts.chat">
    <picture>
      <source media="prefers-color-scheme: dark" srcset="public/logo-dark.svg">
      <source media="prefers-color-scheme: light" srcset="public/logo.svg">
      <img height="60" alt="HBB Prompts" src="public/logo.svg">
    </picture>
    <br>
    HBB Prompts
  </a>
</h1>

<p align="center">
  <strong>The world's largest open-source prompt library for AI</strong><br>
  <sub>Works with ChatGPT, Claude, Gemini, Llama, Mistral, and more</sub>
</p>
<p align="center">
  <sub>Forked from <a href="https://github.com/f/prompts.chat">f/prompts.chat</a> (formerly Awesome ChatGPT Prompts), rebranded and maintained by HBB</sub>
</p>

<p align="center">
  <a href="https://github.com/skinheadH/HBB-prompts.chat"><img src="https://img.shields.io/badge/GitHub-HBB--prompts.chat-blue?style=flat-square" alt="GitHub"></a>
  <a href="https://deepwiki.com/skinheadH/HBB-prompts.chat"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
</p>

<p align="center">
  <a href="https://raw.githubusercontent.com/skinheadH/HBB-prompts.chat/main/PROMPTS.md">📄 View Prompts on GitHub</a> •
  <a href="#-self-hosting">🚀 Self-Host</a>
</p>

---

## What is this?

A curated collection of **prompts** for AI chat models. Originally created for ChatGPT, these prompts work great with any modern AI assistant.

| Browse Prompts | Data Formats |
|----------------|--------------|
| Self-hosted instance (`/prompts`) | [prompts.csv](prompts.csv) |
| [PROMPTS.md](https://raw.githubusercontent.com/skinheadH/HBB-prompts.chat/main/PROMPTS.md) | [Hugging Face Dataset](https://huggingface.co/datasets/fka/prompts.chat) (upstream) |

---

## 📖 The Interactive Book of Prompting

Learn prompt engineering with a **free, interactive guide** — 29+ chapters covering everything from basics to advanced techniques like chain-of-thought reasoning, few-shot learning, and AI agents.

Available locally at `/book` once the app is running. (Source: [src/content/book](src/content/book))

---

## 🎮 Prompting for Kids

An interactive, game-based adventure to teach children (ages 8-14) how to communicate with AI through fun puzzles and stories.

Available locally at `/kids` once the app is running.

---

## 🚀 Self-Hosting

Deploy your own private prompt library with custom branding, themes, and authentication.

**Quick Start (Docker):**
```bash
git clone https://github.com/skinheadH/HBB-prompts.chat.git
cd HBB-prompts.chat
docker compose up -d --build
```
Open http://localhost:4444.

**Manual Setup:**
```bash
git clone https://github.com/skinheadH/HBB-prompts.chat.git
cd HBB-prompts.chat
npm install && npm run setup
```

The setup wizard configures branding, theme, authentication (GitHub/Google/Azure AD), and features.

**Requirements:** Node.js 24.x + PostgreSQL (see [SELF-HOSTING.md](SELF-HOSTING.md)).

📖 **[Full Self-Hosting Guide](SELF-HOSTING.md)** • 🐳 **[Docker Guide](DOCKER.md)**

---

## 🔌 Integrations

### CLI
```bash
npx prompts.chat
```

### Claude Code Plugin
```
/plugin marketplace add skinheadH/HBB-prompts.chat
/plugin install prompts.chat@prompts.chat
```
📖 [Plugin Documentation](CLAUDE-PLUGIN.md)

### MCP Server
Use your self-hosted instance as an MCP server in your AI tools.

**Remote (recommended):**
```json
{
  "mcpServers": {
    "prompts.chat": {
      "url": "https://your-domain.com/api/mcp"
    }
  }
}
```

**Local:**
```json
{
  "mcpServers": {
    "prompts.chat": {
      "command": "npx",
      "args": ["-y", "prompts.chat", "mcp"]
    }
  }
}
```

📖 [MCP Documentation](https://prompts.chat/docs/api) (upstream)

---

## 👥 Contributors

<a href="https://github.com/skinheadH/HBB-prompts.chat/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=skinheadH/HBB-prompts.chat" />
</a>

---

## 📜 License

This project is dual-licensed:

- **Source code and site-authored content** is licensed under the [MIT License](LICENSE-MIT),
  including the interactive book content in [`src/content/book`](src/content/book).
- **Prompt content and data** (prompts.csv, PROMPTS.md, user-submitted prompts) is dedicated to the public domain under [CC0 1.0 Universal](LICENSE-CC0).

See [LICENSE](LICENSE) for details.

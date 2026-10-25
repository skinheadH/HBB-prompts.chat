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
  <strong>全球最大的开源 AI 提示词库</strong><br>
  <sub>支持 ChatGPT、Claude、Gemini、Llama、Mistral 等</sub>
</p>
<p align="center">
  <sub>Forked from <a href="https://github.com/f/prompts.chat">f/prompts.chat</a>（前身为 Awesome ChatGPT Prompts），由 HBB 改名并维护</sub>
</p>

<p align="center">
  <a href="https://github.com/skinheadH/HBB-prompts.chat"><img src="https://img.shields.io/badge/GitHub-HBB--prompts.chat-blue?style=flat-square" alt="GitHub"></a>
  <a href="https://deepwiki.com/skinheadH/HBB-prompts.chat"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
</p>

<p align="center">
  <a href="https://raw.githubusercontent.com/skinheadH/HBB-prompts.chat/main/PROMPTS.md">📄 在 GitHub 上查看提示词</a> •
  <a href="#-自托管">🚀 自托管</a>
</p>

---

## 这是什么？

一份为 AI 聊天模型精选的**提示词**合集。最初为 ChatGPT 打造，同样适用于任何现代 AI 助手。

| 浏览提示词 | 数据格式 |
|----------------|--------------|
| 自托管实例（`/prompts`） | [prompts.csv](prompts.csv) |
| [PROMPTS.md](https://raw.githubusercontent.com/skinheadH/HBB-prompts.chat/main/PROMPTS.md) | [Hugging Face 数据集](https://huggingface.co/datasets/fka/prompts.chat)（上游） |

---

## 📖 交互式提示词手册

通过这份**免费的交互式指南**学习提示词工程 —— 29 章以上，从基础到高级技巧全覆盖，包括思维链推理、少样本学习和 AI 智能体。

应用启动后本地访问 `/book`。（源码：[src/content/book](src/content/book)）

---

## 🎮 少儿提示词

一个互动的游戏化冒险，通过有趣的谜题和故事，教 8-14 岁的孩子如何与 AI 沟通。

应用启动后本地访问 `/kids`。

---

## 🚀 自托管

部署属于你自己的私有提示词库，品牌定制、主题和身份验证均可自定义。

**快速开始（Docker）：**
```bash
git clone https://github.com/skinheadH/HBB-prompts.chat.git
cd HBB-prompts.chat
docker compose up -d --build
```
打开 http://localhost:4444。

**手动安装：**
```bash
git clone https://github.com/skinheadH/HBB-prompts.chat.git
cd HBB-prompts.chat
npm install && npm run setup
```

安装向导会引导你配置品牌定制、主题、身份验证（GitHub/Google/Azure AD）和各项功能。

**环境要求：** Node.js 24.x + PostgreSQL（见 [SELF-HOSTING.md](SELF-HOSTING.md)）。

📖 **[完整自托管指南](SELF-HOSTING.md)** • 🐳 **[Docker 指南](DOCKER.md)**

---

## 🔌 集成

### CLI
```bash
npx prompts.chat
```

### Claude Code 插件
```
/plugin marketplace add skinheadH/HBB-prompts.chat
/plugin install prompts.chat@prompts.chat
```
📖 [插件文档](CLAUDE-PLUGIN.md)

### MCP 服务器
把你的自托管实例作为 MCP 服务器，接入你自己的 AI 工具。

**远程（推荐）：**
```json
{
  "mcpServers": {
    "prompts.chat": {
      "url": "https://your-domain.com/api/mcp"
    }
  }
}
```

**本地：**
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

📖 [MCP 文档](https://prompts.chat/docs/api)（上游）

---

## 👥 贡献者

<a href="https://github.com/skinheadH/HBB-prompts.chat/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=skinheadH/HBB-prompts.chat" />
</a>

---

## 📜 许可证

本项目采用双重许可：

- **源代码和站点原创内容**采用 [MIT License](LICENSE-MIT) 许可，
  包括 [`src/content/book`](src/content/book) 中的交互式手册内容。
- **提示词内容和数据**（prompts.csv、PROMPTS.md、用户提交的提示词）以 [CC0 1.0 Universal](LICENSE-CC0) 投入公共领域。

详见 [LICENSE](LICENSE)。

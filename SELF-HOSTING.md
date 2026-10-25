# 自托管指南

## 功能

- **精选提示词库** —— 收录 100+ 条经社区验证的高质量提示词，适用于 ChatGPT、Claude、Gemini、Llama、Mistral 等 AI 模型
- **发现与浏览** —— 按分类、标签浏览提示词，或使用 AI 语义搜索
- **创建与分享提示词** —— 提交你自己的提示词，支持纯文本、结构化（JSON/YAML）和富媒体格式
- **版本管理** —— 内置版本记录和变更请求系统（类似 PR），随时跟踪提示词的修改
- **个性化信息流** —— 订阅感兴趣的分类，获取对应的精选提示词
- **私有提示词** —— 将提示词设为私有，或分享给社区
- **投票与排行榜** —— 给提示词投票，通过 PromptMasters 排行榜发现最受欢迎的内容
- **多语言支持** —— 支持英语、西班牙语、日语、土耳其语和中文

## 优势

- **释放 AI 潜力：** 不用再为提示词工程头疼 —— 直接使用来自 141k+ GitHub star 社区的久经考验的提示词
- **节省时间：** 一键复制提示词，就地修改变量，立刻在任何 AI 聊天中使用
- **社区驱动质量：** 每条提示词都经社区通过变更请求和投票筛选、打磨
- **可自托管：** 为你的团队或组织部署白标提示词库，品牌定制、主题和身份验证均可自定义
- **CC0 许可：** 所有提示词均为公共领域 —— 任何用途（商业或个人）均可自由使用

## 开始使用

**要求：**
- **方案：** 免费且开源（CC0 许可）
- **用户权限：** 浏览无需账号；通过 GitHub/Google 登录后可创建和保存提示词

---

本指南介绍如何在你的私有服务器上部署 **HBB Prompts**，以获得更强的隐私保护和定制能力。

## 前置条件

- **Node.js** 24.x
- **PostgreSQL** 数据库
- **npm**

## 推荐数据库

HBB Prompts 需要 PostgreSQL。如果需要托管数据库，[Neon](https://neon.com) 提供 serverless Postgres、连接池和分支功能，很适合自托管部署。

## 环境变量

基于 `.env.example` 创建 `.env` 文件：

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/prompts"

# Authentication (choose one provider)
# GitHub OAuth
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# Or Google OAuth
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# NextAuth
AUTH_SECRET="generate-a-random-secret"

# Optional: AI-powered semantic search
OPENAI_API_KEY="your-openai-api-key"
```

## 安装

### 快速开始（推荐）

创建 HBB Prompts 新实例最快的方式：

```bash
npx prompts.chat new my-prompt-library
cd my-prompt-library
```

该命令会：
1. 克隆一份干净的仓库副本（不含开发文件）
2. 安装依赖
3. 启动交互式安装向导

### 手动安装

1. **克隆仓库**
   ```bash
   git clone https://github.com/skinheadH/HBB-prompts.chat.git
   cd HBB-prompts.chat
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **运行交互式安装向导**
   ```bash
   npm run setup
   ```
   向导会引导你完成以下配置：
   - **品牌定制** —— 应用名称、Logo、描述
   - **主题** —— 主色、圆角、UI 变体
   - **身份验证** —— GitHub、Google、Apple、Azure AD 或邮箱/密码
   - **语言** —— 从 16 个支持的语言中选择
   - **功能** —— 私有提示词、分类、标签、评论、AI 搜索、AI 生成、MCP 支持

4. **配置环境变量**
   ```bash
   cp .env.example .env
   # Edit .env with your database and auth credentials
   ```

5. **运行数据库迁移**
   ```bash
   npm run db:migrate
   ```

6. **导入种子数据**（可选）
   ```bash
   npm run db:seed
   ```

7. **启动开发服务器**
   ```bash
   npm run dev
   ```

8. **构建生产版本**
   ```bash
   npm run build
   npm run start
   ```

## 配置

安装向导（`npm run setup`）会自动生成 `prompts.config.ts`，你也可以手动编辑：

```typescript
// Set to true to use your own branding instead of upstream branding
const useCloneBranding = true;

export default defineConfig({
  // Branding
  branding: {
    name: "Your Prompt Library",
    logo: "/your-logo.svg",
    logoDark: "/your-logo-dark.svg",
    description: "Your custom description",
  },

  // Theme
  theme: {
    radius: "sm",        // "none" | "sm" | "md" | "lg"
    variant: "default",  // "flat" | "default" | "brutal"
    colors: {
      primary: "#6366f1",
    },
  },

  // Authentication
  auth: {
    provider: "github",  // "credentials" | "github" | "google" | "azure"
    allowRegistration: true,
  },

  // Features
  features: {
    privatePrompts: true,
    changeRequests: true,
    categories: true,
    tags: true,
    aiSearch: false,  // Requires OPENAI_API_KEY
  },

  // Homepage
  homepage: {
    useCloneBranding,  // Use your branding on homepage
    achievements: {
      enabled: !useCloneBranding,  // Hide upstream achievements
    },
    sponsors: {
      enabled: !useCloneBranding,  // Hide upstream sponsors
    },
  },

  // Internationalization
  i18n: {
    locales: ["en", "es", "ja", "tr", "zh"],
    defaultLocale: "en",
  },
});
```

### 自有品牌模式

当 `useCloneBranding` 设为 `true` 时，首页会：

- 把你的**品牌名称**作为头图大标题
- 在标题下方显示你的**品牌描述**
- 用你的**Logo** 作为水印背景，替换原来的视频
- 隐藏“部署你的私有服务器”按钮
- 隐藏成就板块（Forbes、GitHub star 等）
- 隐藏赞助商链接和“成为赞助商”按钮

适合想部署自有白标提示词库、不带上游品牌信息的组织。

## 支持

如有问题或疑问，请提交 [GitHub Issue](https://github.com/skinheadH/HBB-prompts.chat/issues)。

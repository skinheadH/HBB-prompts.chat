# AGENTS.md

> 在本项目上工作的 AI 编程代理指南。

## 项目概述

**HBB Prompts** 是一个 AI 提示词社交平台（fork 自 f/prompts.chat），基于 Next.js 16 构建。用户可以在社区中分享、发现和收集提示词。项目开源，支持自托管，并可定制品牌、主题和认证方式。

### 技术栈

- **框架：** Next.js 16.0.7（App Router）+ React 19.2
- **语言：** TypeScript 5
- **数据库：** PostgreSQL + Prisma ORM 6.19
- **认证：** NextAuth.js 5（beta），支持可插拔的 providers（credentials、GitHub、Google、Azure）
- **样式：** Tailwind CSS 4 + Radix UI primitives
- **UI 组件：** shadcn/ui 模式（组件位于 `src/components/ui/`）
- **国际化：** next-intl，支持 11 个 locale
- **图标：** Lucide React
- **表单：** React Hook Form + Zod 校验

## 项目结构

```
/
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma       # Prisma schema definition
│   ├── migrations/         # Database migrations
│   └── seed.ts             # Database seeding script
├── public/                 # Static assets (logos, favicon)
├── messages/               # i18n translation files (en.json, es.json, etc.)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (auth)/         # Auth pages (login, register)
│   │   ├── [username]/     # User profile pages
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API routes
│   │   ├── categories/     # Category pages
│   │   ├── prompts/        # Prompt CRUD pages
│   │   ├── feed/           # User feed
│   │   ├── discover/       # Discovery page
│   │   ├── settings/       # User settings
│   │   └── tags/           # Tag pages
│   ├── components/         # React components
│   │   ├── admin/          # Admin-specific components
│   │   ├── auth/           # Authentication components
│   │   ├── categories/     # Category components
│   │   ├── layout/         # Layout components (header, etc.)
│   │   ├── prompts/        # Prompt-related components
│   │   ├── providers/      # React context providers
│   │   ├── settings/       # Settings components
│   │   └── ui/             # shadcn/ui base components
│   ├── lib/                # Utility libraries
│   │   ├── ai/             # AI/OpenAI integration
│   │   ├── auth/           # NextAuth configuration
│   │   ├── config/         # Config type definitions
│   │   ├── i18n/           # Internationalization setup
│   │   ├── plugins/        # Plugin system (auth, storage)
│   │   ├── db.ts           # Prisma client instance
│   │   └── utils.ts        # Utility functions (cn)
│   └── i18n/               # i18n request handler
├── prompts.config.ts       # Main application configuration
├── prompts.csv             # Community prompts data source
└── package.json            # Dependencies and scripts
```

## 命令

```bash
# Development
npm run dev              # Start development server (localhost:3000)
npm run build            # Build for production (runs prisma generate first)
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
npm run db:push          # Push schema changes to database
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database with initial data

# Type checking
npx tsc --noEmit         # Check TypeScript types without emitting

# Translations
node scripts/check-translations.js  # Check for missing translations across locales
```

## 代码风格规范

### TypeScript

- 使用 TypeScript 严格模式
- 优先使用显式类型，不要用 `any`
- 对象结构用 `interface`，联合/交叉类型用 `type`
- 函数：`camelCase`（如 `getUserData`、`handleSubmit`）
- 组件：`PascalCase`（如 `PromptCard`、`AuthContent`）
- 常量：真正的常量用 `UPPER_SNAKE_CASE`
- 文件：组件用 `kebab-case.tsx`，工具函数用 `camelCase.ts`

### React/Next.js

- 默认使用 React Server Components
- 仅在需要客户端交互时才添加 `"use client"` 指令
- 数据修改优先使用 server actions，而非 API routes
- 所有面向用户的字符串都用 `next-intl`（绝不硬编码文本）
- 用 `useTranslations()` 或 `getTranslations()` 引入翻译

### 组件模式

```tsx
// Client component example
"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const t = useTranslations("namespace");
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Button onClick={onAction}>{t("actionLabel")}</Button>
    </div>
  );
}
```

### 样式

- 使用 Tailwind CSS 工具类
- 遵循移动优先的响应式设计（`sm:`、`md:`、`lg:` 断点）
- 条件类名使用 `@/lib/utils` 的 `cn()` 工具函数
- 优先通过 shadcn/ui 组件使用 Radix UI primitives
- 保持组件样式的局部性和可组合性

### 数据库

- 使用 `@/lib/db` 的 Prisma Client
- 关联查询必须正确使用 `select` 或 `include`
- 多步操作使用事务
- 为频繁查询的字段添加索引

## 配置

主配置文件是 `prompts.config.ts`：

- **品牌定制：** Logo、名称和描述
- **主题：** 颜色、圆角、UI 变体
- **认证：** providers 数组（credentials、github、google、azure）
- **i18n：** 支持的 locale 和默认 locale
- **功能：** 功能开关（privatePrompts、changeRequests、categories、tags、aiSearch）
- **首页：** 页面定制项和赞助商

## 插件系统

认证和存储采用插件式架构：

### 认证插件（`src/lib/plugins/auth/`）
- `credentials.ts` - 邮箱/密码认证
- `github.ts` - GitHub OAuth
- `google.ts` - Google OAuth  
- `azure.ts` - Microsoft Entra ID

### 存储插件（`src/lib/plugins/storage/`）
- `url.ts` - 基于 URL 的媒体（默认）
- `s3.ts` - AWS S3 存储

## 国际化

- 翻译文件位于 `messages/{locale}.json`
- 当前支持：en、tr、es、zh、ja、ar、pt、fr、de、ko、it
- 在 `prompts.config.ts` 的 i18n.locales 数组中新增 locale
- 在 `messages/` 中创建对应的翻译文件
- 在 `src/components/layout/header.tsx` 的选择器中添加该语言

## 关键文件

| 文件 | 用途 |
|------|------|
| `prompts.config.ts` | 主应用配置 |
| `prisma/schema.prisma` | 数据库 schema |
| `src/lib/auth/index.ts` | NextAuth 配置 |
| `src/lib/db.ts` | Prisma 客户端单例 |
| `src/app/layout.tsx` | 根布局（含 providers） |
| `src/components/ui/` | 基础 UI 组件（shadcn） |

## 边界

### 必须做
- 提交前运行 `npm run lint`
- 复用 `src/components/ui/` 中的现有 UI 组件
- 为所有面向用户的文本添加翻译
- 遵循现有的代码模式和文件结构
- 使用 TypeScript 严格类型

### 先问后做
- 数据库 schema 变更（需要迁移）
- 新增依赖
- 修改认证流程
- 改动 `prompts.config.ts` 的结构

### 绝不做
- 提交密钥或 API key（用 `.env`）
- 修改 `node_modules/` 或生成的文件
- 删除现有翻译
- 移除或弱化 TypeScript 类型
- 硬编码面向用户的字符串（要用 i18n）

## 环境变量

`.env` 中必填：
```
DATABASE_URL=           # PostgreSQL connection string
AUTH_SECRET=            # NextAuth secret key
```

可选的 OAuth 配置（如果使用相应 providers）：
```
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_AZURE_AD_CLIENT_ID=
AUTH_AZURE_AD_CLIENT_SECRET=
AUTH_AZURE_AD_ISSUER=
```

可选功能：
```
OPENAI_API_KEY=         # For AI-powered semantic search
```

## 测试

目前没有自动化测试。写测试时：
- 把测试放在源文件旁边或 `__tests__/` 目录中
- 使用描述性的测试名称
- 对外部服务（数据库、OAuth）进行 mock

## 常见任务

### 新增页面
1. 在 `src/app/{route}/page.tsx` 创建路由
2. 用 server component 获取数据
3. 在 `messages/*.json` 中添加翻译

### 新增组件
1. 在合适的 `src/components/{category}/` 目录下创建
2. 从组件文件导出（不需要 barrel export）
3. 遵循现有组件模式

### 新增 API 路由
1. 在 `src/app/api/{route}/route.ts` 创建
2. 导出相应的 HTTP 方法处理器（GET、POST 等）
3. 用 Zod 校验请求
4. 返回带正确状态码的 JSON 响应

### 修改数据库 schema
1. 更新 `prisma/schema.prisma`
2. 运行 `npm run db:migrate` 创建迁移
3. 如有需要，更新相关的 TypeScript 类型

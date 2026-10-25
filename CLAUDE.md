# CLAUDE.md

> Claude Code 开发 HBB Prompts 时的快速参考

## 项目概述

**HBB Prompts** 是一个 AI 提示词社交平台（fork 自 f/prompts.chat），使用 Next.js 16 App Router、React 19、TypeScript 和 PostgreSQL/Prisma 构建。用户可以在上面分享、发现和收集提示词。

详细的代理指南见 [AGENTS.md](AGENTS.md)。

## 常用命令

```bash
# Development
npm run dev              # Start dev server at localhost:3000
npm run build            # Production build (runs prisma generate)
npm run lint             # Run ESLint

# Database
npm run db:migrate       # Run Prisma migrations
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database

# Type checking
npx tsc --noEmit         # Check TypeScript types
```

## 关键文件

| 文件 | 用途 |
|------|------|
| `prompts.config.ts` | 主应用配置（品牌定制、主题、认证、功能） |
| `prisma/schema.prisma` | 数据库 schema |
| `src/lib/auth/index.ts` | NextAuth 配置 |
| `src/lib/db.ts` | Prisma 客户端单例 |
| `messages/*.json` | i18n 翻译文件 |

## 项目结构

```
src/
├── app/              # Next.js App Router pages
│   ├── (auth)/       # Login, register
│   ├── api/          # API routes
│   ├── prompts/      # Prompt CRUD pages
│   └── admin/        # Admin dashboard
├── components/       # React components
│   ├── ui/           # shadcn/ui base components
│   └── prompts/      # Prompt-related components
└── lib/              # Utilities and config
    ├── ai/           # OpenAI integration
    ├── auth/         # NextAuth setup
    └── plugins/      # Auth and storage plugins
```

## 代码模式

- 默认使用 **Server Components**，仅在需要时使用 `"use client"`
- **翻译：** 使用 next-intl 的 `useTranslations()` 或 `getTranslations()`
- **样式：** Tailwind CSS，条件类名用 `cn()` 工具函数
- **表单：** React Hook Form + Zod 校验
- **数据库：** 使用 `@/lib/db` 的 Prisma client

## 提交前

1. 运行 `npm run lint` 检查问题
2. 为所有面向用户的文本添加翻译
3. 复用 `src/components/ui/` 中的现有 UI 组件
4. 绝不提交密钥（使用 `.env`）

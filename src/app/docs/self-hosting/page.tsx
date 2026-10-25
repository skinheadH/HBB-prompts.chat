import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { Server, Database, Key, Palette, Globe, Settings, Cpu } from "lucide-react";
import DeepWikiIcon from "@/../public/deepwiki.svg";
import Context7Icon from "@/../public/context7.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo.selfHosting");
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/docs/self-hosting",
  });
}

export default async function SelfHostingPage() {
  const t = await getTranslations("selfHosting");

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-2xl font-bold mb-2">自托管指南</h1>
      <p className="text-muted-foreground mb-8">
        部署属于你自己的 HBB Prompts 实例，支持自定义品牌定制、主题和身份验证。
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10">
        {/* Features */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Server className="h-5 w-5" />
            你将获得
          </h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>精选提示词库，收录 100+ 经社区测试的提示词</li>
            <li>自定义品牌定制、Logo 和主题</li>
            <li>多种身份验证提供方（GitHub、Google、Azure、凭据）</li>
            <li>AI 驱动的语义搜索与生成（可选）</li>
            <li>多语言支持（11 个语言区域）</li>
            <li>CC0 许可——可自由用于任何用途</li>
          </ul>
        </section>

        {/* Using Documentation AI-Agents */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">使用文档 AI 智能体</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* DeepWiki */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Image src={DeepWikiIcon} alt="" width={20} height={20} />
                DeepWiki
              </h3>
              <p className="text-muted-foreground">
                <Link 
                  href="https://deepwiki.com/skinheadH/HBB-prompts.chat" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline hover:text-foreground"
                >
                  DeepWiki
                </Link>
                {" "}为该仓库提供 AI 驱动的文档与洞察。
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                <li>从源代码生成的 AI 文档</li>
                <li>交互式代码库浏览</li>
                <li>架构图与组件关系</li>
                <li>可作为 MCP 服务器使用</li>
              </ul>
            </div>

            {/* Context7 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Image src={Context7Icon} alt="" width={20} height={20} className="rounded" />
                Context7
              </h3>
              <p className="text-muted-foreground">
                <Link 
                  href="https://context7.com/skinheadH/HBB-prompts.chat?tab=chat" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline hover:text-foreground"
                >
                  Context7
                </Link>
                {" "}是一个用于浏览和理解该代码库的 AI 对话界面。
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                <li>用自然语言与代码库对话</li>
                <li>获得附带代码引用的回答</li>
                <li>快速理解实现细节</li>
                <li>可作为 MCP 服务器使用</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Manually */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">手动部署</h2>

          {/* Prerequisites */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Database className="h-5 w-5" />
              前置条件
            </h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>{t("prerequisites.nodeJs")}</li>
              <li>{t("prerequisites.postgresql")}</li>
              <li>{t("prerequisites.npm")}</li>
            </ul>
          </div>

          {/* Recommended Database */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Database className="h-5 w-5" />
              推荐的数据库
            </h3>
            <div className="rounded-lg border p-4 space-y-4">
              <p className="text-muted-foreground">
                HBB Prompts 需要 PostgreSQL。对于托管数据库，我们推荐{" "}
                <Link
                  href="https://neon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  Neon
                </Link>
                {" "}，它提供 Serverless Postgres、连接池和数据库分支。
              </p>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">赞助商</p>
                <Link
                  href="https://neon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Image
                    src="/sponsors/neon.svg"
                    alt="Neon"
                    width={250}
                    height={72}
                    className="h-10 w-auto dark:hidden"
                  />
                  <Image
                    src="/sponsors/neon-dark.svg"
                    alt="Neon"
                    width={250}
                    height={72}
                    className="h-10 w-auto hidden dark:block"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Installation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">快速开始</h3>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1 overflow-x-auto">
            <p className="text-muted-foreground"># Clone the repository</p>
            <p>git clone https://github.com/skinheadH/HBB-prompts.chat.git</p>
            <p>cd prompts.chat</p>
            <p className="text-muted-foreground mt-3"># Install dependencies</p>
            <p>npm install</p>
            <p className="text-muted-foreground mt-3"># Configure environment</p>
            <p>cp .env.example .env</p>
            <p className="text-muted-foreground mt-3"># Run migrations & seed</p>
            <p>npm run db:migrate</p>
            <p>npm run db:seed</p>
            <p className="text-muted-foreground mt-3"># Start development server</p>
            <p>npm run dev</p>
          </div>
          </div>

          {/* Environment Variables */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Key className="h-5 w-5" />
              环境变量
            </h3>
          <p className="text-muted-foreground">
            基于 <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.env.example</code> 创建 <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.env</code> 文件：
          </p>

          {/* Core Variables */}
          <div className="space-y-3">
            <h3 className="font-medium">核心（必填）</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[240px]">变量名</TableHead>
                    <TableHead>说明</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">DATABASE_URL</TableCell>
                    <TableCell className="text-muted-foreground text-sm">PostgreSQL 连接字符串。Serverless 环境请添加 <code className="text-xs">?connection_limit=5&pool_timeout=10</code>。</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">NEXTAUTH_URL</TableCell>
                    <TableCell className="text-muted-foreground text-sm">你的应用 URL（例如 <code className="text-xs">http://localhost:3000</code>）</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">NEXTAUTH_SECRET</TableCell>
                    <TableCell className="text-muted-foreground text-sm">用于 NextAuth 会话加密的随机密钥</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* OAuth Variables */}
          <div className="space-y-3">
            <h3 className="font-medium">OAuth 提供方（可选）</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[240px]">变量名</TableHead>
                    <TableHead>说明</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">GITHUB_CLIENT_ID</TableCell>
                    <TableCell className="text-muted-foreground text-sm">GitHub OAuth 应用的客户端 ID</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">GITHUB_CLIENT_SECRET</TableCell>
                    <TableCell className="text-muted-foreground text-sm">GitHub OAuth 应用的客户端密钥</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">GOOGLE_CLIENT_ID</TableCell>
                    <TableCell className="text-muted-foreground text-sm">Google OAuth 客户端 ID</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">GOOGLE_CLIENT_SECRET</TableCell>
                    <TableCell className="text-muted-foreground text-sm">Google OAuth 客户端密钥</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">AZURE_AD_CLIENT_ID</TableCell>
                    <TableCell className="text-muted-foreground text-sm">Azure AD 应用程序的客户端 ID</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">AZURE_AD_CLIENT_SECRET</TableCell>
                    <TableCell className="text-muted-foreground text-sm">Azure AD 应用程序的客户端密钥</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">AZURE_AD_TENANT_ID</TableCell>
                    <TableCell className="text-muted-foreground text-sm">Azure AD 租户 ID</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Storage Variables */}
          <div className="space-y-3">
            <h3 className="font-medium">存储提供方（可选）</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[240px]">变量名</TableHead>
                    <TableHead>说明</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">ENABLED_STORAGE</TableCell>
                    <TableCell className="text-muted-foreground text-sm"><code className="text-xs">url</code> | <code className="text-xs">s3</code> | <code className="text-xs">do-spaces</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">S3_BUCKET</TableCell>
                    <TableCell className="text-muted-foreground text-sm">S3 存储桶名称</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">S3_REGION</TableCell>
                    <TableCell className="text-muted-foreground text-sm">S3 区域（例如 us-east-1）</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">S3_ACCESS_KEY_ID</TableCell>
                    <TableCell className="text-muted-foreground text-sm">S3 访问密钥</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">S3_SECRET_ACCESS_KEY</TableCell>
                    <TableCell className="text-muted-foreground text-sm">S3 秘密密钥</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">S3_ENDPOINT</TableCell>
                    <TableCell className="text-muted-foreground text-sm">兼容 S3 的服务（如 MinIO）的自定义端点</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">DO_SPACES_*</TableCell>
                    <TableCell className="text-muted-foreground text-sm">DigitalOcean Spaces：BUCKET、REGION、ACCESS_KEY_ID、SECRET_ACCESS_KEY、CDN_ENDPOINT</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* AI Variables */}
          <div className="space-y-3">
            <h3 className="font-medium">AI 功能（可选）</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[240px]">变量名</TableHead>
                    <TableHead>说明</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">OPENAI_API_KEY</TableCell>
                    <TableCell className="text-muted-foreground text-sm">用于 AI 搜索与生成的 OpenAI API 密钥</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">OPENAI_BASE_URL</TableCell>
                    <TableCell className="text-muted-foreground text-sm">兼容 OpenAI 的 API 的自定义基础 URL</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">OPENAI_EMBEDDING_MODEL</TableCell>
                    <TableCell className="text-muted-foreground text-sm">嵌入模型（默认：<code className="text-xs">text-embedding-3-small</code>）</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">OPENAI_GENERATIVE_MODEL</TableCell>
                    <TableCell className="text-muted-foreground text-sm">生成模型（默认：<code className="text-xs">gpt-4o-mini</code>）</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Analytics */}
          <div className="space-y-3">
            <h3 className="font-medium">分析（可选）</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[240px]">变量名</TableHead>
                    <TableHead>说明</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">GOOGLE_ANALYTICS_ID</TableCell>
                    <TableCell className="text-muted-foreground text-sm">Google Analytics 衡量 ID（例如 <code className="text-xs">G-XXXXXXXXX</code>）</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          </div>

          {/* Configuration */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Palette className="h-5 w-5" />
              配置（prompts.config.ts）
            </h3>
          <p className="text-muted-foreground">
            通过编辑 <code className="bg-muted px-1.5 py-0.5 rounded text-sm">prompts.config.ts</code> 自定义你的实例：
          </p>

          {/* Branding */}
          <div className="space-y-3">
            <h3 className="font-medium">品牌定制</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">选项</TableHead>
                    <TableHead className="w-[120px]">类型</TableHead>
                    <TableHead>说明</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">name</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-muted-foreground text-sm">在页眉和页脚显示的应用名称</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">logo</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-muted-foreground text-sm">浅色模式 Logo 的路径</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">logoDark</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-muted-foreground text-sm">深色模式 Logo 的路径</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">favicon</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-muted-foreground text-sm">favicon 的路径</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">description</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-muted-foreground text-sm">用于 SEO 和首页的应用描述</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-3">
            <h3 className="font-medium">主题</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">选项</TableHead>
                    <TableHead className="w-[200px]">可选值</TableHead>
                    <TableHead>说明</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">radius</TableCell>
                    <TableCell className="text-muted-foreground text-xs"><code>none</code> | <code>sm</code> | <code>md</code> | <code>lg</code></TableCell>
                    <TableCell className="text-muted-foreground text-sm">UI 组件的边框圆角</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">variant</TableCell>
                    <TableCell className="text-muted-foreground text-xs"><code>flat</code> | <code>default</code> | <code>brutal</code></TableCell>
                    <TableCell className="text-muted-foreground text-sm">UI 风格变体</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">density</TableCell>
                    <TableCell className="text-muted-foreground text-xs"><code>compact</code> | <code>default</code> | <code>comfortable</code></TableCell>
                    <TableCell className="text-muted-foreground text-sm">间距密度</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">colors.primary</TableCell>
                    <TableCell className="text-muted-foreground text-xs">hex or oklch</TableCell>
                    <TableCell className="text-muted-foreground text-sm">品牌主色（例如 <code>#6366f1</code>）</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Auth */}
          <div className="space-y-3">
            <h3 className="font-medium">身份验证</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">选项</TableHead>
                    <TableHead className="w-[200px]">可选值</TableHead>
                    <TableHead>说明</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">providers</TableCell>
                    <TableCell className="text-muted-foreground text-xs">array</TableCell>
                    <TableCell className="text-muted-foreground text-sm"><code>credentials</code>, <code>github</code>, <code>google</code>, <code>azure</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">allowRegistration</TableCell>
                    <TableCell className="text-muted-foreground text-xs">boolean</TableCell>
                    <TableCell className="text-muted-foreground text-sm">允许公开注册（仅限凭据提供方）</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* i18n */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              国际化
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">选项</TableHead>
                    <TableHead className="w-[200px]">类型</TableHead>
                    <TableHead>说明</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">locales</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string[]</TableCell>
                    <TableCell className="text-muted-foreground text-sm">支持的语言区域：en、tr、es、zh、ja、ar、pt、fr、it、de、ko</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">defaultLocale</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-muted-foreground text-sm">默认语言</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              功能
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">选项</TableHead>
                    <TableHead className="w-[100px]">默认值</TableHead>
                    <TableHead>说明</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">privatePrompts</TableCell>
                    <TableCell className="text-muted-foreground text-xs">true</TableCell>
                    <TableCell className="text-muted-foreground text-sm">允许用户创建私有提示词</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">changeRequests</TableCell>
                    <TableCell className="text-muted-foreground text-xs">true</TableCell>
                    <TableCell className="text-muted-foreground text-sm">启用带变更请求的版本控制</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">categories</TableCell>
                    <TableCell className="text-muted-foreground text-xs">true</TableCell>
                    <TableCell className="text-muted-foreground text-sm">启用提示词分类</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">tags</TableCell>
                    <TableCell className="text-muted-foreground text-xs">true</TableCell>
                    <TableCell className="text-muted-foreground text-sm">启用提示词标签</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">aiSearch</TableCell>
                    <TableCell className="text-muted-foreground text-xs">false</TableCell>
                    <TableCell className="text-muted-foreground text-sm">AI 驱动的语义搜索（需要 OPENAI_API_KEY）</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">aiGeneration</TableCell>
                    <TableCell className="text-muted-foreground text-xs">false</TableCell>
                    <TableCell className="text-muted-foreground text-sm">AI 驱动的生成功能（需要 OPENAI_API_KEY）</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          </div>

          {/* White-label */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Settings className="h-5 w-5" />
              白标模式
            </h3>
          <p className="text-muted-foreground">
            在配置顶部设置 <code className="bg-muted px-1.5 py-0.5 rounded text-sm">useCloneBranding = true</code> 以：
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>在首页显示你的站点名称和描述</li>
            <li>将你的 Logo 用作首屏背景水印</li>
            <li>隐藏 HBB Prompts 的成就（GitHub Star 数、Forbes 等）</li>
            <li>隐藏赞助商区域和&quot;成为赞助商&quot;按钮</li>
            <li>隐藏&quot;在 GitHub 上克隆&quot;按钮</li>
          </ul>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <p className="text-muted-foreground">{"// prompts.config.ts"}</p>
            <p>const useCloneBranding = true;</p>
          </div>
          </div>

          {/* Production */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Globe className="h-5 w-5" />
              生产环境部署
            </h3>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
            <p>npm run build</p>
            <p>npm run start</p>
          </div>
          <p className="text-muted-foreground">
            部署到 Vercel、Railway、Render 或任何 Node.js 托管平台。请确保在托管服务商的控制面板中设置所有环境变量。
          </p>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">支持</h3>
          <p className="text-muted-foreground">
            如有问题和疑问，请提交{" "}
            <Link 
              href="https://github.com/skinheadH/HBB-prompts.chat/issues" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline hover:text-foreground"
            >
              GitHub Issue
            </Link>
            。完整文档请参阅仓库中的{" "}
            <Link 
              href="https://github.com/skinheadH/HBB-prompts.chat/blob/main/SELF-HOSTING.md" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline hover:text-foreground"
            >
              SELF-HOSTING.md
            </Link>
            {" "}文件。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

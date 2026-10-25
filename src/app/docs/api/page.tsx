import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { Code, Zap, Terminal, Search, Box, Key, Save, Sparkles, Cpu, FilePlus, FileX } from "lucide-react";
import { ImprovePromptDemo } from "@/components/api/improve-prompt-demo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { McpConfigTabs } from "@/components/mcp/mcp-config-tabs";
import config from "@/../prompts.config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo.apiDocs");
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/docs/api",
  });
}

export default async function ApiDocsPage() {
  const headersList = await headers();
  const host = headersList.get("host") || "prompts.chat";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-2xl font-bold mb-2">API 文档</h1>
      <p className="text-muted-foreground mb-8">
        {config.features.mcp !== false 
          ? "HBB Prompts 提供了一套 MCP 优先的 API，可用于以编程方式搜索和发现 AI 提示词。你可以直接与任何兼容 MCP 的客户端一起使用 MCP 端点，也可以发送标准 HTTP 请求。"
          : "HBB Prompts 提供了一套 API，可用于以编程方式搜索和发现 AI 提示词。"
        }
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10">
        {config.features.mcp !== false && (
          <>
            {/* MCP Overview */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="h-5 w-5" />
                MCP 优先 API
              </h2>
              <p className="text-muted-foreground">
                我们的 API 基于{" "}
                <Link
                  href="https://modelcontextprotocol.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  Model Context Protocol (MCP)
                </Link>
                ，可与 AI 助手、IDE 和自动化工具无缝集成。
                同一端点既适用于 MCP 客户端，也适用于传统的 REST 风格请求。
              </p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <p className="text-muted-foreground"># MCP Endpoint</p>
                <p>POST {baseUrl}/api/mcp</p>
              </div>
            </section>

            {/* Using with MCP Clients */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                在 MCP 客户端中使用
              </h2>
              <p className="text-muted-foreground">
                将 HBB Prompts 添加到你的 MCP 客户端配置中。请在下方选择你的客户端和连接类型：
              </p>
              <McpConfigTabs baseUrl={baseUrl} className="[&_button]:text-sm [&_button]:px-3 [&_button]:py-1.5 [&_pre]:text-sm [&_pre]:p-4" />
              <p className="text-muted-foreground text-sm">
                <strong>远程</strong>直接连接到 HBB Prompts API。<strong>本地</strong>通过 npx 在本地运行 MCP 服务器。
              </p>
            </section>

            {/* Authentication */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Key className="h-5 w-5" />
                认证
              </h2>
              <p className="text-muted-foreground">
                大多数 API 功能无需认证即可使用。但是，若要通过 MCP 保存提示词或访问你的私有提示词，
                你需要使用 API 密钥进行认证。
              </p>
              
              <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-3">
                <div>
                  <p className="font-medium">生成 API 密钥</p>
                  <p className="text-muted-foreground">
                    前往{" "}
                    <Link href="/settings" className="underline hover:text-foreground">
                      设置
                    </Link>
                    {" "}生成你的 API 密钥。密钥以 <code className="bg-muted px-1.5 py-0.5 rounded">pchat_</code> 开头。
                  </p>
                </div>
                <div>
                  <p className="font-medium">使用 API 密钥</p>
                  <p className="text-muted-foreground">
                    通过 <code className="bg-muted px-1.5 py-0.5 rounded">PROMPTS_API_KEY</code> 请求头传递你的 API 密钥。
                  </p>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`# Remote: HTTP transport with headers
"prompts-chat": {
  "url": "${baseUrl}/api/mcp",
  "headers": {
    "PROMPTS_API_KEY": "pchat_your_api_key_here"
  }
}

# Local: stdio transport with environment variable
"prompts-chat": {
  "command": "npx",
  "args": ["-y", "@fkadev/prompts.chat-mcp"],
  "env": {
    "PROMPTS_API_KEY": "pchat_your_api_key_here"
  }
}

# Or via curl (remote)
curl -X POST ${baseUrl}/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "PROMPTS_API_KEY: pchat_your_api_key_here" \\
  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}'`}</pre>
              </div>

              <p className="text-muted-foreground text-sm">
                <strong>远程（HTTP）</strong>会在请求头中携带 API 密钥，向 HBB Prompts 发送请求。 
                <strong> 本地（stdio）</strong>通过 npx 在本地运行 MCP 服务器，并将 API 密钥作为环境变量传入。
                完成认证后，你可以使用 <code className="bg-muted px-1.5 py-0.5 rounded">save_prompt</code> 工具，
                并且搜索结果将包含你的私有提示词。
              </p>
            </section>

            {/* MCP Prompts */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                MCP 提示词
              </h2>
              <p className="text-muted-foreground">
                所有公开提示词都会以原生 MCP 提示词的形式暴露。这样 MCP 客户端就可以通过斜杠命令或
                提示词选择器直接列出并使用提示词。你还可以使用 URL 查询参数
                按分类或标签筛选提示词。
              </p>
              
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`# Filter by users (one or more usernames)
"prompts-chat": {
  "url": "${baseUrl}/api/mcp?users=f,torvalds"
}

# Filter by categories
"prompts-chat": {
  "url": "${baseUrl}/api/mcp?categories=coding,marketing"
}

# Filter by tags
"prompts-chat": {
  "url": "${baseUrl}/api/mcp?tags=chatgpt,writing"
}

# Combine filters
"prompts-chat": {
  "url": "${baseUrl}/api/mcp?users=f&categories=coding&tags=js"
}`}</pre>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-3">
                <div>
                  <p className="font-medium">prompts/list</p>
                  <p className="text-muted-foreground">浏览所有可用提示词，支持分页。</p>
                </div>
                <div>
                  <p className="font-medium">prompts/get</p>
                  <p className="text-muted-foreground">
                    按 ID 获取提示词。变量（{"${name}"} 或 {"${name:default}"}）会自动
                    替换为调用方提供的参数。
                  </p>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`# List prompts
curl -X POST ${baseUrl}/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{"jsonrpc": "2.0", "id": 1, "method": "prompts/list"}'

# Get a specific prompt with arguments
curl -X POST ${baseUrl}/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "prompts/get",
    "params": {
      "name": "code-review-assistant",
      "arguments": { "topic": "AI safety" }
    }
  }'`}</pre>
              </div>
            </section>

            {/* Available Tools */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Box className="h-5 w-5" />
                可用工具
              </h2>

          {/* search_prompts Tool */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Search className="h-4 w-4" />
              search_prompts
            </h3>
            <p className="text-muted-foreground">
              按关键词搜索 AI 提示词。返回匹配的提示词，包含标题、描述、
              内容、作者、分类和标签。
            </p>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">参数</TableHead>
                    <TableHead className="w-[100px]">类型</TableHead>
                    <TableHead className="w-[80px]">必填</TableHead>
                    <TableHead>描述</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">query</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">是</TableCell>
                    <TableCell className="text-muted-foreground text-sm">用于查找相关提示词的搜索关键词</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">limit</TableCell>
                    <TableCell className="text-muted-foreground text-xs">number</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">返回结果的最大数量（默认：10，最大：50）</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">type</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      按类型筛选：<code className="text-xs">TEXT</code>、<code className="text-xs">STRUCTURED</code>、<code className="text-xs">IMAGE</code>、<code className="text-xs">VIDEO</code>、<code className="text-xs">AUDIO</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">category</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">按分类 slug 筛选</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">tag</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">按标签 slug 筛选</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* get_prompt Tool */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Box className="h-4 w-4" />
              get_prompt
            </h3>
            <p className="text-muted-foreground">
              按 ID 获取提示词。如果提示词包含模板变量（如 {"${variable}"} 或 {"${variable:default}"}），
              MCP 客户端会被要求通过 elicitation 提供相应的值。
            </p>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">参数</TableHead>
                    <TableHead className="w-[100px]">类型</TableHead>
                    <TableHead className="w-[80px]">必填</TableHead>
                    <TableHead>描述</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">id</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">是</TableCell>
                    <TableCell className="text-muted-foreground text-sm">要获取的提示词的 ID</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">Variable Elicitation</p>
              <p className="text-muted-foreground">
                当提示词包含类似 {"${name}"} 或 {"${topic:default value}"} 的变量时，支持 elicitation 的 MCP
                客户端会提示用户填写这些值。带有默认值（冒号后的部分）的变量是
                可选的。返回的提示词内容中，变量会被替换为
                对应的值。
              </p>
            </div>
          </div>

          {/* save_prompt Tool */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Save className="h-4 w-4" />
              save_prompt
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">需要认证</span>
            </h3>
            <p className="text-muted-foreground">
              将一个新提示词保存到你的账户。需要 API 密钥认证。除非你在设置中
              更改了默认选项，否则提示词默认是私有的。
            </p>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px]">参数</TableHead>
                    <TableHead className="w-[100px]">类型</TableHead>
                    <TableHead className="w-[80px]">必填</TableHead>
                    <TableHead>描述</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">title</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">是</TableCell>
                    <TableCell className="text-muted-foreground text-sm">提示词的标题（最多 200 个字符）</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">content</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">是</TableCell>
                    <TableCell className="text-muted-foreground text-sm">提示词的内容。可以包含类似 {"${var}"} 的变量</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">description</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">可选的描述（最多 500 个字符）</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">tags</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string[]</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">标签名称数组（最多 10 个）</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">category</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">分类 slug</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">isPrivate</TableCell>
                    <TableCell className="text-muted-foreground text-xs">boolean</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">覆盖默认的隐私设置</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">type</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      <code className="text-xs">TEXT</code>（默认）、<code className="text-xs">STRUCTURED</code>、<code className="text-xs">IMAGE</code>、<code className="text-xs">VIDEO</code>、<code className="text-xs">AUDIO</code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Save a prompt via MCP
curl -X POST ${baseUrl}/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "PROMPTS_API_KEY: pchat_your_api_key_here" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "save_prompt",
      "arguments": {
        "title": "My Code Review Prompt",
        "content": "Review this code for \${language} best practices:\\n\\n\${code}",
        "description": "A helpful code review assistant",
        "tags": ["coding", "review"],
        "isPrivate": false
      }
    }
  }'`}</pre>
            </div>
          </div>

          {/* improve_prompt Tool */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              improve_prompt
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">需要认证</span>
            </h3>
            <p className="text-muted-foreground">
              使用 AI 将一个基础提示词改写成结构清晰、内容全面的提示词。
              它会搜索相似提示词以获取灵感，并生成改进后的版本。
            </p>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px]">参数</TableHead>
                    <TableHead className="w-[100px]">类型</TableHead>
                    <TableHead className="w-[80px]">必填</TableHead>
                    <TableHead>描述</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">prompt</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">是</TableCell>
                    <TableCell className="text-muted-foreground text-sm">要改进的提示词（最多 10,000 个字符）</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">outputType</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      内容类型：<code className="text-xs">text</code>（默认）、<code className="text-xs">image</code>、<code className="text-xs">video</code>、<code className="text-xs">sound</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">outputFormat</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      响应格式：<code className="text-xs">text</code>（默认）、<code className="text-xs">structured_json</code>、<code className="text-xs">structured_yaml</code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Improve a prompt via MCP
curl -X POST ${baseUrl}/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "PROMPTS_API_KEY: pchat_your_api_key_here" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "improve_prompt",
      "arguments": {
        "prompt": "write a blog post about AI",
        "outputType": "text",
        "outputFormat": "text"
      }
    }
  }'`}</pre>
            </div>
          </div>

          {/* save_skill Tool */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              save_skill
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">需要认证</span>
            </h3>
            <p className="text-muted-foreground">
              将一个新的 Agent Skill 保存到你的账户。Skill 是可以包含 SKILL.md（必需）、
              参考文档、脚本和配置文件的多文件提示词。非常适合创建全面的编程智能体技能。
            </p>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px]">参数</TableHead>
                    <TableHead className="w-[100px]">类型</TableHead>
                    <TableHead className="w-[80px]">必填</TableHead>
                    <TableHead>描述</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">title</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">是</TableCell>
                    <TableCell className="text-muted-foreground text-sm">Skill 的标题（最多 200 个字符）</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">files</TableCell>
                    <TableCell className="text-muted-foreground text-xs">array</TableCell>
                    <TableCell className="text-xs">是</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      由 {`{filename, content}`} 组成的数组。必须包含 <code className="text-xs">SKILL.md</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">description</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">可选的描述（最多 500 个字符）</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">tags</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string[]</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">标签名称数组（最多 10 个）</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">category</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">分类 slug</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">isPrivate</TableCell>
                    <TableCell className="text-muted-foreground text-xs">boolean</TableCell>
                    <TableCell className="text-xs">否</TableCell>
                    <TableCell className="text-muted-foreground text-sm">覆盖默认的隐私设置</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Save a skill via MCP
curl -X POST ${baseUrl}/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "PROMPTS_API_KEY: pchat_your_api_key_here" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "save_skill",
      "arguments": {
        "title": "PDF Processing Skill",
        "description": "Comprehensive PDF manipulation toolkit",
        "files": [
          {"filename": "SKILL.md", "content": "# PDF Processing\\n\\nThis skill helps with PDF manipulation..."},
          {"filename": "reference.md", "content": "# API Reference\\n\\n..."},
          {"filename": "scripts/extract.py", "content": "import pypdf\\n..."}
        ],
        "tags": ["pdf", "documents"]
      }
    }
  }'`}</pre>
            </div>
          </div>

          {/* add_file_to_skill Tool */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <FilePlus className="h-4 w-4" />
              add_file_to_skill
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">需要认证</span>
            </h3>
            <p className="text-muted-foreground">
              向已有的 Agent Skill 添加一个新文件。可用于添加参考文档、脚本或配置文件。
            </p>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px]">参数</TableHead>
                    <TableHead className="w-[100px]">类型</TableHead>
                    <TableHead className="w-[80px]">必填</TableHead>
                    <TableHead>描述</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">skillId</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">是</TableCell>
                    <TableCell className="text-muted-foreground text-sm">要添加文件的 Skill 的 ID</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">filename</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">是</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      文件路径（例如 <code className="text-xs">reference.md</code>、<code className="text-xs">scripts/helper.py</code>）
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">content</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">是</TableCell>
                    <TableCell className="text-muted-foreground text-sm">文件内容</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* remove_file_from_skill Tool */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <FileX className="h-4 w-4" />
              remove_file_from_skill
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">需要认证</span>
            </h3>
            <p className="text-muted-foreground">
              从已有的 Agent Skill 中移除一个文件。无法移除 SKILL.md，因为它是必需的。
            </p>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px]">参数</TableHead>
                    <TableHead className="w-[100px]">类型</TableHead>
                    <TableHead className="w-[80px]">必填</TableHead>
                    <TableHead>描述</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">skillId</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">是</TableCell>
                    <TableCell className="text-muted-foreground text-sm">要移除文件的 Skill 的 ID</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">filename</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">是</TableCell>
                    <TableCell className="text-muted-foreground text-sm">要移除的文件路径（不能是 SKILL.md）</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* get_skill Tool */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              get_skill
            </h3>
            <p className="text-muted-foreground">
              按 ID 获取 Agent Skill，包括其所有文件（SKILL.md、参考文档、脚本等）。
              返回 Skill 的元数据和文件内容。公开的 Skill 无需认证即可访问；
              私有的 Skill 需要 API 密钥认证。
            </p>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px]">参数</TableHead>
                    <TableHead className="w-[100px]">类型</TableHead>
                    <TableHead className="w-[80px]">必填</TableHead>
                    <TableHead>描述</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">id</TableCell>
                    <TableCell className="text-muted-foreground text-xs">string</TableCell>
                    <TableCell className="text-xs">是</TableCell>
                    <TableCell className="text-muted-foreground text-sm">要获取的 Skill 的 ID</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Get a skill via MCP
curl -X POST ${baseUrl}/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "get_skill",
      "arguments": {
        "id": "skill_id_here"
      }
    }
  }'`}</pre>
            </div>
          </div>
        </section>

            {/* MCP Protocol Example */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Code className="h-5 w-5" />
                MCP 协议示例
              </h2>

              <div className="space-y-3">
                <h3 className="font-medium">初始化连接</h3>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`curl -X POST ${baseUrl}/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2024-11-05",
      "capabilities": {},
      "clientInfo": { "name": "my-app", "version": "1.0.0" }
    }
  }'`}</pre>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">列出可用工具</h3>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`curl -X POST ${baseUrl}/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/list"
  }'`}</pre>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">搜索提示词</h3>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`curl -X POST ${baseUrl}/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "search_prompts",
      "arguments": {
        "query": "code review",
        "limit": 5
      }
    }
  }'`}</pre>
                </div>
              </div>
            </section>

            {/* Response Format */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">响应格式</h2>
              <p className="text-muted-foreground">
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">search_prompts</code> 工具按以下格式返回结果：
              </p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`{
  "query": "code review",
  "count": 2,
  "prompts": [
    {
      "id": "abc123",
      "title": "Code Review Assistant",
      "description": "A prompt for conducting thorough code reviews",
      "content": "You are an expert code reviewer...",
      "type": "TEXT",
      "author": "username",
      "category": "Development",
      "tags": ["coding", "review", "development"],
      "votes": 42,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}`}</pre>
              </div>
            </section>
          </>
        )}

        {/* Improve Prompt API */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            改进提示词 API
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">需要认证</span>
          </h2>
          <p className="text-muted-foreground">
            使用 AI 将基础提示词改写成结构清晰、内容全面的提示词。
            该 API 使用 embeddings 查找相似提示词以获取灵感，并在
            保留原始意图的前提下生成改进版本。需要 API 密钥认证。
          </p>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium w-[120px]">参数</th>
                  <th className="text-left p-3 text-sm font-medium w-[100px]">类型</th>
                  <th className="text-left p-3 text-sm font-medium w-[80px]">必填</th>
                  <th className="text-left p-3 text-sm font-medium">描述</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">prompt</td>
                  <td className="p-3 text-muted-foreground text-xs">string</td>
                  <td className="p-3 text-xs">是</td>
                  <td className="p-3 text-muted-foreground text-sm">要改进的提示词（最多 10,000 个字符）</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">outputType</td>
                  <td className="p-3 text-muted-foreground text-xs">string</td>
                  <td className="p-3 text-xs">否</td>
                  <td className="p-3 text-muted-foreground text-sm">
                    内容类型：<code className="text-xs">text</code>（默认）、<code className="text-xs">image</code>、<code className="text-xs">video</code>、<code className="text-xs">sound</code>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">outputFormat</td>
                  <td className="p-3 text-muted-foreground text-xs">string</td>
                  <td className="p-3 text-xs">否</td>
                  <td className="p-3 text-muted-foreground text-sm">
                    响应格式：<code className="text-xs">text</code>（默认）、<code className="text-xs">structured_json</code>、<code className="text-xs">structured_yaml</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre>{`# Improve a prompt
curl -X POST ${baseUrl}/api/improve-prompt \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: pchat_your_api_key_here" \\
  -d '{
    "prompt": "write a blog post about AI",
    "outputType": "text",
    "outputFormat": "text"
  }'`}</pre>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-3">
            <div>
              <p className="font-medium mb-2">响应格式</p>
              <pre className="mt-2 text-xs text-muted-foreground">{`{
  "original": "write a blog post about AI",
  "improved": "You are an expert technology writer...\\n\\n## Task\\nWrite an engaging blog post...",
  "outputType": "text",
  "outputFormat": "text",
  "inspirations": [
    { "title": "Blog Writer", "similarity": 85 },
    { "title": "Content Creator", "similarity": 72 }
  ],
  "model": "gpt-4o"
}`}</pre>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="font-medium mb-4">在线试用</h3>
            <ImprovePromptDemo />
          </div>
        </section>

        {/* REST API Alternative */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">REST API</h2>
          <p className="text-muted-foreground">
            使用标准 REST 端点搜索和获取提示词：
          </p>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre>{`# Search prompts via REST
curl "${baseUrl}/api/prompts?q=code+review&perPage=10"

# Get prompt by ID
curl "${baseUrl}/api/prompts/{id}"`}</pre>
          </div>
        </section>

        {/* Rate Limits */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">速率限制</h2>
          <p className="text-muted-foreground">
            该 API 公开且免费使用。请合理控制请求频率。
            如果有大量使用的需求，可以考虑{" "}
            <Link
              href="/docs/self-hosting"
              className="underline hover:text-foreground"
            >
              自建托管你自己的实例
            </Link>
            。
          </p>
        </section>

        {/* Support */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">支持</h2>
          <p className="text-muted-foreground">
            如有问题或功能建议，请提交{" "}
            <Link
              href="https://github.com/skinheadH/HBB-prompts.chat/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              GitHub Issue
            </Link>
            。
          </p>
        </section>
      </div>
    </div>
  );
}

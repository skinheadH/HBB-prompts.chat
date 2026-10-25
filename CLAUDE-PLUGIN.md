# Claude Code 插件

通过官方插件在 [Claude Code](https://code.claude.com) 里直接访问 HBB Prompts。搜索提示词、发现技能、改进你的提示词，全程不用离开 IDE。

## 安装

把 prompts.chat marketplace 添加到 Claude Code：

```
/plugin marketplace add skinheadH/HBB-prompts.chat
```

然后安装插件：

```
/plugin install prompts.chat@prompts.chat
```

## 功能

| Feature | Description |
|---------|-------------|
| **MCP Server** | 连接 HBB Prompts API，实时访问提示词 |
| **Commands** | `/prompts.chat:prompts` 和 `/prompts.chat:skills` slash 命令 |
| **Agents** | Prompt Manager 和 Skill Manager 代理，用于复杂工作流 |
| **Skills** | 自动激活的技能，用于发现提示词和技能 |

## 命令

### 搜索提示词

```
/prompts.chat:prompts <query>
/prompts.chat:prompts <query> --type IMAGE
/prompts.chat:prompts <query> --category coding
/prompts.chat:prompts <query> --tag productivity
```

**示例：**

```
/prompts.chat:prompts code review
/prompts.chat:prompts writing assistant --category writing
/prompts.chat:prompts midjourney --type IMAGE
/prompts.chat:prompts react developer --tag coding
```

### 搜索技能

```
/prompts.chat:skills <query>
/prompts.chat:skills <query> --category coding
/prompts.chat:skills <query> --tag automation
```

**示例：**

```
/prompts.chat:skills testing automation
/prompts.chat:skills documentation --category coding
/prompts.chat:skills api integration
```

## MCP 工具

该插件通过 HBB Prompts MCP 服务器提供以下工具：

### 提示词工具

| Tool | Description |
|------|-------------|
| `search_prompts` | 按关键词、分类、标签或类型搜索提示词 |
| `get_prompt` | 获取提示词并做变量替换 |
| `save_prompt` | 保存新提示词（需要 API key） |
| `improve_prompt` | 用 AI 改进提示词 |

### 技能工具

| Tool | Description |
|------|-------------|
| `search_skills` | 搜索 Agent Skills |
| `get_skill` | 获取技能及其所有文件 |
| `save_skill` | 创建多文件技能（需要 API key） |
| `add_file_to_skill` | 向已有技能添加文件 |
| `update_skill_file` | 更新技能中的文件 |
| `remove_file_from_skill` | 从技能中删除文件 |

## 代理

### Prompt Manager

`prompt-manager` 代理可以帮你：
- 在 HBB Prompts 上搜索提示词
- 获取并填充提示词变量
- 把新提示词保存到你的账户
- 用 AI 改进提示词

### Skill Manager

`skill-manager` 代理可以帮你：
- 搜索 Agent Skills
- 获取并把技能安装到你的工作区
- 创建包含多个文件的新技能
- 管理技能文件内容

## 技能（自动激活）

### 提示词查找

在以下情况自动激活：
- 索取提示词模板
- 想搜索提示词
- 需要改进某个提示词
- 提到 HBB Prompts

### 技能查找

在以下情况自动激活：
- 索取 Agent Skills
- 想扩展 Claude 的能力
- 需要安装技能
- 提到 Claude 的技能

## 认证

要保存提示词和技能，你需要从 [prompts.chat/settings](https://prompts.chat/settings) 获取 API key。

### 选项 1：环境变量

设置 `PROMPTS_API_KEY` 环境变量：

```bash
export PROMPTS_API_KEY=your_api_key_here
```

### 选项 2：MCP Header

连接 MCP 服务器时带上该 header：

```
PROMPTS_API_KEY: your_api_key_here
```

## 插件结构

```
plugins/claude/prompts.chat/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── .mcp.json                 # MCP server configuration
├── commands/
│   ├── prompts.md           # /prompts.chat:prompts command
│   └── skills.md            # /prompts.chat:skills command
├── agents/
│   ├── prompt-manager.md    # Prompt management agent
│   └── skill-manager.md     # Skill management agent
└── skills/
    ├── prompt-lookup/
    │   └── SKILL.md         # Prompt discovery skill
    └── skill-lookup/
        └── SKILL.md         # Skill discovery skill
```

## 链接

- **[HBB Prompts](https://prompts.chat)** - 浏览所有提示词和技能
- **[API Documentation](https://prompts.chat/api/mcp)** - MCP 服务器端点
- **[Settings](https://prompts.chat/settings)** - 获取你的 API key

# Docker 部署指南

使用 Docker Compose 运行你自己的 HBB Prompts 实例。

[`compose.yml`](/compose.yml) 支持两种方式：从 ghcr.io 拉取预构建容器镜像，或在本地构建。

## 快速开始

### 本地构建

```bash
git clone https://github.com/skinheadH/HBB-prompts.chat.git
cd HBB-prompts.chat
docker compose up -d --build
```

在浏览器中打开 http://localhost:4444。

### 使用预构建镜像

只需从命令中去掉 `--build` 参数：

```bash
git clone https://github.com/skinheadH/HBB-prompts.chat.git
cd HBB-prompts.chat
docker compose up -d
```

## 独立部署（自备数据库）

如果你已有 PostgreSQL 实例，可以只运行应用容器：

需要托管式 PostgreSQL 数据库？[Neon](https://neon.com) 提供带连接池和数据库分支功能的 serverless Postgres。

```bash
docker build -f docker/Dockerfile -t hbb-prompts .
docker run -d \
  --name prompts \
  -p 4444:3000 \
  -e DATABASE_URL="postgresql://user:pass@your-db-host:5432/prompts?schema=public" \
  -e AUTH_SECRET="$(openssl rand -base64 32)" \
  prompts.chat
```

或者直接用预构建镜像：

```bash
docker run -d \
  --name prompts \
  -p 4444:3000 \
  -e DATABASE_URL="postgresql://user:pass@your-db-host:5432/prompts?schema=public" \
  -e AUTH_SECRET="$(openssl rand -base64 32)" \
  ghcr.io/skinheadH/prompts.chat:latest
```

## 自定义品牌

所有品牌定制都通过 `PCHAT_*` 环境变量在运行时配置——无需重新构建。

```yaml
# compose.yml
services:
  app:
    environment:
      # ... existing vars ...
      PCHAT_NAME: "Acme Prompts"
      PCHAT_DESCRIPTION: "Our team's AI prompt library"
      PCHAT_COLOR: "#ff6600"
      PCHAT_AUTH_PROVIDERS: "github,google"
      PCHAT_LOCALES: "en,es,fr"
```

然后重启：`docker compose up -d`

## 配置变量

所有变量都带 `PCHAT_` 前缀，以避免冲突。

#### 品牌定制（`branding.*` in prompts.config.ts）

| Env Variable | Config Path | Description | Default |
|--------------|-------------|-------------|---------|
| `PCHAT_NAME` | `branding.name` | 界面显示的应用名称 | `My Prompt Library` |
| `PCHAT_DESCRIPTION` | `branding.description` | 应用描述 | `Collect, organize...` |
| `PCHAT_LOGO` | `branding.logo` | Logo 路径（位于 public/） | `/logo.svg` |
| `PCHAT_LOGO_DARK` | `branding.logoDark` | 暗色模式 Logo | 同 `PCHAT_LOGO` |
| `PCHAT_FAVICON` | `branding.favicon` | Favicon 路径 | `/logo.svg` |

#### 主题（`theme.*` in prompts.config.ts）

| Env Variable | Config Path | Description | Default |
|--------------|-------------|-------------|---------|
| `PCHAT_COLOR` | `theme.colors.primary` | 主色调（十六进制） | `#6366f1` |
| `PCHAT_THEME_RADIUS` | `theme.radius` | 圆角：`none\|sm\|md\|lg` | `sm` |
| `PCHAT_THEME_VARIANT` | `theme.variant` | 界面风格：`default\|flat\|brutal` | `default` |
| `PCHAT_THEME_DENSITY` | `theme.density` | 间距：`compact\|default\|comfortable` | `default` |

#### 认证（`auth.*` in prompts.config.ts）

| Env Variable | Config Path | Description | Default |
|--------------|-------------|-------------|---------|
| `PCHAT_AUTH_PROVIDERS` | `auth.providers` | 认证提供商：`github,google,credentials` | `credentials` |
| `PCHAT_ALLOW_REGISTRATION` | `auth.allowRegistration` | 允许公开注册 | `true` |

#### 国际化（`i18n.*` in prompts.config.ts）

| Env Variable | Config Path | Description | Default |
|--------------|-------------|-------------|---------|
| `PCHAT_LOCALES` | `i18n.locales` | 支持的语言（逗号分隔） | `en` |
| `PCHAT_DEFAULT_LOCALE` | `i18n.defaultLocale` | 默认语言 | `en` |

#### 功能开关（`features.*` in prompts.config.ts）

| Env Variable | Config Path | Description | Default |
|--------------|-------------|-------------|---------|
| `PCHAT_FEATURE_PRIVATE_PROMPTS` | `features.privatePrompts` | 启用私有提示词 | `true` |
| `PCHAT_FEATURE_CHANGE_REQUESTS` | `features.changeRequests` | 启用版本管理 | `true` |
| `PCHAT_FEATURE_CATEGORIES` | `features.categories` | 启用分类 | `true` |
| `PCHAT_FEATURE_TAGS` | `features.tags` | 启用标签 | `true` |
| `PCHAT_FEATURE_COMMENTS` | `features.comments` | 启用评论 | `true` |
| `PCHAT_FEATURE_AI_SEARCH` | `features.aiSearch` | 启用 AI 搜索 | `false` |
| `PCHAT_FEATURE_AI_GENERATION` | `features.aiGeneration` | 启用 AI 生成 | `false` |
| `PCHAT_FEATURE_MCP` | `features.mcp` | 启用 MCP 功能 | `false` |

## 系统环境变量

| Variable | Description | Default |
|----------|-------------|---------|
| `AUTH_SECRET` | 认证令牌密钥 | 自动生成（生产环境建议显式设置） |
| `DATABASE_URL` | PostgreSQL 连接字符串 | 在 compose.yml 中设置 |
| `DIRECT_URL` | 直连 PostgreSQL URL（绕过连接池） | 同 `DATABASE_URL` |
| `PORT` | 宿主机端口映射 | `4444` |

## 生产环境配置

生产环境下务必显式设置 `AUTH_SECRET`：

```bash
# Generate a secret
export AUTH_SECRET=$(openssl rand -base64 32)

# Start with explicit secret
docker compose up -d
```

或者把它写进 `compose.yml` 旁边的 `.env` 文件：

```env
AUTH_SECRET=your-secret-key-here
```

### 使用 OAuth 提供商

```yaml
# compose.yml
services:
  app:
    environment:
      # ... existing vars ...
      PCHAT_AUTH_PROVIDERS: "github,google"
      AUTH_GITHUB_ID: "your-github-client-id"
      AUTH_GITHUB_SECRET: "your-github-client-secret"
      AUTH_GOOGLE_ID: "your-google-client-id"
      AUTH_GOOGLE_SECRET: "your-google-client-secret"
```

### 使用 AI 功能（OpenAI）

```yaml
# compose.yml
services:
  app:
    environment:
      # ... existing vars ...
      PCHAT_FEATURE_AI_SEARCH: "true"
      OPENAI_API_KEY: "sk-..."
```

## 数据库种子数据

用示例提示词给数据库播种：

```bash
docker compose exec app npx prisma db seed
```

## 自定义 Logo

把你的 logo 文件挂载到应用容器中：

```yaml
# compose.yml
services:
  app:
    volumes:
      - ./my-logo.svg:/app/public/logo.svg
    environment:
      PCHAT_LOGO: "/logo.svg"
```

## 数据持久化

PostgreSQL 数据存储在名为 `postgres_data` 的卷中，容器重启、重新构建、镜像更新后都不会丢失。

### 备份

```bash
# Backup database
docker compose exec db pg_dump -U prompts prompts > backup.sql

# Restore database
docker compose exec -T db psql -U prompts prompts < backup.sql
```

## 本地构建

```bash
docker compose build
docker compose up -d
```

## 健康检查

应用容器提供健康检查端点：

```bash
curl http://localhost:4444/api/health
```

响应：

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected"
}
```

## 故障排查

### 查看日志

```bash
# All services
docker compose logs

# Follow logs
docker compose logs -f

# App logs only
docker compose logs app

# Database logs only
docker compose logs db
```

### 数据库访问

```bash
# Connect to PostgreSQL
docker compose exec db psql -U prompts -d prompts

# Run a query
docker compose exec db psql -U prompts -d prompts -c "SELECT COUNT(*) FROM \"Prompt\""
```

### 容器 Shell

```bash
docker compose exec app sh
docker compose exec db bash
```

### 常见问题

**应用容器反复重启：**
- 查看日志：`docker compose logs app`
- 数据库可能还没就绪——入口脚本会重试最多 60 秒

**数据库连接错误：**
- 确认 `db` 服务健康：`docker compose ps`
- 查看数据库日志：`docker compose logs db`

**认证问题：**
- 生产环境要显式设置 `AUTH_SECRET`
- 如果用了 OAuth，确认回调 URL 与你的域名匹配

## 更新

```bash
# If using pre-built images
docker compose pull
docker compose up -d

# If building locally
git pull
docker compose build
docker compose up -d
```

数据保存在 `postgres_data` 卷中，更新后依然保留。

## 从旧的单镜像部署迁移

如果你之前用的是一体式 Docker 镜像：

```bash
# 1. Export your database from the old container
docker exec prompts pg_dump -U prompts prompts > backup.sql

# 2. Stop and remove the old container
docker stop prompts && docker rm prompts

# 3. Start the new compose setup
docker compose up -d

# 4. Import your data
docker compose exec -T db psql -U prompts prompts < backup.sql
```

## 资源要求

**运行时**（首次构建之后）：
- 1 CPU 核心
- 1GB 内存
- 2GB 磁盘空间

**首次构建**（启动时编译 Next.js）：
- 1 CPU 核心
- 需要更高内存（内存限制过低可能触发 OOM）
- 2GB 磁盘空间

> ⚠️ 如果首次启动时看到 `Killed` 后面跟着 `exited with code 137`，
> 说明你的 Docker 容器很可能在构建阶段耗尽了内存。
> 调高 Docker 的内存分配（例如 ~4GB 或更高）通常可以解决这个问题。
> Docker Desktop：Settings → Resources → Memory。

**生产环境推荐：**
- 2 CPU 核心
- 2GB 内存（运行时）
- 10GB 磁盘空间

## 反向代理

### Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name prompts.example.com;

    ssl_certificate /etc/letsencrypt/live/prompts.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/prompts.example.com/privkey.pem;

    location / {
        proxy_pass http://localhost:4444;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Caddy

```caddyfile
prompts.example.com {
    reverse_proxy localhost:4444
}
```

## 安全注意事项

1. **生产环境务必设置 AUTH_SECRET**
2. **使用 HTTPS** —— 在前面加一层反向代理（Nginx、Caddy、Traefik）
3. **修改默认数据库密码** —— 更新 compose.yml 里的 `POSTGRES_PASSWORD` 和连接字符串
4. **限制暴露的端口** —— 只暴露必要的端口
5. **定期更新** —— 定期拉取最新镜像
6. **备份数据** —— 定期备份数据库

## 许可证

MIT

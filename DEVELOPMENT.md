# home · 开发与部署

## 环境要求
- Node.js 18+、npm（锁文件为 package-lock.json）

## 配置
```bash
cp .env.example .env
```
按 `README.md` 填写站点信息；链接数据在 `src/data/*.json`。

## 本地开发
```bash
npm install
npm run dev       # 本地预览（端口 3000）
npm run lint      # 代码检查
npm run format    # 格式化
```

## 构建
```bash
npm run build
npm run preview   # 预览构建结果
```

## 部署
提供 `Dockerfile` 与 `docker-compose.yml`，可容器化部署；
纯静态托管时直接发布 `dist/`。分支为 `main`。

### EdgeOne Makers
工作流 `.github/workflows/edgeone.yml`：推送 `main` → CI 构建 → `npx edgeone makers deploy dist -n <项目名> -t <token> -e production`。
- Secret：`EDGEONE_API_TOKEN`（控制台 → API Token）。
- Variable（可选）：`EDGEONE_PROJECT_NAME`，默认 `home`。
- 目标项目须为**直传型**；Git 集成型项目不接受 CLI 直传（常见部署失败原因）。
- 本地 CLI 报 `Invalid URL protocol` 为 SOCKS 代理环境变量导致，清空代理变量后重试；CI 无此问题。

### EdgeOne Git 集成构建
- `edgeone.json`：`installCommand=npm ci`、`buildCommand=npm run build`、`outputDirectory=dist`。
- `scripts/ensure-env.mjs`：构建前若无 `.env` 则从 `.env.example` 生成（EdgeOne/CI 环境 `.env` 被 gitignore 不存在），修复 `%VITE_*%` 未定义 → `URI malformed`。
- `.nvmrc=24.18.0`：Makers 构建 Node 版本（非预装版本平台会下载，仅 npm 可用）；本地 nvm 默认不自动切换，故本地不变。
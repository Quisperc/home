# Quisperの主页

个人主页，UI 采用 **Material You (Material Design 3)** 风格：动态色调、tonal surface 卡片、大圆角与状态层交互。仅依赖 Vue 3 + Vite，无组件库。

## 功能

- 动态主题：浅色 / 深色 / 跟随系统，主题色可选预设或从壁纸自动取色
- 壁纸：内置原创渐变 / 必应每日一图
- 时钟、实时天气（高德 Key，缺省回退公共 API）
- Hitokoto 一言、时光胶囊进度、建站时长
- 站点导航与社交链接、ICP / 公安备案页脚
- 移动端单列适配、哀悼日自动置灰

## 快速开始

```bash
cp .env.example .env   # 按需修改站点信息
npm install
npm run dev            # http://localhost:3000
npm run build          # 产物在 dist/
```

## 配置

| 位置 | 内容 |
| --- | --- |
| `.env` | 站点名称、简介、头像、天气 Key、建站日期、备案号 |
| `src/data/siteLinks.json` | 站点导航（`icon` 取值见 `src/components/Icon.vue`） |
| `src/data/socialLinks.json` | 社交链接 |
| `src/lib/theme.js` | 主题色预设与内置渐变壁纸 |

页面右上角「设置」可切换外观模式、主题色、壁纸来源等，偏好保存在 localStorage。

## 部署

- 静态托管：发布 `dist/` 即可
- Docker：`docker compose up -d --build`（端口 12445）
- GitHub Actions：推送 `main` 自动构建（见 `.github/workflows/build.yml`）
- EdgeOne Makers：推送 `main` 自动构建并直传部署（见 `.github/workflows/edgeone.yml`）

### EdgeOne Makers 部署

1. 在 EdgeOne 控制台创建 **API Token**，加入仓库 Secret `EDGEONE_API_TOKEN`。
2. 可选：仓库 Variable `EDGEONE_PROJECT_NAME` 指定项目名（默认 `home`）；CLI 会新建或更新同名**直传型**项目。
3. 推送 `main` 触发工作流：CI 内构建 `dist/` 后经 `edgeone makers deploy` 直传，绕过 EdgeOne 侧构建。

注意：CLI 直传仅支持**直传型（direct upload）**项目；若现有项目是 Git 集成型，请新建直传型或者改用新项目名称。本地执行 CLI 若报 `Invalid URL protocol`，系 SOCKS 代理环境变量所致，清空 `HTTP(S)_PROXY/ALL_PROXY` 后重试。

**Git 集成构建**（Makers 直接连 GitHub）同样可用：`edgeone.json` 指定 `npm ci` / `npm run build` / 输出 `dist`；构建时 `scripts/ensure-env.mjs` 自动从 `.env.example` 生成 `.env`，避免 `%VITE_*%` 未定义导致 `URI malformed` 构建失败；Node 由 `.nvmrc` 固定为 **24.18.0**（Makers 会下载该非预装版本，仅自带 npm，故安装命令用 `npm ci`）。本地 Node 不受 `.nvmrc` 影响（nvm 默认不自动切换）。

## 许可证

[MIT](LICENSE) · Copyright (c) 2026 Quisper
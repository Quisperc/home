# Quisperの主页

个人主页，UI 采用 **Material You (Material Design 3)** 风格：动态色调、tonal surface 卡片、大圆角与状态层交互。仅依赖 Vue 3 + Vite，无组件库。

## 功能

- 动态主题：浅色 / 深色 / 跟随系统，主题色可选预设或从壁纸自动取色
- 壁纸：内置原创渐变 / 必应每日一图 / 原神 / 二次元美图 / 跟随博客（公开随机图 API，失败回退缓存或渐变）
- 时钟、实时天气（高德 Key，缺省回退公共 API）
- 博客联动：最新文章卡片，壁纸与主题色同步博客站点（运行时解析，无需改动博客）
- 今日热榜：多平台榜单聚合卡片（数据源为自建 NewsNow，配置 `VITE_HOT_API_BASE` 后启用）
- Hitokoto 一言、时光胶囊进度、建站时长
- 站点导航与社交链接、ICP / 公安备案页脚
- 新标签页模式：自动聚焦搜索框、壁纸本地缓存秒开、精简布局与动效
- 移动端单列适配、哀悼日自动置灰

## 快速开始

```bash
cp .env.example .env   # 按需修改站点信息
npm install
npm run dev            # http://localhost:3000
npm run build          # 产物在 dist/
npm run build:ext      # 新标签页扩展产物在 dist-ext/
```

## 配置

| 位置 | 内容 |
| --- | --- |
| `.env` | 站点名称、简介、头像、天气 Key、建站日期、备案号、博客地址、热榜 API |
| `src/data/siteLinks.json` | 站点导航（`icon` 取值见 `src/components/Icon.vue`） |
| `src/data/socialLinks.json` | 社交链接 |
| `src/lib/theme.js` | 主题色预设与内置渐变壁纸 |

页面右上角「设置」可切换外观模式、主题色、壁纸来源、卡片开关等，偏好保存在 localStorage。

## 新标签页扩展

1. `npm run build:ext` 生成 `dist-ext/`（含 `manifest.json`，MV3）。
2. Edge 打开 `edge://extensions`（Chrome 为 `chrome://extensions`），开启「开发人员模式」。
3. 「加载解压缩的扩展」选择 `dist-ext/` 目录，新标签页即变为本站。

新标签页模式（扩展页或网址加 `?nt=1`）下：搜索框自动聚焦（必应/谷歌/百度/DuckDuckGo 可选），壁纸优先读本地缓存实现秒开，隐藏一言、时光胶囊与页脚，入场动效加速。

## 部署

- 静态托管：发布 `dist/` 即可
- Docker：`docker compose up -d --build`（端口 12445）
- GitHub Actions：推送 `main` 自动构建校验（见 `.github/workflows/build.yml`）
- EdgeOne Makers：绑定仓库后推送 `main` 自动拉取重建（`edgeone.json` 指定 `npm ci` / `npm run build` / 输出 `dist`）

构建时 `scripts/ensure-env.mjs` 自动从 `.env.example` 生成 `.env`，避免 `%VITE_*%` 未定义导致 `URI malformed` 构建失败；Node 由 `.nvmrc` 固定为 **24.18.0**（Makers 会下载该非预装版本，仅自带 npm，故安装命令用 `npm ci`）。本地 Node 不受 `.nvmrc` 影响（nvm 默认不自动切换）。

### 联动功能的平台配置（一次性）

- **博客联动**：在 EdgeOne 控制台为 `blog.civer.cn` 增加响应头 `Access-Control-Allow-Origin: *`（规则引擎 → 修改响应头，博客内容为公开内容）。未配置时文章卡片显示重试态、「博客」壁纸保留上一张或回退渐变，不影响其余功能。
- **今日热榜**：将 [NewsNow](https://github.com/ourongxing/newsnow)（MIT）部署到 EdgeOne Makers 并绑定域名（如 `hot.civer.cn`，需 DNS + SSL + 同样的 CORS 响应头）。确认 `/api/s?id=weibo` 返回 JSON 后，在 `.env` 启用 `VITE_HOT_API_BASE` 并重新构建，热榜卡片与设置开关自动出现。注意核实 Makers 对 NewsNow 服务端运行时（nitro 产物）的支持；若仅支持静态托管，需改用其 Node 预设或其他托管方式。

## 许可证

[MIT](LICENSE) · Copyright (c) 2026 Quisper
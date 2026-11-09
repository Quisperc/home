// CI / EdgeOne 构建环境无 .env（被 gitignore），从示例生成以保证 index.html 的 %VITE_*% 可替换
import { copyFileSync, existsSync } from "node:fs";
if (!existsSync(".env")) copyFileSync(".env.example", ".env");
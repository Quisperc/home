import { createApp } from "vue";
import App from "./App.vue";
import { initTheme } from "./lib/theme";
import "./style.css";

initTheme();
createApp(App).mount("#app");

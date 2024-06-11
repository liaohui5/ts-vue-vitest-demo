import { createApp } from "vue";
import { setupRouter } from "./router";
import { setupStore } from "./store";
import { setupElementPlus } from "./plugins/element";
import App from "./App.vue";

// https://github.com/necolas/normalize.css
import "normalize.css";

// https://github.com/rstacruz/nprogress
import "nprogress/nprogress.css";

// https://fontawesome.com.cn/
import "@/assets/fontawesome-free-5.15.4-web/css/all.min.css";

// global scss
import "./assets/scss/global.scss";

// 开发环境下启动模拟接口响应的 mock service worker
// https://mswjs.io/
async function setupMsw() {
  if (import.meta.env.DEV) {
    /* @ts-ignore */
    const { startMockServer } = await import("./__mock__/server.js");
    startMockServer();
  }
  return Promise.resolve();
}

// 启动 vue 框架
async function setupVue() {
  const app = createApp(App);
  await setupRouter(app);
  setupStore(app);
  setupElementPlus(app);
  app.mount("#app");
}

// 程序入口
async function bootstrap() {
  await setupMsw();
  await setupVue();
}

bootstrap();

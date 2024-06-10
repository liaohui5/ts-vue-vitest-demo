import { createPinia } from "pinia";
import { type App } from "vue";

// 安装/启动 pinia
export function setupStore(app: App) {
  const store = createPinia();
  app.use(store);
}

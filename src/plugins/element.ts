import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import type { App } from "vue";

export function setupElementPlus(app: App) {
  // TODO: 按需导入
  app.use(ElementPlus);
}

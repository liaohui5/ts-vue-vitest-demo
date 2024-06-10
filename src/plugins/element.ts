import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import type { App } from "vue";

// TODO: 应该按需导入, 而不是直接全局导入
export function setupElementPlus(app: App) {
  app.use(ElementPlus);
}

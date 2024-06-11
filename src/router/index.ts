import { App } from "vue";
import { Router, createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";
import { setupRouterGuards } from "./guards";
export { setupRouterGuards } from "./guards";
export { routes } from "./routes";
export { RouteNames } from "./const";

// 安装/启动路由
export function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  setupRouterGuards(router);
  setRouterInstance(router);
  app.use(router);
  return router.isReady();
}

// 为什么需要单独的封装两个这样的函数?
// 因为 useRouter 这种组合式的 API 只能在 setup 中使用
// 如果想要在 setup 外界获取这个 router 实例, 就需要封装
// 下这两个助手函数来便于在其他 js 中调用 vue-router

// 设置路由实例, 因为这个是在 setupRouter 中调用的, 所以
// 在调用获取路由实例方法的时候, 确保一定能够获取到这个对象
let _router: Router;
export function getRouterInstance() {
  return _router;
}

// 获取路由实例
export function setRouterInstance(router: Router) {
  _router = router;
}

import { App } from "vue";
import { Router, createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";
import { setupRouterGuards } from "./guards";
export { setupRouterGuards } from "./guards";
export { routes } from "./routes";
export { RouteNames } from "./const";

export function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  setupRouterGuards(router);
  setRouterInstance(router);
  app.use(router);
}

let _router: Router;
export function getRouterInstance() {
  return _router;
}

export function setRouterInstance(router: Router) {
  _router = router;
}

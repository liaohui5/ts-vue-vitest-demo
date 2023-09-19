import type { Router } from "vue-router";
import { hasToken } from "@/utils/token";
import { RouteNames } from "@/router";
import { start, done } from "@/utils/loadingProgress";
import { showErrorMsg } from "@/utils/msgs";

export function loadingProgress(router: Router) {
  router.beforeEach(() => start());
  router.afterEach(() => done());
}

export function checkLogin(router: Router) {
  router.beforeEach((to, _form, next) => {
    if (to.meta.isPublic || hasToken()) {
      return next();
    }

    showErrorMsg("请先登录");
    return next({ name: RouteNames.LOGIN });
  });
}

export function setupRouterGuards(router: Router) {
  loadingProgress(router);
  checkLogin(router);
}

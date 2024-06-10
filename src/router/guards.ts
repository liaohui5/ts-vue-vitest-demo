import type { Router } from "vue-router";
import { hasToken } from "@/utils/token";
import { RouteNames } from "@/router";
import { start, done } from "@/utils/loadingProgress";
import { showErrorMsg } from "@/utils/msgs";

// 为什么路由守卫分开写, 而不是直接全部写到一起?
// 因为这样便于一个个测试单独的小功能, 也便于理
// 解代码(就类似 express 中间件)

// 切换路由之前显示加载动画/切换之后隐藏加载动画
export function loadingProgress(router: Router) {
  router.beforeEach(() => start());
  router.afterEach(() => done());
}

// 检查是否登录
export function checkLogin(router: Router) {
  router.beforeEach((to, _form, next) => {
    if (to.meta.isPublic || hasToken()) {
      return next();
    }

    showErrorMsg("请先登录");
    return next({ name: RouteNames.LOGIN });
  });
}

// 设置路由守卫
export function setupRouterGuards(router: Router) {
  loadingProgress(router);
  checkLogin(router);
}

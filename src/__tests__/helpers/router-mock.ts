import { createRouterMock, type RouterMockOptions } from "vue-router-mock";
import { setRouterInstance, setupRouterGuards } from "@/router";
import type { Router } from "vue-router";

// 启动专门测试 vue-router 的测试工具包 vue-router-mock 
export function setupRouterMock(options: RouterMockOptions = {}) {
  const routerMock = createRouterMock({
    spy: {
      create: (fn) => vi.fn(fn),
      reset: (spy) => spy.mockClear(),
    },
    ...options,
  });

  setupRouterGuards(routerMock as Router);

  setRouterInstance(routerMock as Router);

  return routerMock;
}

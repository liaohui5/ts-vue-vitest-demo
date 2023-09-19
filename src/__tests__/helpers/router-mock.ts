import { createRouterMock, type RouterMockOptions } from "vue-router-mock";
import { setRouterInstance, setupRouterGuards } from "@/router";
import type { Router } from "vue-router";

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

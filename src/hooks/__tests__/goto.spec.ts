import { mount, config } from "@vue/test-utils";
import {
  createRouterMock,
  injectRouterMock,
  VueRouterMock,
  type RouterMockOptions,
  RouterMock,
} from "vue-router-mock";
import { redirectToLogin, useGoto } from "@/hooks/goto";
import { RouteNames, routes, setRouterInstance } from "@/router";

// 应该封装 test helper
export function setupRouterMock(opts: RouterMockOptions) {
  const router = createRouterMock({
    spy: {
      create: (fn) => vi.fn(fn),
      reset: (spy) => spy.mockClear(),
    },
    ...opts,
  });

  beforeEach(() => {
    router.reset();
    injectRouterMock(router); // 注入 routerMock 实例
  });

  setRouterInstance(router);

  config.plugins.VueWrapper.install(VueRouterMock);
  return router;
}

// 应该封装 test helper, 方便测试只能在 setup 中使用的一些方法
export function useSetup(setup: () => void) {
  const Comp = {
    render() {},
    setup,
  };

  const wrapper = mount(Comp);

  return {
    wrapper,
    router: wrapper.router,
  };
}

describe("goto", () => {
  let routerMock: RouterMock;
  beforeAll(() => {
    routerMock = setupRouterMock({
      // 注入 router, 在实例�组件的时候, 能够直接使用
      routes,
    });
  });

  describe("goto hooks", () => {
    it("should be go to home page", async () => {
      const { router } = useSetup(() => {
        const { gotoHome } = useGoto();
        gotoHome();
      });

      expect(router.currentRoute.value.name).toBe(RouteNames.HOME);
    });

    it("should be go to login page", async () => {
      const { router } = useSetup(() => {
        const { gotoLogin } = useGoto();
        gotoLogin();
      });

      expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN);
    });

    it("should be go to update user password page", async () => {
      const { router } = useSetup(() => {
        const { gotoUpdatePassword } = useGoto();
        gotoUpdatePassword();
      });

      expect(router.currentRoute.value.name).toBe(
        RouteNames.UPDATE_USER_PASSWORD
      );
    });
  });

  it("should go to login page, use router outside of setup", () => {
    redirectToLogin();
    expect(routerMock.currentRoute.value.name).toBe(RouteNames.LOGIN);
  });
});

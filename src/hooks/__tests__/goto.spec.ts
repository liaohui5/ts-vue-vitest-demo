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

// TODO: 应该封装 unit test helper functions
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
      // 应该跳转到 RouteNames.HOME 对应的页面(首页)
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

      // 应该跳转到 RouteNames.LOGIN 对应的页面(登录页)
      expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN);
    });

    it("should be go to update user password page", async () => {
      const { router } = useSetup(() => {
        const { gotoUpdatePassword } = useGoto();
        gotoUpdatePassword();
      });

      // 应该跳转到 RouteNames.UPDATE_USER_PASSWORD 对应的页面(修改密码页面)
      expect(router.currentRoute.value.name).toBe(
        RouteNames.UPDATE_USER_PASSWORD
      );
    });
  });

  it("should go to login page, use router outside of setup", () => {
    // 调用 redirectToLogin 方法后, 应该重新回到登录页
    redirectToLogin();
    expect(routerMock.currentRoute.value.name).toBe(RouteNames.LOGIN);
  });
});

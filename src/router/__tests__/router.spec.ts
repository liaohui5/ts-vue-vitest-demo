import { removeToken, saveToken } from "@/utils/token";
import { routes, RouteNames } from "@/router";
import { setupRouterMock } from "@/__tests__/helpers/router-mock";
import { RouterMock } from "vue-router-mock";
import { start, done } from "@/utils/loadingProgress";

// 模拟加载条动画的函数, 只要调用了就行, 而不是测试具体有什么样的效果
vi.mock("@/utils/loadingProgress", () => {
  return {
    start: vi.fn(),
    done: vi.fn(),
  };
});

describe("router", () => {
  let routerMock: RouterMock;
  beforeEach(() => {
    removeToken();
    routerMock = setupRouterMock({
      routes,
      useRealNavigation: true,
    });
  });

  it("should be add loading progress when route change", async () => {
    // 路由变化完成的时候, 应该调用滚动条开始/结束函数
    await routerMock.push({ name: RouteNames.LOGIN });
    expect(start).toBeCalled();
    expect(done).toBeCalled();
  });

  describe("check login router guard", () => {
    it("should redirect to login page when have not token to access home page", async () => {
      removeToken();
      // 当没有 token 的时候, 无法访问首页(RouteNames.HOME), 应该回到登录页面
      await routerMock.push({ name: RouteNames.HOME });
      expect(routerMock.currentRoute.value.name).toBe(RouteNames.LOGIN);
    });

    it("should go to login page when have not token", async () => {
      // 当没有 token 的时候, 可以正常访问登录页面(RouteNames.LOGIN)
      removeToken();
      await routerMock.push({ name: RouteNames.LOGIN });
      expect(routerMock.currentRoute.value.name).toBe(RouteNames.LOGIN);
    });

    it("should go to home page when has token", async () => {
      // 当有 token 的时候, 正常访问首页(RouteNames.HOME)
      saveToken("token-string");
      await routerMock.push({ name: RouteNames.HOME });
      expect(routerMock.currentRoute.value.name).toBe(RouteNames.HOME);
    });
  });
});

import { removeToken, saveToken } from "@/utils/token";
import { routes, RouteNames } from "@/router";
import { setupRouterMock } from "@/__tests__/helpers/router-mock";
import { RouterMock } from "vue-router-mock";
import { start, done } from "@/utils/loadingProgress";

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
    await routerMock.push({ name: RouteNames.LOGIN });
    expect(start).toBeCalled();
    expect(done).toBeCalled();
  });

  describe("check login router guard", () => {
    it("should redirect to login page when have not token to access home page", async () => {
      removeToken();
      await routerMock.push({ name: RouteNames.HOME });
      expect(routerMock.currentRoute.value.name).toBe(RouteNames.LOGIN);
    });

    it("should go to login page when have not token", async () => {
      removeToken();
      await routerMock.push({ name: RouteNames.LOGIN });
      expect(routerMock.currentRoute.value.name).toBe(RouteNames.LOGIN);
    });

    it("should go to home page when has token", async () => {
      saveToken("token-string");
      await routerMock.push({ name: RouteNames.HOME });
      expect(routerMock.currentRoute.value.name).toBe(RouteNames.HOME);
    });
  });
});

import { userService } from "@/services";
import { useUserStore } from "@/store/user";
import { hasToken, removeToken, saveToken } from "@/utils/token";
import { Store } from "element-plus/es/components/table/src/store/index.mjs";
import { setActivePinia, createPinia } from "pinia";

vi.mock("@/services", () => {
  return {
    userService: {
      login: () => {
        return {
          id: 1,
          username: "admin",
          email: "admin@qq.com",
          avatar: "http://xxx.com/1.jpg",
          status: 0,
          created_at: "2020-12-18T07:08:56.000Z",
          token: "token-string",
          permissions: [],
        };
      },
      updatePassword: vi.fn(),
      createUser: vi.fn(),
      updateUser: vi.fn(),
      getUsers: () => {
        return {
          count: 10,
          rows: [
            {
              id: 1,
              email: "test@qq.com",
            },
          ],
        };
      },
    },
  };
});

describe("user store", () => {
  let store: Store<any>;
  beforeEach(() => {
    removeToken();
    setActivePinia(createPinia());
    store = useUserStore();
  });

  describe("login/logout", () => {
    it("authed user info should have email, username and token fields", () => {
      const authUserInfo = store.getAuthedUser();
      expect(authUserInfo).toHaveProperty("username");
      expect(authUserInfo).toHaveProperty("email");
      expect(authUserInfo).toHaveProperty("token");
    });

    it("should be set authed user info after login", async () => {
      await store.login({} as ILoginForm);
      const authUserInfo = store.getAuthedUser();
      expect(authUserInfo.username).toBe("admin");
    });

    it("should be saved token after login", async () => {
      await store.login({} as ILoginForm);
      expect(hasToken()).toBe(true);
    });
  });

  describe("update user password", () => {
    it("should be delete token after update user password", async () => {
      saveToken("token-string"); // mock logined status
      expect(hasToken()).toBe(true);

      await store.updateUserPassword({} as IUpdatePasswordForm);
      expect(hasToken()).toBe(false);
    });
  });

  describe("search user list", () => {
    it("should be have list data and pagination information", async () => {
      await store.getUsers();
      expect(Array.isArray(store.users.rows)).toBe(true);
      expect(store.users.count).toBeTypeOf("number");
    });

    it("should be get users list align when search params page or size field changed", async () => {
      function updatePatinationParams(isPage = false) {
        if (isPage) {
          store.searchParams.page += 1;
        } else {
          store.searchParams.size += 1;
        }
        return Promise.resolve(); 
        // 因为 watch 触发 reactive 的依赖是异步触发的, 所以应该 await
      }

      vi.spyOn(userService, "getUsers");
      await updatePatinationParams();
      expect(userService.getUsers).toBeCalled();

      await updatePatinationParams(true);
      expect(userService.getUsers).toBeCalled();
    });
  });

  describe("create user info", () => {
    it("should be get users list align when created new user", async () => {
      vi.spyOn(userService, "getUsers");
      await store.createUserInfo();
      expect(userService.getUsers).toBeCalled();
    });
  });

  describe("update user info", () => {
    it("should be get users list align when updated user info", async () => {
      vi.spyOn(userService, "getUsers");
      await store.updateUserInfo();
      expect(userService.getUsers).toBeCalled();
    });
  });
});

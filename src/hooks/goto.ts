import { getRouterInstance } from "@/router";
import { RouteNames } from "@/router/const";
import { useRouter } from "vue-router";

export function useGoto() {
  const router = useRouter();

  function gotoLogin() {
    router.push({
      name: RouteNames.LOGIN,
    });
  }

  function gotoHome() {
    router.push({
      name: RouteNames.HOME,
    });
  }

  function gotoUpdatePassword() {
    router.push({
      name: RouteNames.UPDATE_USER_PASSWORD,
    });
  }

  return {
    gotoLogin,
    gotoHome,
    gotoUpdatePassword,
  };
}

export function redirectToLogin(): void {
  getRouterInstance().replace({
    name: RouteNames.LOGIN,
  });
}

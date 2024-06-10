import { getRouterInstance } from "@/router";
import { RouteNames } from "@/router/const";
import { useRouter } from "vue-router";

// 封装一些方法 vue-router 解耦, 而不是直接 $router.push(...) 这样调用
// 这样直接调用功能上是没有问题的, 但是不好做单元测试且合逻辑代码高度耦合
// 这样封装后, 只需要保证这个跳转的代码没有问题, 那么在写逻辑时就可以保证跳转
// 页面是没有问题的
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

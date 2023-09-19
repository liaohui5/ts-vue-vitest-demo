import { redirectToLogin } from "@/hooks/goto";
import { showErrorMsg } from "@/utils/msgs";

// http status code error messages
export const errno: { [key: string]: string } = {
  400: "数据验证错误",
  401: "请先登录",
  404: "请求地址错误",
  403: "拒绝访问",
  500: "服务器故障",
};

export const DEFAULT_ERR_MSG = "网络连接故障";
export function getErrorMsg(statusCode?: number) {
  let errorMsg = errno[String(statusCode)];
  if (!errorMsg) {
    errorMsg = DEFAULT_ERR_MSG;
  }
  return errorMsg;
}

export function errorHandler(statusCode: number, data?: any): void {
  let message = getErrorMsg(statusCode);
  // redirect to login
  if (statusCode === 401) {
    redirectToLogin();
  }

  // data validatation failed in server-side
  if (statusCode === 400) {
    let msg = data?.data?.message;
    if (msg) {
      message += `:${msg}`;
    }
  }

  showErrorMsg(message);
}

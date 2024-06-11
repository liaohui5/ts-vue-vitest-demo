import { http, HttpResponse } from "msw";
import { createUserResponse, loginResponse, updatePasswordResponse, updateUserResponse, userListResponse } from "./handlers/user";

export const handlers = [
  // 登录接口
  http.post("/api/auth/login", () => HttpResponse.json(loginResponse)),

  // 用户列表
  http.get("/api/users", () => HttpResponse.json(userListResponse)),

  // 创建用户
  http.post("/api/users", () => HttpResponse.json(createUserResponse)),

  // 更新用户信息
  http.patch("/api/users/:id", () => HttpResponse.json(updateUserResponse)),

  // 更新密码
  http.patch("/api/users/update_password", HttpResponse.json(updatePasswordResponse)),
];

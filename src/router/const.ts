// 应该字符串是没有任何代码提示的, 且在做单元测试的时候
// 如果用字符串那么主要代码改动, 那所有的测试用例就全部
// 不通过了, 所以应该用枚举, 有提示可以减少拼写错误的概
// 率, 而且, 就算字符串改变类, 只要枚举的 key 没有改变
// 那么测试用例依然可以通过
export const enum RouteNames {
  LOGIN = "Login",
  HOME = "Home",
  UPDATE_USER_PASSWORD = "Update_user_password",
  USERS = "Users",
  ROLES = "Roles",
  PERMISSIONS = "Permissions",
}

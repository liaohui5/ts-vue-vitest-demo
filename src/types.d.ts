// 登录表单数据结构
interface ILoginForm {
  email: string;
  password: string;
}

// 更新用户密码
interface IUpdatePasswordForm {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

// 用户对象
interface IUserDto {
  id: number;
  username: string;
  email: string;
  avatar: string;
  status: number;
  created_at: string;
  token?: string;
  permissions?: IPermisssionDto[];
  roles?: IRoleDto[];
}

// 创建用户信息
type ICreateUserForm = Pick<IUserDto, "username" | "email" | "password"> & {
  confirm: string;
  avatar?: string;
};

// 修改用户信息
type IUpdateUserForm = Partial<IUserDto>;

// 给用户分配角色
interface IAssignRoleForm {
  user_id: number;
  role_ids: number[];
}

// 角色对象
interface IRoleDto {
  id: 1;
  role_name: "超级管理员";
  role_desc: "拥有所有权限";
  permissions?: IPermisssionDto[];
}

// 权限对象
interface IPermisssionDto {
  id: number;
  desc: string;
  type: number;
  method: string | null;
  icon: string;
  path: string;
  status: number;
  pid: number;
}

// 带有分页信息的响应数据
interface PaginateResponse<T> {
  count: number;
  rows: T[];
}

// 分页参数
interface IPagination {
  page: number;
  size: number;
}

// 搜索参数
interface ISearchParams extends IPagination {
  type?: number | string;
  content?: string;
}

// 获取用户接口的响应数据
type IGetUsersResponse = PaginateResponse<IUserDto>;

import { http } from "@/utils/http";

export function login(data: ILoginForm): Promise<IUserDto> {
  return http.post("/api/auth/login", data);
}

export function updatePassword(data: IUpdatePasswordForm): Promise<void> {
  return http.patch("/api/users/update_password", data);
}

// TODO: must be memorize function for cached result
export function getUsers(params: ISearchParams): Promise<IGetUsersResponse> {
  return http.get("/api/users", { params });
}

export function createUser(data: ICreateUserForm): Promise<IUserDto> {
  return http.post("/api/users", data);
}

export function updateUser(id: number, data: IUpdateUserForm): Promise<void> {
  return http.patch(`/api/users/${id}`, data);
}

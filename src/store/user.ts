import { removeToken, saveToken } from "@/utils/token";
import { defineStore } from "pinia";
import { userService } from "@/services";
import { useLocalStorage } from "@vueuse/core";
import { reactive, watch, nextTick } from "vue";

export const useUserStore = defineStore("user", () => {
  const defaultUser: IUserDto = {
    id: 0,
    username: "",
    email: "",
    avatar: "",
    status: 0,
    created_at: "",
    token: "",
    permissions: [],
  };

  // login and logout
  // https://vueuse.org/core/useLocalStorage/
  const authUser = useLocalStorage("pinia/authUser", defaultUser);
  function setAuthedUser(userInfo: IUserDto): void {
    authUser.value = userInfo;
  }
  function getAuthedUser() {
    return authUser.value;
  }
  async function login(loginForm: ILoginForm) {
    const authedUser = await userService.login(loginForm);
    setAuthedUser(authedUser);
    saveToken(authedUser.token!);
  }
  function logout() {
    setAuthedUser(defaultUser);
    removeToken();
  }

  // update user password
  async function updateUserPassword(data: IUpdatePasswordForm) {
    await userService.updatePassword(data);
    removeToken();
  }

  // search users with pagination info
  const users = reactive<IGetUsersResponse>({
    count: 0,
    rows: [],
  });
  const defaultSearchQuery: ISearchParams = {
    page: 1,
    size: 10,
    type: "",
    content: "",
  };
  const searchParams = reactive<ISearchParams>(defaultSearchQuery);
  async function getUsers() {
    const res = await userService.getUsers(searchParams);
    users.count = res.count;
    users.rows = res.rows;
  }
  watch(
    () => [searchParams.page, searchParams.size],
    async () => await getUsers(),
  );

  // create user info
  const createLayerData = reactive({
    visible: false,
  });
  const createFormModel = reactive<ICreateUserForm>({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  async function createUserInfo(user: ICreateUserForm) {
    await userService.createUser(user);
    await nextTick(getUsers);
  }

  // update user info
  async function updateUserInfo(id: number, user: IUpdateUserForm) {
    await userService.updateUser(id, user);
    await nextTick(getUsers);
  }
  const updateLayerData = reactive<{ visible: boolean; row?: IUserDto }>({
    visible: false,
    row: undefined,
  });
  const updateFormModel = reactive<IUpdateUserForm>({
    id: 0,
    username: "",
    email: "",
    avatar: "",
  });
  watch(
    () => updateLayerData.row as IUserDto,
    (value: IUserDto) => {
      if (!value) return;
      updateFormModel.id = value.id;
      updateFormModel.username = value.username;
      updateFormModel.email = value.email;
      updateFormModel.avatar = value.avatar;
    },
  );

  return {
    login,
    logout,
    authUser,
    getAuthedUser,
    updateUserPassword,
    getUsers,
    searchParams,
    users,
    createLayerData,
    createFormModel,
    createUserInfo,
    updateLayerData,
    updateFormModel,
    updateUserInfo,
  };
});

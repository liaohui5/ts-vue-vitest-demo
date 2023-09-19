<template>
  <div class="navbar-wrapper">
    <div class="logo">Admin-Vue3</div>
    <div class="infos">
      <div class="item user">
        <div class="avatar">
          <img :src="user.avatar" />
        </div>
        <p>{{ user.username }}</p>
      </div>
      <div class="item">
        <el-button type="primary" @click="gotoUpdatePassword"
          >修改密码</el-button
        >
      </div>
      <div class="item">
        <el-button type="danger" @click="logout">注销登录</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGoto } from "@/hooks/goto";
import { useUserStore } from "@/store/user";
const { gotoLogin, gotoUpdatePassword } = useGoto();

const store = useUserStore();
const user = store.getAuthedUser();

// logout
const logout = function () {
  store.logout();
  gotoLogin();
};
</script>

<style lang="scss" scoped>
.navbar-wrapper {
  width: 100%;
  height: 100%;
  /* background: #ccc; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #555;
  .logo {
    font-size: 20px;
  }
  .infos {
    display: flex;
    align-items: center;
    .item {
      height: 100%;
      margin-left: 15px;
    }
    .user {
      display: flex;
      align-items: center;
      font-size: 16px;
      .avatar {
        width: 40px;
        height: 40px;
        max-width: 40px;
        max-height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>

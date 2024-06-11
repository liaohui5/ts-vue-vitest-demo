<template>
  <div class="login-page" :style="bgColorStyle">
    <el-card class="login-card">
      <template v-slot:header>
        <h2 class="card-header flex align-center">登录</h2>
      </template>
      <el-form ref="loginFormRef" :rules="rules" :model="loginForm" label-position="left" size="large">
        <el-form-item label="" prop="email">
          <el-input v-model="loginForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="">
          <x-button color="primary" @click="handleSubmit" text="登录" />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { getRandomBgColor } from "@/utils/tools";
  import { reactive, ref, toRaw } from "vue";
  import type { FormInstance, FormRules } from "element-plus";
  import { useUserStore } from "@/store/user";
  import { useGoto } from "@/hooks/goto";
  import { createEmailRule, createPasswordRule } from "@/utils/validate-rules";
  import XButton from "@/components/x-button/index.vue";

  const { gotoHome } = useGoto();

  const bgColorStyle = {
    background: getRandomBgColor(),
  };

  // TODO: remove test data
  const loginFormRef = ref<FormInstance | void>();
  const loginForm = reactive<ILoginForm>({
    email: "admin@qq.com",
    password: "123456",
  });

  const rules: FormRules<ILoginForm> = {
    email: createEmailRule(),
    password: createPasswordRule(),
  };

  const store = useUserStore();

  // must be pass all validation before submit form
  async function handleSubmit() {
    await loginFormRef.value?.validate(async (isPassed) => {
      if (!isPassed) return;
      await store.login(toRaw(loginForm));
      gotoHome();
    });
  }
</script>

<style lang="scss" scoped>
  .login-page {
    /* background: linear-gradient(to right, #3f2b96, #a8c0ff); */
    height: 100%;

    .login-card {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 450px;
      font-size: 16px;
    }

    .card-header {
      font-size: 20px;
      margin: 5px 0;
    }
  }
</style>

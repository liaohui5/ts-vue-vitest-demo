<template>
  <page-breadcrumb :items="['用户管理', '用户列表']" />
  <div class="update-password">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
    >
      <el-form-item prop="old_password" label="原密码">
        <el-input type="password" v-model="formData.old_password" />
      </el-form-item>
      <el-form-item prop="new_password" label="新密码">
        <el-input type="password" v-model="formData.new_password" />
      </el-form-item>
      <el-form-item prop="confirm_password" label="确认密码">
        <el-input type="password" v-model="formData.confirm_password" />
      </el-form-item>
      <el-form-item label="操作">
        <el-button @click="resetForm" type="danger">重置</el-button>
        <el-button @click="submitForm" type="primary">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import PageBreadcrumb from "@/components/page-breadcrumb/index.vue";
import { createPasswordRule } from "@/utils/validate-rules";
import { FormInstance } from "element-plus";
import { reactive, ref, toRaw } from "vue";
import { useUserStore } from "@/store/user.ts";
import { useGoto } from "@/hooks/goto";
import { showErrorMsg } from "@/utils/msgs";
const { gotoLogin } = useGoto();

const store = useUserStore();
const formRef = ref<FormInstance>();
const formData = reactive<IUpdatePasswordForm>({
  old_password: "",
  new_password: "",
  confirm_password: "",
});

const formRules = {
  old_password: createPasswordRule(),
  new_password: [
    ...createPasswordRule(),
    {
      trigger: "blur",
      validator: (_r: any, value: string, callback: CallableFunction) => {
        if (formData.old_password === value) {
          callback(new Error("新密码和老密码不能一样"));
          return;
        }
        callback();
      },
    },
  ],
  confirm_password: [
    {
      required: true,
      trigger: "blur",
      message: "确认密码不能为空",
    },
    {
      trigger: ["change", "blur"],
      validator: (_r: any, value: string, callback: CallableFunction) => {
        if (value !== formData.new_password) {
          callback(new Error("两次输入的密码不一致"));
          return;
        }
        callback();
      },
    },
  ],
};

function resetForm() {
  console.info("reset-form");
}

function submitForm() {
  formRef.value?.validate(async (isPassed: boolean) => {
    if (!isPassed) {
      return;
    }
    await store.updateUserPassword(toRaw(formData));
    showErrorMsg("请重新登录");
    gotoLogin();
  });
}
</script>

<style scoped></style>

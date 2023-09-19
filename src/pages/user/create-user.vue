<template>
  <el-dialog v-model="layerData.visible" title="创建用户信息" width="60%">
    <div class="create-form">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="90px"
      >
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="formData.password" />
        </el-form-item>
        <el-form-item prop="confirm" label="确认密码">
          <el-input type="password" v-model="formData.confirm" />
        </el-form-item>
        <el-form-item label="用户头像(可选)">
          <el-upload class="avatar-uploader" action="" :show-file-list="false">
            <img v-if="avatarURL" :src="avatarURL" class="avatar" />
            <div v-else class="upload-icon">
              <i class="fa fa-plus"></i>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="操作">
          <el-button @click="resetForm" type="danger">重置</el-button>
          <el-button @click="submitForm" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRaw } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/store/user";
import {
  createUsernameRule,
  createPasswordRule,
  createEmailRule,
} from "@/utils/validate-rules";

const store = useUserStore();
const layerData = store.createLayerData;
const formData = store.createFormModel;
const formRules: FormRules = {
  username: createUsernameRule(),
  email: createEmailRule(),
  password: createPasswordRule(),
  confirm: [
    {
      required: true,
      trigger: ["change", "blur"],
      message: "确认密码不能为空",
    },
    {
      validator: (_rule: any, value: string, callback: CallableFunction) => {
        if (value !== formData.password) {
          callback(new Error("两次输入的密码不一致"));
          return;
        }
        callback();
      },
      message: "两次密码不一致",
    },
  ],
};

// TODO: upload avatar file
const avatarURL = ref("");

// reset form data
function resetForm() {
  formData.username = "";
  formData.email = "";
  formData.password = "";
  formData.confirm = "";
}

// submit form data
const formRef = ref<FormInstance | void>();
function submitForm() {
  formRef.value?.validate(async (isPassed: boolean) => {
    if (!isPassed) return;
    await store.createUserInfo(toRaw(formData));
    layerData.visible = false;
    resetForm();
  });
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.upload-icon {
  font-size: 30px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

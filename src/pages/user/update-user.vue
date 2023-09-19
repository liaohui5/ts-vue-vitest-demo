<template>
  <el-dialog v-model="layerData.visible" title="创建用户信息" width="60%">
    <div class="update-form">
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
        <el-form-item label="用户头像(可选)">
          <el-upload class="avatar-uploader" action="" :show-file-list="false">
            <img v-if="avatarURL" :src="avatarURL" class="avatar" />
            <div v-else class="upload-icon">
              <i class="fa fa-plus"></i>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="操作">
          <el-button @click="handleCancel" type="danger">取消</el-button>
          <el-button @click="submitForm" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import { createUsernameRule, createEmailRule } from "@/utils/validate-rules";

const formRules: FormRules = {
  /* @ts-ignore */
  username: createUsernameRule(),
  email: createEmailRule(),
};

const store = useUserStore();
const layerData = store.updateLayerData;
const formData = store.updateFormModel as IUserDto;

// cancel update action
function handleCancel() {
  layerData.visible = false;
}

// submit form data
const formRef = ref<FormInstance | void>();
function submitForm() {
  formRef.value?.validate(async (isPassed: boolean) => {
    if (!isPassed) return;
    const { username, email } = formData; // TODO: upload avatar file
    await store.updateUserInfo(formData.id, { username, email });
    layerData.visible = false;
    handleCancel();
  });
}

// TODO: upload avatar file
const avatarURL = ref("");
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

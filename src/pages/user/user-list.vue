<template>
  <!--顶部搜索栏-->
  <div class="search-bar-wrapper">
    <div class="left-btns">
      <el-input v-model="searchParams.content" placeholder="请输入要搜索的内容">
        <template #prepend>
          <el-select
            v-model="searchParams.type"
            placeholder="请选择搜索的类型"
            style="width: 180px"
          >
            <el-option
              v-for="item of searchTypeOpts"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            />
          </el-select>
        </template>
      </el-input>

      <el-button class="ml-12" type="primary" @click="search"
        >立即搜索</el-button
      >
      <el-button type="danger" @click="resetSearchParams">重置搜索</el-button>
    </div>
    <div class="right-btns">
      <el-button type="success" @click="openCreateLayer">创建用户</el-button>
    </div>
  </div>

  <!--数据表格-->
  <div class="data-rows">
    <el-table :data="users" border>
      <el-table-column prop="id" label="ID" width="120px" />
      <el-table-column prop="username" label="用户名" width="120px" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="头像" width="120px">
        <template #default="scope">
          <img :src="scope.row.avatar" style="width: 30px; height: 30px" />
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template #default="scope">
          <el-tag
            type="success"
            size="small"
            style="margin-right: 5px"
            v-for="item of scope.row.roles"
            :key="item.id"
            >{{ item.role_name }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="注册时间">
        <template #default="scope">
          <span>{{ dateFormat(scope.row.created_at) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" width="65px">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 0" type="success" size="small"
            >正常</el-tag
          >
          <el-tag v-else type="danger" size="small">异常</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="openUpdateLayer(scope.row)"
            >修改信息</el-button
          >
          <el-button
            size="small"
            type="warning"
            @click="showAssignRoles(scope.row)"
            >分配角色</el-button
          >
          <!-- 0: 显示锁定 1: 显示解锁 -->
          <el-button
            @click="setStatus(scope.row, 1)"
            v-if="scope.row.status === 0"
            size="small"
            type="danger"
            >锁定</el-button
          >
          <el-button
            @click="setStatus(scope.row, 0)"
            v-else
            size="small"
            type="success"
            >解锁</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--分页信息-->
  <el-pagination
    background
    small
    layout="prev, pager, next, sizes"
    :page-sizes="[10, 15, 20, 25, 30]"
    :total="store.users.count"
    :page="searchParams.page"
    v-model:current-page="searchParams.page"
    v-model:page-size="searchParams.size"
  />
</template>

<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useUserStore } from "@/store/user";
import { showErrorMsg, showSuccessMsg, showWarnMsg } from "@/utils/msgs";

// TODO: format date string
function dateFormat(v: string) {
  return v;
}

const store = useUserStore();
const users = computed(() => store.users.rows);
const searchParams = computed(() => store.searchParams);
const searchTypeOpts = [
  {
    label: "UID",
    value: 1,
  },
  {
    label: "用户名",
    value: 2,
  },
  {
    label: "用户邮箱",
    value: 3,
  },
];

const showAssignRoles = (row: IUserDto) => {
  console.log(row);
  showWarnMsg("该功能正在开发中...");
};

async function setStatus(row: IUserDto, status: number) {
  await store.updateUserInfo(row.id, { status });
  showSuccessMsg("修改成功");
}

function openCreateLayer() {
  store.createLayerData.visible = true;
}

function openUpdateLayer(row: IUserDto) {
  store.updateLayerData.row = row;
  store.updateLayerData.visible = true;
}

async function search() {
  if (!store.searchParams.type) {
    showErrorMsg("请选择搜索类型");
    return;
  }

  if (!store.searchParams.content) {
    showErrorMsg("请输入搜索内容");
    return;
  }

  await store.getUsers();
}

async function resetSearchParams() {
  store.searchParams.type = "";
  store.searchParams.content = "";
  await store.getUsers();
}

onMounted(async () => {
  await store.getUsers();
});
</script>

<style lang="scss" scoped>
.search-bar-wrapper {
  display: flex;
  .left-btns {
    display: flex;
    flex: 1;

    .ml-12 {
      margin-left: 12px;
    }
  }
  .right-btns {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
}
.data-rows {
  padding: 20px 0 20px 0;
}
</style>

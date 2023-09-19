<template>
  <el-menu
    class="sidebar-container"
    :router="true"
    :default-active="route.path"
  >
    <el-menu-item index="/">
      <i class="fa fa-home"></i>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu v-for="menu in menus" :key="menu.id" :index="`${menu.id}`">
      <template #title>
        <i class="fa" :class="menu.icon"></i>
        <span>{{ menu.desc }}</span>
      </template>
      <el-menu-item
        v-for="item in menu.children"
        :key="item.id"
        :index="item.path"
      >
        <i class="fa" :class="item.icon"></i>
        <span>{{ item.desc }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/user";
import { list2tree } from "@/utils/list2tree";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useUserStore();
const user = store.getAuthedUser();

const menus = computed<any[]>(() => {
  const permissions = user.permissions;
  if (permissions.length === 0) {
    return [];
  }
  return list2tree(permissions);
});
</script>

<style lang="scss">
.sidebar-container {
  .el-menu-item,
  .el-sub-menu,
  .el-sub-menu__title {
    color: #666;
    &.is-active {
      color: #409eff;
    }
  }
  i.fa {
    margin-right: 5px;
  }
}
</style>

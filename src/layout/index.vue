<template>
  <el-container class="layout-container">
    <el-header class="navbar">
      <NavBar />
    </el-header>
    <el-container class="layout-container">
      <el-aside class="sidebar" width="300px">
        <SideBar />
      </el-aside>
      <el-main class="contents-container">
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import NavBar from "./navbar.vue";
  import SideBar from "./sidebar.vue";
</script>

<style lang="scss">
.layout-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .navbar {
    border-bottom: 1px solid #eee;
  }
  .sidebar {
    border-right: 1px solid #eee;
    background: #fff;
    color: #555;
    .el-menu {
      border: none;
    }
  }
  .contents-container {
    padding: 15px 15px 0px 15px;
  }
}
</style>

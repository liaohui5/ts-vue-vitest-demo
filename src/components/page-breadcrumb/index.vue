<template>
  <div class="breadcrumb-wrapper">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in items" :key="item">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.breadcrumb-wrapper {
  padding-bottom: 20px;
}
</style>

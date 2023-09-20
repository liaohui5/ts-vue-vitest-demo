<template>
  <button :class="classes" :disabled="props.disabled" @click="handleClick">
    {{ props.text }}
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { buttonProps, buttonEmits, COMPONENT_NAME, useButton } from "./button";

defineOptions({
  name: COMPONENT_NAME,
});

const props = defineProps(buttonProps);
const emits = defineEmits(buttonEmits);

const classes = computed(() => {
  let classNames = ["xbtn"];
  if (props.color === "default") {
    classNames.push("default");
  } else {
    classNames.push(props.color);
  }
  return classNames;
});

/* @ts-ignore */
const { handleClick } = useButton(props, emits);
</script>

<style lang="scss" scoped>
.xbtn {
  margin: 0;
  border: none;
  padding: 10px 20px;
  display: inline-flex;
  color: #f8f8f8;
  &:hover {
    cursor: pointer;
  }
  &.default {
    background: #c8c9cc;
    color: #909399;
  }
  &.primary {
    background-color: #409eff;
  }
  &.info {
    background-color: #b1b3b8;
  }
  &.danger {
    background-color: #f56c6c;
  }
  &.success {
    background-color: #67c23a;
  }
  &.warning {
    background-color: #e6a23c;
  }
}
</style>

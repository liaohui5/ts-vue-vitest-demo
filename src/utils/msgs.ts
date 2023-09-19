import { ElMessage } from "element-plus";
export function showErrorMsg(message: string): void {
  ElMessage.error({ message });
}

export function showSuccessMsg(message: string): void {
  ElMessage.success({ message });
}

export function showWarnMsg(message: string): void {
  ElMessage.warning({ message });
}

export function showInfoMsg(message: string): void {
  ElMessage.info({ message });
}

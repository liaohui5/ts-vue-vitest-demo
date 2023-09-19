// 创建验证邮箱的规则
export function createEmailRule() {
  return [
    {
      required: true,
      trigger: ["change", "blur"],
      message: "邮箱不能为空",
    },
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      trigger: ["change", "blur"],
      message: "邮箱格式有误",
    },
  ];
}

// 创建密码的规则
export function createPasswordRule() {
  return [
    {
      required: true,
      trigger: ["change", "blur"],
      message: "密码不能为空",
    },
    {
      pattern: /^[a-z0-9_-]{6,16}$/i,
      trigger: ["change", "blur"],
      message: "密码格式有误: 必须6-16位",
    },
  ];
}

// 创建用户名的规则
export function createUsernameRule() {
  return [
    {
      required: true,
      trigger: ["change", "blur"],
      message: "用户名不能为空",
    },
    {
      pattern: /^[_0-9a-z\u4e00-\u9fa5]{1,16}$/i,
      trigger: ["change", "blur"],
      message: "用户名格式有误(只能1-16数字字母下划线中文字符)",
    },
  ];
}

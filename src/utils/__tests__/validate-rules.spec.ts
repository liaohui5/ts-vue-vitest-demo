import {
  createEmailRule,
  createPasswordRule,
  createUsernameRule,
} from "@/utils/validate-rules";

describe("validate-rules", () => {
  it("validate email rule", () => {
    expect(createEmailRule()).toMatchInlineSnapshot(`
      [
        {
          "message": "邮箱不能为空",
          "required": true,
          "trigger": [
            "change",
            "blur",
          ],
        },
        {
          "message": "邮箱格式有误",
          "pattern": /\\^\\[a-zA-Z0-9_-\\]\\+@\\[a-zA-Z0-9_-\\]\\+\\(\\\\\\.\\[a-zA-Z0-9_-\\]\\+\\)\\+\\$/,
          "trigger": [
            "change",
            "blur",
          ],
        },
      ]
    `);
  });

  it("validate password rule", () => {
    expect(createPasswordRule()).toMatchInlineSnapshot(`
      [
        {
          "message": "密码不能为空",
          "required": true,
          "trigger": [
            "change",
            "blur",
          ],
        },
        {
          "message": "密码格式有误: 必须6-16位",
          "pattern": /\\^\\[a-z0-9_-\\]\\{6,16\\}\\$/i,
          "trigger": [
            "change",
            "blur",
          ],
        },
      ]
    `);
  });

  it("validate username rule", () => {
    expect(createUsernameRule()).toMatchInlineSnapshot(`
      [
        {
          "message": "用户名不能为空",
          "required": true,
          "trigger": [
            "change",
            "blur",
          ],
        },
        {
          "message": "用户名格式有误(只能1-16数字字母下划线中文字符)",
          "pattern": /\\^\\[_0-9a-z\\\\u4e00-\\\\u9fa5\\]\\{1,16\\}\\$/i,
          "trigger": [
            "change",
            "blur",
          ],
        },
      ]
    `);
  });
});

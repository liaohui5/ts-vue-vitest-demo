import AxiosMockAdapter from "axios-mock-adapter";
import { removeToken, saveToken } from "@/utils/token";
import { http, TOKEN_HEADER_KEY } from "@/utils/http";
import { errorHandler } from "@/utils/httpErrorHandler";

// 模拟 http 错误处理函数
vi.mock("@/utils/httpErrorHandler", () => {
  return {
    errorHandler: vi.fn(),
  };
});

// 后端接口结构
interface MockResponseBody {
  success?: boolean;
  msg?: string;
  data?: unknown;
}

// 实例化专门测试 axios 用的工具包 AxiosMockAdapter
const mockHttp = new AxiosMockAdapter(http);
function mockReply(httpStatusCode: number, response?: MockResponseBody) {
  if (response) {
    const { success = true, msg = "", data = null } = response;
    mockHttp.onGet("/api/users").reply(httpStatusCode, { success, msg, data });
  } else {
    mockHttp.onGet("/api/users").reply(httpStatusCode);
  }
}

// 发送请求
function triggerApiRequest() {
  return http.get("/api/users");
}

describe("http", () => {
  beforeEach(() => {
    removeToken();
    mockHttp.reset(); // 重置状态
  });

  it(`should add request header ${TOKEN_HEADER_KEY} when has token`, async () => {
    // 当有token(登录状态)的时候, 发送请求应该将 token 放到请求头中
    const token = "token-string";
    saveToken(token);
    mockReply(200, {});
    await triggerApiRequest();

    expect(mockHttp.history.get[0].headers![TOKEN_HEADER_KEY]).toBe(token);
  });

  it("should throw an error when success is false", async () => {
    // 当服务端返回的结构 success 字段为 false 的时候, 应该抛出异常
    const msg = "error-message";
    mockReply(200, { success: false, msg });
    await expect(() => triggerApiRequest()).rejects.toThrowError(msg);
  });

  it("should resolved response body data field when success is true", async () => {
    // 当服务端返回的结构 success 字段为 true 的时候, 应该直接返回 response.data
    const data = 1;
    mockReply(200, { data });
    const res = await triggerApiRequest();
    expect(res).toBe(data);
  });

  it("should throw an error when http status is not 200", async () => {
    // 当服务端返回的结构 code 字段不是 200 的时候, 应该直接抛出异常
    mockReply(1);
    await expect(() => triggerApiRequest()).rejects.toThrow();
  });

  it("should call httpErrorHandler when http status is not 200", async () => {
    // 当服务端返回的结构 code 字段不是 200 的时候, 应该直接抛出异常并且调用错误处理函数
    mockReply(500);
    await expect(() => triggerApiRequest()).rejects.toThrow();
    expect(errorHandler).toBeCalled();
  });
});

import AxiosMockAdapter from "axios-mock-adapter";
import { removeToken, saveToken } from "@/utils/token";
import { http, TOKEN_HEADER_KEY } from "@/utils/http";
import { errorHandler } from "@/utils/httpErrorHandler";

vi.mock("@/utils/httpErrorHandler", () => {
  return {
    errorHandler: vi.fn(),
  };
});

interface MockResponseBody {
  success?: boolean;
  msg?: string;
  data?: unknown;
}

const mockHttp = new AxiosMockAdapter(http);
function mockReply(httpStatusCode: number, response?: MockResponseBody) {
  if (response) {
    const { success = true, msg = "", data = null } = response;
    mockHttp.onGet("/api/users").reply(httpStatusCode, { success, msg, data });
  } else {
    mockHttp.onGet("/api/users").reply(httpStatusCode);
  }
}

function triggerApiRequest() {
  return http.get("/api/users");
}

describe("http", () => {
  beforeEach(() => {
    removeToken();
    mockHttp.reset();
  });

  it(`should add request header ${TOKEN_HEADER_KEY} when has token`, async () => {
    const token = "token-string";
    saveToken(token);
    mockReply(200, {});
    await triggerApiRequest();

    expect(mockHttp.history.get[0].headers![TOKEN_HEADER_KEY]).toBe(token);
  });

  it("should throw an error when success is false", async () => {
    const msg = "error-message";
    mockReply(200, { success: false, msg });
    await expect(() => triggerApiRequest()).rejects.toThrowError(msg);
  });

  it("should resolved response body data when success is true", async () => {
    const data = 1;
    mockReply(200, { data });
    const res = await triggerApiRequest();
    expect(res).toBe(data);
  });

  it("should throw an error when http status is not 200", async () => {
    mockReply(1);
    await expect(() => triggerApiRequest()).rejects.toThrow();
  });

  it("should call httpErrorHandler when http status is not 200", async () => {
    mockReply(500);
    await expect(() => triggerApiRequest()).rejects.toThrow();
    expect(errorHandler).toBeCalled();
  });
});

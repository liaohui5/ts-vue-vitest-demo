import {
  DEFAULT_ERR_MSG,
  getErrorMsg,
  errorHandler,
} from "@/utils/httpErrorHandler";
import { redirectToLogin } from "@/hooks/goto";

vi.mock("@/hooks/goto", () => {
  return {
    redirectToLogin: vi.fn(),
  };
});

describe("getErrorMsg", () => {
  it("should return default msg when no matched errno ", () => {
    const msg = getErrorMsg(555);
    expect(msg).toBe(DEFAULT_ERR_MSG);

    const msg2 = getErrorMsg();
    expect(msg2).toBe(DEFAULT_ERR_MSG);
  });
});

describe("handleErrorByHttpStatus", () => {
  it("should redirect to login page when status code is 401", () => {
    errorHandler(401);
    expect(redirectToLogin).toBeCalled();
  });
});

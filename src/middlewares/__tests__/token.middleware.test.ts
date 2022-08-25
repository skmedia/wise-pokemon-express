import { describe, expect, test } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { Response } from "express";
import tokenMiddleware from "../token.middleware";

const { res, next } = getMockRes<Response>({});

describe("token middleware", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { TOKEN: "test_token" };
  });

  test("return access denied when token is not defined", () => {
    const requestWithoutToken = getMockReq();
    tokenMiddleware(requestWithoutToken, res, next);
    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith("access denied");
    expect(next).not.toBeCalled();
  });

  test("continue when token is defined", () => {
    const requestWithToken = getMockReq({
      headers: { authorization: "Bearer test_token" },
    });
    tokenMiddleware(requestWithToken, res, next);
    expect(next).toBeCalled();
  });
});

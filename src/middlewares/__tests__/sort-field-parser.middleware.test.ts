import { describe, expect, test } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { Response } from "express";
import sort from "../sort-field-parser.middleware";

describe("sort field parser middleware", () => {
  const { res, next } = getMockRes<Response>({});
  const mockRequest = getMockReq({ query: { sort: "name-asc" } });

  test("sort field is parsed correctly", () => {
    sort(mockRequest, res, next);
    expect(mockRequest.query.sortInfo).toStrictEqual({
      field: "name",
      dir: "asc",
    });
  });
});

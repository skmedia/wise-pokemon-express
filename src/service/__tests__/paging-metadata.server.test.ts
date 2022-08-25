import { describe, expect, test } from "@jest/globals";
import { Request } from "express";
import { createPagingMetadata } from "../paging-metadata.service";

const mockRequest = {
  url: "/api/v1/pokemons?sort=name-asc&limit=10&offset=5",
  protocol: "https",
  get: (name: string) => (name === "host" ? "localhost" : undefined),
} as Request;

describe("test paging service", () => {
  test("metadata is correct", () => {
    const metadata = createPagingMetadata(mockRequest, 100, 5, 10);
    const expected = {
      next: "https://localhost/api/v1/pokemons?sort=name-asc&limit=10&offset=15",
      page: 2,
      pages: 10,
      previous:
        "https://localhost/api/v1/pokemons?sort=name-asc&limit=10&offset=0",
      total: 100,
    };
    expect(metadata).toStrictEqual(expected);
  });
});

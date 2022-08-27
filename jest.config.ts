import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/src/prisma-mock.client.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;

import type { Config } from "jest";

const runningIntegrationTests =
  process.env.npm_lifecycle_event?.includes("integration");
const runningUnitTests = process.env.npm_lifecycle_event?.includes("unit");

const config: Config = {
  verbose: true,
  clearMocks: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

config.testMatch = [
  "**/__tests__/**/*.[jt]s?(x)",
  "**/?(*.)+(spec|test).[jt]s?(x)",
];

if (runningUnitTests) {
  config.testMatch = ["**/?(*.)+(test\\.)ts?(x)"];
  config.setupFilesAfterEnv = ["<rootDir>/src/prisma-mock.client.ts"];
}

if (runningIntegrationTests) {
  config.testMatch = ["**/?(*.)+(test\\.integration\\.)ts?(x)"];
}

export default config;

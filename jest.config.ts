import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  testMatch: ["**/__tests__/**/*.(test|spec).ts?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: true }],
  },
  collectCoverageFrom: ["**/*.{ts,tsx}", "!**/node_modules/**", "!**/.next/**"],
  coverageReporters: ["text", "lcov"],
};

export default config;

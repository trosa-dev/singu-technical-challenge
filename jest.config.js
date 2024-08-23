/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  testPathIgnorePatterns: ["/dist/"],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    "./src/main.ts": {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};

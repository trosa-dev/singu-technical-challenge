/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  // Specifies the test environment as Node.js, indicating tests will run in a Node.js environment.
  testEnvironment: "node",

  // Configures Jest to use 'ts-jest' for TypeScript files (.ts and .tsx), enabling TypeScript compilation during testing.
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },

  // Sets coverage thresholds for code coverage metrics (branches, functions, lines, statements) globally to 80%.
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    // Optionally, you can also set specific thresholds for individual files or modules (commented out section).
    /*"./src/infra/config/expressApp.ts": {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },*/
  },

  // Ignores files or directories matching these patterns ("/node_modules/" and "/dist/") from being considered for testing.
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  collectCoverageFrom: [
    // Specifies the files to collect coverage information from, including TypeScript and JavaScript files in the 'src' directory.
    "src/**/*.{js,jsx,ts,tsx}",
    // Excludes specific directories and files from coverage (node_modules, dist directory, environment.ts, and expressApp.ts).
    "!node_modules",
    "!dist/**",
    "!src/infra/environment.ts",
    "!src/infra/config/expressApp.ts",
  ],
};

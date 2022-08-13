module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['json-summary', 'text', 'lcov'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],
  testEnvironment: 'jsdom',
  testMatch: ['**/test/**/*.{spec,test}.ts'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
      isolatedModules: true,
    },
  },
  reporters: ['default'],
};

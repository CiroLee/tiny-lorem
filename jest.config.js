module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['cobertura', 'text', 'lcov', 'clover'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],
  testEnvironment: 'jsdom',
  testMatch: ['**/test/**/*.{spec,test}.ts'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
      },
    ],
  },
  reporters: ['default'],
};

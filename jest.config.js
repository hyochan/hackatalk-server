module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: [
    '**/tests/**/*.test.(ts|js)',
  ],
  setupFilesAfterEnv: ['./tests/testSetup.ts'],
  testEnvironment: 'node',
};

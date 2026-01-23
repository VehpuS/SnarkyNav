module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  setupFilesAfterEnv: [],
  moduleNameMapper: {
    '^expo-status-bar$': '<rootDir>/__mocks__/expo-status-bar.ts',
    '^expo/src/winter$': '<rootDir>/__mocks__/expo-winter.ts',
  },
};

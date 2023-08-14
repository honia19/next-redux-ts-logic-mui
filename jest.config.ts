import type { Config } from '@jest/types';
import nextJest from 'next/jest';

const createJestConfig = nextJest();

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/coverage/**',
    '!**/__mocks__/**',
    '!**/config/**',
    '!**/.next/**',
    '!**/jest.config.ts',
    '!**/tailwind.config.ts',
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'html'],
};

export default createJestConfig(config);

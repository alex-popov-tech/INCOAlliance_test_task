const tsconfig = require('./tsconfig.json');

const { paths } = tsconfig.compilerOptions;

/**
 * Maps custom module paths in tsconfig to jest config
 */
const moduleNameMapper = Object.keys(paths).reduce((acc, curr) => {
  return {
    ...acc,
    [curr]: `<rootDir>${paths[curr]}`,
  };
}, {});

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/.jest/dotenv.js', '<rootDir>/.jest/faker.js'],
  testRunner: 'jest-circus/runner',
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper,
  testTimeout: 10 * 1000,
  testEnvironment: 'node',
};

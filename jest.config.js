// https://github.com/kulshekhar/ts-jest

module.exports = {
  verbose: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.{test,spec,d}.ts'],
};

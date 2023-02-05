const path = require('path')
const { pathsToModuleNameMapper } = require('ts-jest/utils');


module.exports = {
  rootDir: path.resolve(__dirname),
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleNameMapper: pathsToModuleNameMapper({
    "@packages/*":[ "./packages/*" ]
  }, { prefix: '<rootDir>/' } ),
    
  transform: {
    '^.+\\.(js|mjs|cjs|ts)$': 'babel-jest',
    '^.+\\.vue$': '<rootDir>/node_modules/vue-jest',
  }
}
/* eslint-disable */

module.exports = {
  coverageReporters: ['html'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '^Api(.*)': '<rootDir>/src/api$1',
    '^Assets(.*)$': '<rootDir>/src/assets$1',
    '^Components(.*)$': '<rootDir>/src/components$1',
    '^Helpers(.*)$': '<rootDir>/src/helpers$1',
    '^Containers(.*)$': '<rootDir>/src/containers$1',
    '^Data(.*)$': '<rootDir>/src/data$1',
    '^Store(.*)$': '<rootDir>/src/store$1',
    '^Actions(.*)$': '<rootDir>/src/store/actions$1',
    '^Reducers(.*)$': '<rootDir>/src/store/reducers$1',
    '@Mocks(.*)$': '<rootDir>/src/__mocks__$1',
  },
  setupFilesAfterEnv: ['jest-chain', '<rootDir>/jest.setup.js'],
};

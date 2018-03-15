module.exports = {
  setupFiles: [
    'raf/polyfill',
    './setupTests.js',
  ],
  setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js',
  unmockedModulePathPatterns: [
    'react',
    'enzyme',
    'jest-enzyme',
  ],
  globals: {
    requestAnimationFrame: (callback) => { setTimeout(callback, 0); },
  },
};

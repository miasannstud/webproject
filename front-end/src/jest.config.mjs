export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.jsx', '.js'],
  moduleNameMapper: {
    // '\\.(css|less)$': 'identity-obj-proxy',
    "\\.module\\.css$": "identity-obj-proxy",
    "\\.(css|less|scss|sass)$": "jest-transform-stub"
  },
};

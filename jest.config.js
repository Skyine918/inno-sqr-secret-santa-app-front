module.exports = {
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
        '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/file-mock.js'
    },
    testPathIgnorePatterns: ['node_modules', '<rootDir>*/public'],
    watchPathIgnorePatterns: ['node_modules', '<rootDir>*/public'],
    transformIgnorePatterns: ['node_modules/(?!(@material-ui)/)'],
    globals: {
        __PATH_PREFIX__: ''
    },
    testURL: 'http://localhost:8000',
    setupFiles: ['<rootDir>/loadershim.js', '<rootDir>/jest.setup.js']
};
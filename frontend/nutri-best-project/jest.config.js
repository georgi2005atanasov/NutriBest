export default {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    setupFilesAfterEnv: ["./@testing-library/jest-dom/extend-expect"],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    rootDir: './'
};
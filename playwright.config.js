// playwright.config.ts
module.exports = {
    // The directory where the tests are located
    testDir: './test',
    // Specify the browsers to run tests in
    projects: [
    {
    name: 'chromium',
    use: { browserName: 'chromium' },
    },
    {
    name: 'firefox',
    use: { browserName: 'firefox' },
    },
    {
    name: 'webkit',
    use: { browserName: 'webkit' },
    },
    ],
    // Global timeout for each test
timeout: 300000, // 30 seconds
// Retry configuration
retries: 2,
// Test reporter
reporter: [['list'], ['json', { outputFile: 'results.json'
}]]}
import { defineConfig, devices } from '@playwright/test';
import 'allure-playwright';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  //Tells Playwright where test files are located
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,  
  /* Opt out of parallel tests on CI - Updated for better performance */
  workers: process.env.CI ? 2 : undefined,
  /* Test timeout */
  timeout: 60000,
  /* Run headed locally, keep headless on CI */
  /* Expect timeout */
  expect: {
    timeout: 10000,
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [
        ['html', { open: 'never' }],
        ['json', { outputFile: 'test-results/results.json' }],
        ['junit', { outputFile: 'test-results/results.xml' }],
        ['list'],
        ['github'],
        ['allure-playwright'],
      ]
    : [
        ['html'],
        ['json', { outputFile: 'test-results/results.json' }],
        ['junit', { outputFile: 'test-results/results.xml' }],
        ['list'],
        ['allure-playwright'],
      ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Captures trace only if test fails once */
    trace: 'on-first-retry',
    // trace: 'on',

    /* Allows file download testing */
    acceptDownloads: true,

    /* Screenshot configuration - enhanced for agent-generated tests */
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },

    /* Increased navigation timeout for OAuth flows */
    navigationTimeout: 45000,

    /* Timeout for actions like click, fill */
    actionTimeout: 15000,

    /* Record video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
        name: 'chromium',
        use: { 
        browserName: 'chromium',
        headless: !!process.env.CI ? true : false,
        launchOptions: {
        // args: ['--start-maximized']
        },
      viewport: null
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ]
});

# Automation Playwright Framework

A robust Playwright automation framework for testing web applications. Built with TypeScript, utilizing the Page Object Model (POM) design pattern, and featuring comprehensive test reporting capabilities.

## Overview

This framework provides a scalable, maintainable, and reusable test automation solution for multi-application testing with support for multiple browsers and environments. It includes integrated test reporting, configuration management, and pre-built page objects for common applications.

## Key Features

- **Page Object Model (POM)**: Organized page object structure for maintainability
- **TypeScript Support**: Full TypeScript support for type-safe test automation
- **Multi-Browser Testing**: Support for Chrome, Edge, Chromium, Firefox, and WebKit
- **Multiple Environments**: Configuration for different test environments (QC, PCS, etc.)
- **Multi-Application Testing**: Framework supports testing multiple applications
- **Comprehensive Reporting**: 
  - HTML test reports
  - Allure reports for detailed test insights
  - JSON and XML output formats
  - GitHub Actions integration
- **Environment Management**: `.env` file support for configuration
- **Developer Tools**: 
  - Debug mode for troubleshooting
  - UI mode for interactive test execution
  - Code generation for test recording
  - Trace viewing for failure analysis

## Folder Structure

```
PlaywrightFramework/
├── core/                          # Core framework components
│   ├── config/                    # Configuration files
│   │   └── config.json           # Application and environment configurations
│   └── pages/                     # Page Object Model classes
│       ├── LoginPage.ts          # Reusable login page object
│       └── SwagLabs.ts           # SwagLabs application page object
│
├── tests/                         # Test specifications
│   ├── seed.spec.ts              # Seed/setup test file
│   └── SwagLabsTest.spec.ts      # SwagLabs application tests
│
├── playwright-report/             # Generated HTML test reports
│
├── allure-results/               # Allure report data files
│
├── test-results/                 # Test execution results
│   ├── results.json             # JSON format test results
│   └── results.xml              # JUnit XML format results
│
├── YAML Files/                    # YAML test data files
│   └── supplychain/              
│
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Project dependencies and scripts
├── example.env                   # Example environment variables template
└── .gitignore                    # Git ignore rules
```

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PlaywrightFramework
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npm run install-deps
```

4. Set up environment variables:
```bash
cp example.env .env
# Edit .env with your configuration
```

## Running Tests

### Standard Test Execution

```bash
# Run all tests in headless mode
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests in UI mode (interactive)
npm run test:ui
```

### Browser-Specific Testing

```bash
# Run tests on Chrome
npm run test:chrome

# Run tests on Edge
npm run test:edge

# Run tests on Chromium
npm run test:chromium

# Run tests on Firefox
npm run test:firefox

# Run tests on WebKit
npm run test:webkit

# Run tests on all configured browsers
npm run test:all-browsers
```

### Tagged Test Execution

```bash
# Run tests with specific tags (SwagLabs client, QC environment, headed, chromium)
npm run testtag <tag-pattern>
```

## Test Reports

### HTML Report

After test execution, view the HTML report:
```bash
npm run report
```

### Allure Report

Allure reports are automatically generated during test execution. View them using the Allure command-line tool.

### Trace Viewing

For debugging purposes, view test traces:
```bash
npm run trace
```

## Configuration

Edit `core/config/config.json` to configure:
- Application URLs
- Test environments
- Credentials and test data
- Browser configurations

## Development

### Generate Tests with Codegen

Use Playwright's code generation to record tests:
```bash
npm run codegen <url>
```

### Code Quality

The framework includes:
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Husky**: Git hooks
- **Lint-staged**: Pre-commit checks

## Project Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:debug` | Debug mode with step-by-step execution |
| `npm run test:ui` | Interactive UI mode for test execution |
| `npm run report` | View HTML test report |
| `npm run install-deps` | Install Playwright browsers |
| `npm run test:chrome` | Run on Chrome browser |
| `npm run test:edge` | Run on Edge browser |
| `npm run test:chromium` | Run on Chromium browser |
| `npm run test:firefox` | Run on Firefox browser |
| `npm run test:webkit` | Run on WebKit browser |
| `npm run test:all-browsers` | Run on all configured browsers |
| `npm run testtag` | Run tests with specific tags |
| `npm run codegen` | Generate test code by recording |
| `npm run trace` | View execution traces |

## Technologies Used

- **Playwright**: Modern browser automation library
- **TypeScript**: Type-safe JavaScript superset
- **Node.js**: JavaScript runtime
- **Allure**: Test reporting framework
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks management
- **Cross-env**: Cross-platform environment variables

## Best Practices

1. **Use Page Objects**: Encapsulate UI interactions in page classes
2. **Maintainability**: Keep tests focused and reusable
3. **Configuration**: Use environment variables for sensitive data
4. **Reporting**: Review test reports to identify failures quickly
5. **Debugging**: Use debug mode and traces for troubleshooting
6. **Documentation**: Keep tests and pages well-documented

## Troubleshooting

- **Timeout Issues**: Increase timeout in `playwright.config.ts`
- **Element Not Found**: Check selectors in browser dev tools
- **Failed Tests**: Review HTML reports and traces for debugging
- **Browser Crash**: Run in headed mode for visual feedback

## Author

Ashay Zemse

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Allure Report](https://allurereport.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const originalConsoleError = console.error;
console.error = (message, ...args) => {
  const messageStr = JSON.stringify(message);
  if (
    !Boolean(
      messageStr.includes('Warning: `ReactDOMTestUtils.act` is deprecated') ||
        messageStr.includes('unhandled exception')
    )
  ) {
    originalConsoleError(message, ...args);
  }
};

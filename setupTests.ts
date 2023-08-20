import '@testing-library/jest-dom';

process.env.API_HOST = 'API_HOST';

const consoleError = console.error;

let mockConsoleError: jest.SpyInstance<
  void,
  [message?: string, ...optionalParams: string[]]
>;

beforeAll(() => {
  mockConsoleError = jest
    .spyOn(console, 'error')
    .mockImplementation((...args) => {
      const message = typeof args[0] === 'string' ? args[0] : '';
      if (
        message.includes(
          'If you intentionally want it to appear in the DOM as a custom attribute',
        ) ||
        message.includes('Warning: validateDOMNesting')
      ) {
        return;
      }

      return consoleError.call(console, ...args);
    });
});

afterAll(() => {
  mockConsoleError.mockRestore();
});

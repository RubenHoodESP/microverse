import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R = void> {
      toBeInTheDocument(): R;
    }
  }

  // Para proyectos modernos que usan expect global sin namespace jest
  namespace NodeJS {
    interface Global {
      expect: typeof expect;
    }
  }
}

export {};

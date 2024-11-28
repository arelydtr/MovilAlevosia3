import 'formdata-polyfill'; // Asegura que FormData esté definido

// Mock para animaciones nativas (si estás usando Expo)
//jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock de Alert para evitar problemas en las pruebas
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Mock para FormData
global.FormData = jest.fn(() => ({
    append: jest.fn(),
    delete: jest.fn(),
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    set: jest.fn(),
  }));
  
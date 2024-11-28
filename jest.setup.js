import 'formdata-polyfill';
// Mock de FormData
global.FormData = class FormData {
    append() {}
  };
  
  // Si estás usando Expo, mockea animaciones nativas
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
  
  // (Opcional) Mock de Alert para pruebas de React Native
  jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
  }));
  
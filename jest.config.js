module.exports = {
    preset: 'jest-expo', // Usa el preset de Expo
    setupFilesAfterEnv: ['./jest.setup.js'], // Archivo de configuración adicional
    testEnvironment: 'jsdom',
  };
  
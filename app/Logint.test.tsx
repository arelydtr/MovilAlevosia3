import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Logint from './Logint';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));


describe('Login Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Logint onLogin={jest.fn()} />);

    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
  });

  it('shows an alert on invalid credentials', async () => {
    const { getByTestId } = render(<Logint onLogin={jest.fn()} />);

    fireEvent.changeText(getByTestId('email-input'), 'wrong@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'wrongpassword');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(require('react-native/Libraries/Alert/Alert').alert).toHaveBeenCalledWith(
        'Error',
        'Invalid credentials'
      );
    });
  });

  it('calls onLogin on valid credentials', async () => {
    const onLoginMock = jest.fn();
    const { getByTestId } = render(<Logint onLogin={onLoginMock} />);

    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(onLoginMock).toHaveBeenCalled();
    });
  });
});

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('renders Login with Google Button', async () => {
    render(<App />);
    expect(await screen.findByText(/Login/i)).toBeInTheDocument();
  });

  test('you can click on the Login with Google button and get the profile', async () => {
    // Arrange
    render(<App />);
    let loginButton = await screen.findByText(/Login/i);
    expect(loginButton).toBeInTheDocument();

    // Act
    fireEvent.click(loginButton, { target: { value: 'Login with Google' } });

    const profile = await screen.findByText(/Spock/);
    expect(profile).toBeInTheDocument();
  });

  test('you can click on the Logout! with Google button and get the profile', async () => {
    // Arrange
    render(<App />);
    let loginButton = await screen.findByText(/Login/i);
    expect(loginButton).toBeInTheDocument();

    // Act
    fireEvent.click(loginButton, { target: { value: 'Login with Google' } });

    const profile = await screen.findByText(/Spock/);
    expect(profile).toBeInTheDocument();

    const logoutButton = await screen.findByText(/Logout/i);
    // Act
    fireEvent.click(logoutButton, { target: { value: 'Logout' } });
    loginButton = await screen.findByText(/Login/i);
    expect(loginButton).toBeInTheDocument();
    expect(profile).not.toBeInTheDocument();
  });
});

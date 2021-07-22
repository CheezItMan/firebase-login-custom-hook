import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserProvider, LoginWithGoogleButton, UserContext, LoginStatus } from './firebase_login';

// Things to mock
// firebase.initializeApp(firebaseConfig);
// firebase.auth.GoogleAuthProvider();  <- returns an obj
// firebase.auth().getRedirectResult()
// 




beforeEach(() => {
  jest.resetAllMocks()
});

describe('Testing LoginWithGoogleButton', () => {
  test('Component Renders with user logged out', async () => {
    render(
      <UserProvider>
        <LoginWithGoogleButton text="Login" />
      </UserProvider>
    );
    expect(await screen.findByText(/Login/i)).toBeInTheDocument();
  });
});
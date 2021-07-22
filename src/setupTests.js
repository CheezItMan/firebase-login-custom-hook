// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import firebase from 'firebase/app';


jest.mock('firebase/app', () => {
  return {
    status: 'LoggedOut',
    initializeApp: function () {
      this.auth.GoogleAuthProvider = jest.fn();
      return jest.fn()();
    },
    auth: function () {
      const that = this;
      return {
        signOut: function () {
          this.status = 'LoggedOut';
          return new Promise((resolve, reject) => {
            resolve({});
          });
        },
        getRedirectResult: function () {
          return new Promise((resolve, reject) => {
            if (that.status === 'LoggedOut') {
              resolve({});
              return;
            }
            resolve({
              credential: '12345',
              user: {
                id: 1,
                displayName: 'Spock',
                photoURL: 'https://placekitten.com/100/150',
              },
            })
          });
        },
        signInWithRedirect: function (provider) {
          this.status = 'LoggedIn';
          return new Promise((resolve, reject) => {
            resolve({
              credential: '12345',
              user: {
                id: 1,
                displayName: 'Spock',
                photoURL: 'https://placekitten.com/100/150',
              },
            });
          });
        },
      }
    },
  }
}); // End Mock return
    
const AuthProvider = function AuthProvider () { };

firebase.auth.GoogleAuthProvider = jest.fn(() => { return AuthProvider });
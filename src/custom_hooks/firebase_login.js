
import { useContext, useState, createContext, useEffect } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../firebase_config';

export const LoginStatus = {
  loggedOut: 'loggedOut',
  loggedIn: 'loggedIn',
  pending: 'pending',
};

firebase.initializeApp(firebaseConfig);
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ user: null, status: LoginStatus.loggedOut });

  return (
    <UserContext.Provider value={{...user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const userContext = useContext(UserContext);
  const { user, setUser, status } = userContext;

  if (userContext === undefined) {
    throw new Error('useUser must be defined within UserProvider component.')
  }

  return [user, setUser, status];
}

export const LoginWithGoogleButton = ({ text = "Login with Google", ...otherProps }) => {
  const [user, setUser, status] = useUser();

  useEffect(() => {
    firebase.auth().getRedirectResult()
      .then(result => {
        if (result && result.user && result.credential) {
          setUser({ user: result.user, status: LoginStatus.loggedIn, });
        }
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  // we don't need to watch setUser since it won't change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    setUser({ user, status: LoginStatus.pending })
    firebase.auth().signInWithRedirect(googleProvider)
      .then((user) => {
        setUser({ user: user.user, status: LoginStatus.loggedIn });
      })
      .catch((error) => {
        setUser({ user: null, status: LoginStatus.loggedOut });
      });
  }

  const handleLogout = (event) => {
    event.preventDefault();
    firebase.auth().signOut()
      .then((user) => {
        setUser({ user: null, status: LoginStatus.loggedOut });
      })
      .catch((error) => {
        throw new Error('Cannot logout!');
      });
  };

  if (status === LoginStatus.loggedIn) {
    return <button {...otherProps} onClick={handleLogout}>Logout</button>
  } else if (status === LoginStatus.loggedOut) {
    return <button  {...otherProps}  onClick = { handleLogin }>{ text }</button>
  } else if (status === LoginStatus.pending) {
    return <div>Pending...</div>
  } else {
    throw new Error('Invalid state');
  }
}
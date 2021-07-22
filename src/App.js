import { UserProvider, LoginWithGoogleButton } from './custom_hooks/firebase_login';
import Profile from './components/profile';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <UserProvider>
        <LoginWithGoogleButton text="Login with Google" />
        <Profile />
      </UserProvider>
    </div>
  )
}

export default App;

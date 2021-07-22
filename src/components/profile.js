import React from 'react';
import { useUser, LoginStatus } from '../custom_hooks/firebase_login';

const Profile = () => {
  const [user, ,status] = useUser();

  if (status === LoginStatus.loggedIn) {
    return (
      <div>
        <img src={user.photoURL} alt={`${ user.displayName } profile pic`} />
        <p>{user.displayName}</p>
      </div>
    );
  }
  return <div />;
}

export default Profile;

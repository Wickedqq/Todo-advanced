import { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendEmailVerification,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { app } from '../../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);
  const [isReadyToRender, setIsReadyToRender] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscriberResponce = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setIsReadyToRender(true);
    });

    return unsubscriberResponce;
  }, [auth]);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  const setUserName = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  const setAvatar = (img) => {
    return updateProfile(auth.currentUser, {
      photoURL: img,
    });
  };
  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };
  const resetEmail = (email) => {
    return updateEmail(auth.currentUser, email);
  };
  const resetPassword = (password) => {
    return updatePassword(auth.currentUser, password);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        signup,
        setUserName,
        setAvatar,
        login,
        logout,
        verifyEmail,
        resetEmail,
        resetPassword,
      }}>
      {isReadyToRender && props.children}
    </AuthContext.Provider>
  );
};

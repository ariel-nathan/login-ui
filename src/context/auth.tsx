import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  User,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../firebase/config";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  googleLogin: () => void;
  logout: () => void;
  resetPassword: (email: string) => void;
}

const auth = getAuth(app);

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: () => {},
  login: () => {},
  googleLogin: () => {},
  logout: () => {},
  resetPassword: () => {},
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return error;
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      return error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      return error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signUp, login, googleLogin, logout, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

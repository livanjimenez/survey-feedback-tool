"use client";
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseClient";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  signInWithGoogle: () => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  signInWithGoogle: async () => {
    throw new Error("signInWithGoogle function not implemented");
  },
  signIn: async (_email: string, _password: string) => {
    throw new Error("signIn function not implemented");
  },
  signUp: async (_email: string, _password: string) => {
    throw new Error("signUp function not implemented");
  },
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signInMethod = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      console.error("Error signing in", error);
      throw error;
    }
  };

  const signInWithGoogle = async (): Promise<UserCredential> => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithPopup(auth, googleProvider);
      return userCredential;
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const signUpMethod = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      console.error("Error creating user", error);
      throw error;
    }
  };

  const signOutMethod = async (): Promise<void> => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signIn: signInMethod,
        signUp: signUpMethod,
        signOut: signOutMethod,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

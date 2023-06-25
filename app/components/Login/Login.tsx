import React, { FC, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "../../firebase/firebaseClient";
import { User } from "firebase/auth";

const Login: FC = () => {
  const { signIn, signUp, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isNewUser) {
        userCredential = await signUp(email, password);
        setIsNewUser(false);
      } else {
        userCredential = await signIn(email, password);
      }
      handleUser(userCredential.user);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithGoogle();
      handleUser(userCredential.user);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleUser = async (user: User) => {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      provider: user.providerData[0].providerId,
    });
    router.push("/survey");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <form onSubmit={handleLogin} className="space-y-4">
          <h1 className="text-2xl font-semibold">
            {isNewUser ? "Create your account" : "Log in"}
          </h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            {isNewUser ? "Sign Up" : "Sign In"}
          </button>
          <button
            type="button"
            onClick={() => setIsNewUser(!isNewUser)}
            className="w-full p-2 bg-red-500 text-white rounded mt-2"
          >
            {isNewUser
              ? "Already have an account? Log in"
              : "Don't have an account? Sign up"}
          </button>
          <button
            onClick={handleGoogleLogin}
            className="w-full p-2 bg-green-500 text-white rounded mt-2"
          >
            Sign in with Google
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;

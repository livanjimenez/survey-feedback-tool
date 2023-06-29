import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useFirestore } from "@/app/hooks/useFirestore";
import { auth, db } from "../../firebase/firebaseClient";
import { getDoc, doc } from "firebase/firestore";

const Login = () => {
  const { signIn, signUp, signInWithGoogle, signOut } = useContext(AuthContext);
  const { addDocument } = useFirestore("users");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docSnapshot = await getDoc(doc(db, "users", user.uid));
          if (docSnapshot.exists()) {
            router.push("/dashboard");
          } else {
            // If the user doc doesn't exist, log out the user
            await signOut();
            setError(
              "Unexpected error: User data not found. Please log in again."
            );
          }
        } catch (error) {
          // If an error occurs, log out the user and show an error message
          await signOut();
          if (error instanceof Error) {
            setError(`Unexpected error: ${error.message}. Please try again.`);
          }
        }
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [router, signOut]);

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
    await addDocument({
      uid: user.uid,
      name: user.displayName || displayName,
      email: user.email,
      provider: user.providerData[0].providerId,
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <form onSubmit={handleLogin} className="space-y-4">
          <h1 className="text-2xl font-semibold">
            {isNewUser ? "Create your account" : "Log in"}
          </h1>
          {isNewUser && (
            <input
              type="name"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
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

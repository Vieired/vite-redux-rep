import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut
} from "firebase/auth";
import { firebaseConfig } from "../firebase/config";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const firebaseAuth = {
  signIn: async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  listenAuthState: (cb: (user: User | null) => void) => {
    return onAuthStateChanged(auth, cb);
  },
  signOut: () => {
    return signOut(auth);
  }
};

// import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// export const login = (email: string, password: string) => {
//   const auth = getAuth();
//   return signInWithEmailAndPassword(auth, email, password);
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const listenAuthState = (callback: (user: any) => void) => {
//   const auth = getAuth();
//   return onAuthStateChanged(auth, callback);
// };
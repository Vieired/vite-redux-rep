// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYLkoXhRS55iBi6d2IBS7Zp6LaY1vrzeQ",
  authDomain: "vite-redux-fb.firebaseapp.com",
  projectId: "vite-redux-fb",
  storageBucket: "vite-redux-fb.appspot.com",
  messagingSenderId: "764290540565",
  appId: "1:764290540565:web:4c19d34c398f3d23e8da1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
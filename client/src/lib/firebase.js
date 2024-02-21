// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pern-blog.firebaseapp.com",
  projectId: "pern-blog",
  storageBucket: "pern-blog.appspot.com",
  messagingSenderId: "29527130444",
  appId: "1:29527130444:web:bb3b0aedc06d6d62cecfe9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mern-blog-74896.firebaseapp.com",
  projectId: "mern-blog-74896",
  storageBucket: "mern-blog-74896.appspot.com",
  messagingSenderId: "582773909360",
  appId: "1:582773909360:web:959910da6b975cdf7991b5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

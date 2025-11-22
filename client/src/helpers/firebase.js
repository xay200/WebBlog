import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "blogapp-8c83f.firebaseapp.com",
  projectId: "blogapp-8c83f",
  storageBucket: "blogapp-8c83f.firebasestorage.app",
  messagingSenderId: "94739580753",
  appId: "1:94739580753:web:9ea1ca5f0ebe501c95b570"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}
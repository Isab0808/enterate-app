import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNYaWlMJIg5w7b6QPh-my5nUa8NaH9ut4",
  authDomain: "news-app-42878.firebaseapp.com",
  projectId: "news-app-42878",
  storageBucket: "news-app-42878.appspot.com",
  messagingSenderId: "869836353710",
  appId: "1:869836353710:web:d23ef5014a4657636bbd3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
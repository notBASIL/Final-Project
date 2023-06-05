import { initializeApp } from "firebase/app";
import { getFirestore, getDocs,
    collection } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAzWvwaWRZXhzNtf-fl58g_TLGllBI2IDk",
  authDomain: "test-project-631ed.firebaseapp.com",
  projectId: "test-project-631ed",
  storageBucket: "test-project-631ed.appspot.com",
  messagingSenderId: "1036256892848",
  appId: "1:1036256892848:web:88f8007a434d0968236875"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
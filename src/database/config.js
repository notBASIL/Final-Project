import { initializeApp } from "firebase/app";
import { getFirestore, getDocs,
    collection } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC1VkcdQo1lH2dOpmGHdvIKAFqcYTSAz2w",
  authDomain: "recipe-app-92282.firebaseapp.com",
  projectId: "recipe-app-92282",
  storageBucket: "recipe-app-92282.appspot.com",
  messagingSenderId: "469956561613",
  appId: "1:469956561613:web:dceae13691b0b435e43784",
  measurementId: "G-H12P5T5595"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDk9ZaFpJILG21O89mmYeCtw5Lim5Ww3bE",
  authDomain: "peluqueria-35973.firebaseapp.com",
  projectId: "peluqueria-35973",
  storageBucket: "peluqueria-35973.firebasestorage.app",
  messagingSenderId: "1:1094200770487:web:e6b5d4951f900cec91f232",
  appId: "G-VGYRG6GDL1",
  measurementId: "G-VGYRG6GDL1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
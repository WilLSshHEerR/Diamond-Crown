import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCBrf9efW3MUJYcQnGzQSFDLnaWLmKGB8",
  authDomain: "diamond-crown-6a743.firebaseapp.com",
  projectId: "diamond-crown-6a743",
  storageBucket: "diamond-crown-6a743.firebasestorage.app",
  messagingSenderId: "505923803926",
  appId: "1:505923803926:web:4978cdb528d722cbbf0e37",
  measurementId: "G-EEBBHJXZMK"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };

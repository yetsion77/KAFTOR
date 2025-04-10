import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB4xxcWzxU3LDB1mxYfChrzdZ20mJS-VKs",
  authDomain: "kaftor-80a12.firebaseapp.com",
  projectId: "kaftor-80a12",
  storageBucket: "kaftor-80a12.firebasestorage.app",
  messagingSenderId: "40659035214",
  appId: "1:40659035214:web:ec057b3325e598f7788f1f",
  measurementId: "G-GB41ERGK45"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics }; 
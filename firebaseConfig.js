// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// copy these values from your Firebase console -> project settings
// const firebaseConfig = {
//   apiKey: '…',
//   authDomain: '…',
//   projectId: '…',
//   storageBucket: '…',
//   messagingSenderId: '…',
//   appId: '…',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyA9iXZIO3EjO51EFoQGUeGDlrAhsM9fhF8',
  authDomain: 'sti-attendance-c3653.firebaseapp.com',
  databaseURL:
    'https://sti-attendance-c3653-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'sti-attendance-c3653',
  storageBucket: 'sti-attendance-c3653.firebasestorage.app',
  messagingSenderId: '77629757222',
  appId: '1:77629757222:web:5a27cd3ff6bd8350ef93e7',
  measurementId: 'G-6VGZZ5Z66S',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/*

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9iXZIO3EjO51EFoQGUeGDlrAhsM9fhF8",
  authDomain: "sti-attendance-c3653.firebaseapp.com",
  databaseURL: "https://sti-attendance-c3653-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sti-attendance-c3653",
  storageBucket: "sti-attendance-c3653.firebasestorage.app",
  messagingSenderId: "77629757222",
  appId: "1:77629757222:web:5a27cd3ff6bd8350ef93e7",
  measurementId: "G-6VGZZ5Z66S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/

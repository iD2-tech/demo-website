import { createContext, useState } from 'react';
const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNF9wLfJwt6k5jMWK6zPdcCJVXCYsaPcs",
  authDomain: "restaurant-side.firebaseapp.com",
  projectId: "restaurant-side",
  storageBucket: "restaurant-side.appspot.com",
  messagingSenderId: "1099161267732",
  appId: "1:1099161267732:web:0e2c56817a616d114a8101",
  measurementId: "G-4L4P8042N5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={database}>
      {children}
    </FirebaseContext.Provider>
  );
};

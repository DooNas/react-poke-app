// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqfxenk9HKc4boCi__5BjLzbpZOKFBQXA",
    authDomain: "react-poke-app-7f9ca.firebaseapp.com",
    projectId: "react-poke-app-7f9ca",
    storageBucket: "react-poke-app-7f9ca.firebasestorage.app",
    messagingSenderId: "377491711025",
    appId: "1:377491711025:web:d878dcdb8ede89ae9be110"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
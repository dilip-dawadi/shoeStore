import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB4hQ3Vz2P6y6A6gjSXGONM7nl-kBuA5us",
    authDomain: "suz4u-cc7f7.firebaseapp.com",
    projectId: "suz4u-cc7f7",
    storageBucket: "suz4u-cc7f7.appspot.com",
    messagingSenderId: "611916284764",
    appId: "1:611916284764:web:a77eef41e313a492d13799"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDS0jomKjKtcpLAk68hRPvW_-GBDDMYtJM",
    authDomain: "uploading-images-e1122.firebaseapp.com",
    projectId: "uploading-images-e1122",
    storageBucket: "uploading-images-e1122.appspot.com",
    messagingSenderId: "978694819528",
    appId: "1:978694819528:web:895af7afba8423e5589ffd",
    measurementId: "G-3C663GE2VV"
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
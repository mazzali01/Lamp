import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword}from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBfJuEDQ7KIPO_feHPmtY4DXRPP-ZqpmVY",
authDomain: "lamp-7fb6e.firebaseapp.com",
databaseURL: "https://lamp-7fb6e-default-rtdb.firebaseio.com",
projectId: "lamp-7fb6e",
storageBucket: "lamp-7fb6e.appspot.com",
messagingSenderId: "816320075310",
appId: "1:816320075310:web:2ba343469b2ade2886f1bf"
};

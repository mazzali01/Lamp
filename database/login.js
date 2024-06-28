import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth }from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { logar } from './exportLogin.js'
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

const app   = initializeApp(firebaseConfig);
const bd    = getDatabase(app);
const auth  = getAuth();

const button = document.getElementById('bt_login');
const email = document.getElementById('email');
const senha = document.getElementById('senha');

button.addEventListener('click', function(e){
    logar(e)
} )

// const google = document.getElementById('loginWithGoogle')

// google.addEventListener('click', (e)=>{
//     loginWithGoogle(e);
// })



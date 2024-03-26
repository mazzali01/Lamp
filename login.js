import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth,  signInWithEmailAndPassword}from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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
    e.preventDefault();
    const userEmail = email.value;
    console.log(userEmail)
    const userSenha = senha.value;
    console.log(userSenha)
    loginUser(auth ,userEmail, userSenha);
})

function loginUser(auth, userEmail, userSenha){
    signInWithEmailAndPassword(auth, userEmail, userSenha).then((userCredential) =>{
        console.log("login bem sucedido: " + userCredential.user);
        auth.onAuthStateChanged(function(user) {
            if (user) {
                console.log('Usuário está logado.');
                // Execute qualquer ação necessária para um usuário logado, como redirecioná-lo para a página de dashboard
                window.location = 'dashboard.html';
                localStorage.setItem('userLoggedIn', true);
            } else {
                console.log('Usuário não está logado.');
                // Execute qualquer ação necessária para um usuário não logado, como redirecioná-lo para a página de login
                window.location = 'login.html';
            }
        });

        logado();
    }).catch(error =>{
        console.error("Erro ao realizar o login: " + error);
        if(error.code == 'auth/invalid-credential' ){
            alert("Email ou senha incorreto, tente novamente")
        }
        email.value = '';
        senha.value = '';
    })
}
function logado(){

    const user = auth.currentUser; 

    return !!user;
}

import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { verifica } from "./verificacao.js";
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

const app = initializeApp(firebaseConfig);
const bd = getDatabase(app);
const auth = getAuth(app); // Usando getAuth aqui

document.addEventListener('DOMContentLoaded', function() {
    auth.onAuthStateChanged((user) =>{
        if(verifica){//se a verificação estiver ativa o usuario precisará estar logado para acessar certas paginas
            const currentUser = auth.currentUser;

            //verifica se tem um usuario logado.
            if(user){
                console.log("Usuario logado: " + user.uid);
            }else{
                console.log('Não há usuario logado logado');
                alert("você precisa estar logado para acessar essa pagina, realize o seu cadastro!");
                window.location = 'cadastro.html';
            }
        }
        
    })
});
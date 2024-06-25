import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth, onAuthStateChanged}from "firebase/auth";
import getDados from "../database/getDados.js";

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
//cria variaveis relacionadas ao firebase
const app   = initializeApp(firebaseConfig);
const bd    = getDatabase(app);
const auth  = getAuth();

// Função para exibir a tela de loading
function showLoadingScreen() {
    fetch('loadingScreen.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('.loadingScreen').innerHTML = data;
            document.body.classList.add('no-scroll'); // Adiciona a classe no-scroll ao body
        })
        .catch(error => {
            console.error("Erro ao carregar a tela de carregamento: ", error);
        });
}

// Função para ocultar a tela de loading
function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
        loadingScreen.remove();
        document.body.classList.remove('no-scroll');
    }
}

// Exibir a tela de loading
showLoadingScreen();

auth.onAuthStateChanged((user) => {
    if (user) {
        const userRef = ref(bd, 'user/' + user.uid);
        getDados(userRef)
            .then(() => {
                // Ocultar a tela de loading após carregar os dados
                setTimeout(hideLoadingScreen, 1200);
            })
            .catch(error => {
                console.log("Erro ao obter dados do Firebase: ", error.message);
                // Ocultar a tela de loading mesmo em caso de erro
                setTimeout(hideLoadingScreen, 1200);
            });
    } else {
        // Se não houver um usuário autenticado, oculta a tela de loading após 2 segundos
        setTimeout(hideLoadingScreen, 1200);
    }
});
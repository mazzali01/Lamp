import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup }from "firebase/auth";

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

const button = document.getElementById('bt_login');
const email = document.getElementById('email');
const senha = document.getElementById('senha');

//cria a function de login para exportala em diversas paginas
function logar(e){
    e.preventDefault();
    const userEmail = email.value;
    const userSenha = senha.value;
    loginUser(auth ,userEmail, userSenha);
}



function loginUser(auth, userEmail, userSenha){
    signInWithEmailAndPassword(auth, userEmail, userSenha).then((userCredential) =>{//entra na conta do user
        console.log("login bem sucedido: " + userCredential.user);
        localStorage.setItem('logado', true)

        }).then(() =>{
            const user = auth.currentUser;
            if(user){// se existir um user ele será levado para a tela de dashboard
                localStorage.setItem('localUser', user);
                window.location = 'dashboard.html'
            }else{
                alert("Erro ao realizar o login")
            }
        }).catch(error =>{
            console.error("Erro ao realizar o login: " + error);
            if(error.code == 'auth/invalid-credential' ){
                alert("Email ou senha incorreto, tente novamente")
            }
            email.value = '';
            senha.value = '';
        })
}

function loginWithGoogle(e) {
    e.preventDefault();
    var provider = new GoogleAuthProvider();
    signInWithPopup(provider)
      .then(function(result) {
        // Sucesso! O usuário está autenticado.
        var user = result.user;
        console.log("Usuário autenticado:", user);
      })
      .catch(function(error) {
        // Ocorreu um erro.
        console.error("Erro ao autenticar:", error);
      });
  }

export {logar, loginUser, loginWithGoogle}

//esse arquivo serve somente para exportar o login para ser utilizado em qualquer arquivo que necessitar, foi a unica maneira de exportar uma function que eu consegui fazer funcionar.
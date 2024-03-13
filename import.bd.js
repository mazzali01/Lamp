import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, get, child} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const bd = getDatabase(app);

const btnCadastro = document.getElementById('bt_login');
const apelido = document.getElementById('apelido');
const nome = document.getElementById('nome');
const email = document.getElementById('email'); 
const tel = document.getElementById('tel');
const dataNasc = document.getElementById('nasc');
const senha = document.getElementById('senha');

btnCadastro.addEventListener('click', function(e){

  set(ref(bd, 'user/' + apelido.value),{
      Apelido: apelido.value,
      Nome: nome.value,
      Email: email.value,
      Telefone: tel.value,
      Nascimento: dataNasc.value, 
      Senha: senha.value
  });
  alert("FUNCIONOU PORRA")
});


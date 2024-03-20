import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword}from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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
const auth = getAuth();

const btnCadastro = document.getElementById('bt_login');
const apelido     = document.getElementById('apelido');
const nome        = document.getElementById('nome');
const email       = document.getElementById('email'); 
const tel         = document.getElementById('tel');
const dataNasc    = document.getElementById('nasc');
const senha       = document.getElementById('senha');

btnCadastro.addEventListener('click', function(e){
    e.preventDefault();

    const emailValue = email.value;
    const senhaValue = senha.value;
    
    createUserWithEmailAndPassword(auth, emailValue, senhaValue).then((userCredential) =>{
        const user = userCredential.user;
        alert("Usuário criado com sucesso: " + apelido.value);
        logado();

        return set(ref(bd, 'Users/' + apelido.value),{
            Apelido: apelido.value,
            Nome: nome.value,
            Email: email.value,
            Telefone: tel.value,
            Nascimento: dataNasc.value, 
            Senha: senha.value
        })

    }).then(() =>{
        alert("salvo com sucesso")
    }).catch(error =>{
        console.log("o seguinte erro foi evidenciado: " + error);
        alert("erro ao criar o usuário: " + error);
    })
 
});

function logado(){

    const user = auth.currentUser; 
    console.log(user + "\n" + "\n" + logado);
    getDados();
    return !!user;
}

function getDados(){
    var userDados = (ref(bd, 'Users/' + apelido.value));

    onValue(userDados, (snapshot) => {
        const dados = snapshot.val();

        if(dados){
            console.log(dados);
        }else{
            console.log("Os dados selecionados não existem");
        }


    })

}
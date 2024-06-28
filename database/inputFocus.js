import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth }from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import getDados from "./getDados.js";
import { getPFP } from "./getPFP.js";

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

const nome      = document.getElementById('nome');
const apelido   = document.getElementById('apelido');
const email     = document.getElementById('email');
const tel       = document.getElementById('telefone');
const nasc      = document.getElementById('nasc');


auth.onAuthStateChanged((user) =>{
    if(user){
        const userRef = ref(bd, 'user/' + user.uid);

        getDados(userRef).then(dados => {//recebe os dados do user presentes no banco de dados
        
            //salvando os dados nas variaveis

            nome.setAttribute   ('data-default', dados.Nome);
            apelido.setAttribute('data-default', dados.Apelido);
            email.setAttribute  ('data-default', dados.Email);
            tel.setAttribute    ('data-default', dados.Telefone);
            nasc.setAttribute   ('data-default', dados.Nascimento);

            //mudando os valores dos inputs

            handleInputFocus(nome);
            handleInputFocus(apelido);
            handleInputFocus(email);
            handleInputFocus(tel);
            handleInputFocus(nasc)

            //definindo os valores no cardLeft

            const apLeft = document.getElementById('apLeft');
            const emailLeft = document.getElementById('emailLeft');

            function leftValues(input, dado){
                input.innerText = dado.getAttribute('data-default')
            }

            leftValues(apLeft, apelido)
            leftValues(emailLeft, email)
        
        }).catch(error =>{
            console.log('Erro ao receber dados do usuário: ' + error.message);
        })
        //PFP
        getPFP(user);
    }
});

function handleInputFocus(input){//function para mudar o valor do input se em focus ou não
    const defaultValue = input.getAttribute('data-default');//pega a referencia de qual input será alterado
    input.value = defaultValue;

    input.addEventListener('focus', () =>{
        input.value = '';// quando o user clicar no input o valor dele será nulo
    });
    input.addEventListener('blur', () => {
        if (input.value === '') {//se o valor do input não foi alterado ele será definido com os dados presentes no bd
            input.value = defaultValue;
        }
    });
}
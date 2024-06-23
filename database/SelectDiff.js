import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { setRef } from "./diffRef.js";
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

const app       = initializeApp(firebaseConfig);
const bd        = getDatabase(app);

//functins para abrir e fechar a janela de dificuldade
var topic;
function fechar(){
    const diff = document.querySelector('.diff-box')
    diff.style.display = 'none';
}

function abrir(subject){
    const diff = document.querySelector('.diff-box')
    diff.style.display = 'flex';
    topic = subject.id;
}

//abrindo e fechando
const subject = document.querySelectorAll('.subject');
subject.forEach(subject => {
    subject.addEventListener('click', () =>{
        abrir(subject)
    })    
});

const exit = document.querySelector('.exit');
exit.addEventListener('click', () =>{
    fechar();
});

//definindo a referencia da dificuldade de acordo com a selecionada

const inputs = document.querySelectorAll("input[type='radio']");
inputs.forEach((input) =>{

    input.addEventListener('click', () =>{
        setRef(topic, input.value)
        
        fechar()
        window.location = 'quizzes.html'
    });

})







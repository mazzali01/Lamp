import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child, update } from "firebase/database";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { getDados } from "./utils";

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
const auth = getAuth();

const inputs = document.querySelectorAll("input[type='radio']");
const labels = document.querySelectorAll('.label-resp');

const inputLabelMap = {};
inputs.forEach(input => {
    const id = input.id;
    const label = document.querySelector(`label[for='${id}']`);
    inputLabelMap[id] = label;
});

export async function remove2(uid, currentQuestion, exp) {
    const topic = localStorage.getItem('topic');
    const diff  = localStorage.getItem('diff');
    
    const questionRef   = ref(bd, `questions/${topic}/${diff}/${currentQuestion}`);
    const lumensRef     = ref(bd, `user/${uid}`);
    const userData = await getDados(lumensRef);

    const lumensChild = child(lumensRef, 'Lumens')
    const lumensData  = await getDados(lumensChild)
    var lumens = exp + lumensData;

    const questionData = await getDados(questionRef);
    const resp = questionData.resposta;

    if(lumens >= 500){
        lumens -= 500;

        await update(lumensRef, {Lumens: lumens})

        let contador = 2 ; 
        for(let i = 0; i < contador; i++){
            const random = Math.floor(Math.random() * inputs.length);
            const input = inputs[random];
            const label = inputLabelMap[input.id]
    
            if(input.value != resp &&  label.style.display != 'none'){
                label.style.display = 'none';
            }else{
                contador ++;
            }
    
        }

    }
} 

export async function markAsnwer(uid, currentQuestion, exp){
    const topic = localStorage.getItem('topic');
    const diff  = localStorage.getItem('diff');
    
    const questionRef   = ref(bd, `questions/${topic}/${diff}/${currentQuestion}`);
    const lumensRef     = ref(bd, `user/${uid}`);
    const userData      = await getDados(lumensRef);

    const lumensChild = child(lumensRef, 'Lumens')
    const lumensData  = await getDados(lumensChild)
    var lumens = exp + lumensData;

    const questionData = await getDados(questionRef);
    const resp = questionData.resposta;

    if(lumens >= 2000){
        lumens -= 2000;

        await update(lumensRef, {Lumens: lumens})

        let asnwer;
        inputs.forEach(input =>{
            if(input.value == resp){
                asnwer = input
                asnwer.checked = true;
            }
            
            if(input.value != resp){
                const label = inputLabelMap[input.id]
                input.disabled = true;
            }
        })


    }


}
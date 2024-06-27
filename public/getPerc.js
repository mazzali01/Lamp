import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set} from "firebase/database";
import { getAuth } from "firebase/auth";
import { getDados } from "../database/utils.js"

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

const subjects = document.querySelectorAll('.subject');

auth.onAuthStateChanged(async (user) =>{
    const uid = user.uid;

    subjects.forEach(subject => {
        const topic = subject.id;
        setPerc(uid, topic)
    })
});


async function getDataTotal(uid, topic){
    const dataRef  = ref(bd, `userResults/${uid}/questions/${topic}`);

    const snapshot = await get(dataRef);
    var questionLength = 0;
    if(snapshot){
        snapshot.forEach( async dificuldade =>{
            const data = dificuldade.val();
            questionLength += (data.length) - 1;
        })
            
    }
    return questionLength   
}


async function getTopicLength(topic){
    const dataRef  = ref(bd, `questions/${topic}`);

    const snapshot = await get(dataRef);
    var topicLength = 0;
    if(snapshot){
        snapshot.forEach( dificuldade =>{
            const data = dificuldade.val();
            topicLength += (data.length) - 1;//menos 1 pq no meu banco de dados eu atribui 1 aos valores para facilitar o entendimento
        })
            
    }
    return topicLength   
}

async function calcPerc(questionLength, topicLength){
    var percentual = (questionLength/topicLength)*100;
    
    
    if(isFinite(percentual)  || percentual <= 0 || isNaN(percentual)  ){
        percentual = 0;
    }
    
    return percentual + '%'
}

async function setPerc(uid, topic){
    const questionLength = await getDataTotal(uid, topic);

    const topicLength = await getTopicLength(topic);

    const percentual = await calcPerc(questionLength, topicLength);

    const subject = document.querySelector(`.subject[id='${topic}']`);
    const percElement = subject.lastElementChild;
    percElement.innerHTML = percentual;


}
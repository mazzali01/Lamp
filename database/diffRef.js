import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

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

var diffRef;

function setRef(topic, input){
    diffRef = `questions/${topic}/${input}`
    localStorage.setItem('questionRef', diffRef)
    localStorage.setItem('topic', topic)
    localStorage.setItem('diff', input)
    
}


export { setRef }
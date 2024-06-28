import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get, child, onValue, query, orderByKey, limitToLast } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getTotalGeral, getLumens, getAcertos, getWeekProgress, getTopFour } from "../database/getResults.js";

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
const auth = getAuth();

const numTasks = document.getElementById('numTasks');
const numLumens = document.getElementById('numLumens');

function getResults(user) {
    return new Promise(async (resolve, reject) => {
        if (user) {
            try {
                const uid = user.uid;
                const tasks = await getTotalGeral(uid);
                const lumens = await getLumens(uid);

                numTasks.innerHTML = tasks;
                numLumens.innerHTML = lumens;

                const acertos = await getAcertos(uid);

                const weekProgress = await getWeekProgress(uid);

                const melhores = await getTopFour(uid);

                const results = {
                    tasks, acertos, weekProgress, melhores 
                };

                resolve(results);
            } catch (error) {
                reject(error);
            }
        } else {
            reject('No user is signed in');
        }
    });
}



export { getResults };

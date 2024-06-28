import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, get, ref } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";


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
const auth = getAuth();
const bd = getDatabase(app);

export async function atualizarAcertos(uid) {
    
    const refAcertos = ref(bd, `userResults/${uid}`);
    const snapshot = await get(refAcertos);

    let acertos = 0;

    if (snapshot.exists()) {
        snapshot.forEach((semana) => {
            const keySemana = semana.key;
            if (keySemana.startsWith('semana ')) {
                semana.forEach((dia) => {
                    const keyDia = dia.key;
                    if (keyDia.startsWith('dia ')) {
                        const data = dia.val();
                        const topic = localStorage.getItem('topic');
                        const diff = localStorage.getItem('diff');
                        if(data && data[topic]){
                            const dataTopic = data[topic];
                            if (dataTopic && dataTopic[diff]){
                                const dataDiff = dataTopic[diff];
                                
                                if (dataDiff && dataDiff.acertos) {
                                    acertos += dataDiff.acertos;
                                }
                            }
                        }
                     
                    }
                });
            }
        });
    }
    return acertos
}
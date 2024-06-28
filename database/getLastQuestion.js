import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, query, orderByKey, limitToLast, get } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBfJuEDQ7KIPO_feHPmtY4DXRPP-ZqpmVY",
    authDomain: "lamp-7fb6e.firebaseapp.com",
    databaseURL: "https://lamp-7fb6e-default-rtdb.firebaseio.com",
    projectId: "lamp-7fb6e",
    storageBucket: "lamp-7fb6e.appspot.com",
    messagingSenderId: "816320075310",
    appId: "1:816320075310:web:2ba343469b2ade2886f1bf"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const bd = getDatabase(app);

// Função para obter a última questão respondida pelo usuário
export async function getLastQuestion(uid, topic, diff) {
    const questionsRef = ref(bd, `userResults/${uid}/questions/${topic}/${diff}`);
    const lastQuestionQuery = await query(questionsRef, orderByKey(), limitToLast(1));
    try {
        const snapshot = await get(lastQuestionQuery);
        if (snapshot.exists()) {
            let lastQuestionKey;
            snapshot.forEach(childSnapshot => {
                lastQuestionKey = childSnapshot.key;
            });
            return parseInt(lastQuestionKey); // Certifique-se de que está retornando um número
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro ao obter a última questão:", error);
        throw error;
    }
}

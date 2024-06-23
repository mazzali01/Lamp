import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, ref, child } from "firebase/database";

import { loadQuestion } from './loadQuestions.js';
import { verificar } from './checkAnswers.js';
import { setResp } from './saveResps.js';
import { mostrarResultado } from './showResults.js';
import { getSelected } from "./utils.js";
import { saveUserData } from "./setResults.js";
import { atualizarAcertos } from "./getAcertos.js";

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

let currentQuestion;
var firstQuestion;
let quizLength = 0;
let exp = 0;
let dados;

const nextQuestion = document.getElementById('nextQuestion');
const submit = document.getElementById('submit');
const verifica = document.getElementById('verifica');

// Inicializa o quiz
auth.onAuthStateChanged(async function (user){
    if (user) {
        const uid = user.uid;
        var acertos = await atualizarAcertos(uid);
    
        loadQuestion(uid, acertos, verifica, exp).then(({ questionData, quizLength: length, currentQuestion: questionAtual }) => {
            dados = questionData;
            quizLength = length;
            currentQuestion = questionAtual;
            firstQuestion = currentQuestion;
            verifica.addEventListener('click', () => {
                verificar(currentQuestion, quizLength, acertos, questionData, verifica);
            });
        });

        // Evento do botão de próxima questão
        nextQuestion.addEventListener('click', async () => {
            await setResp(uid, currentQuestion);
            const answer = getSelected();
            if (answer === dados.resposta) {
                acertos++;
                exp += 20;
            }
            
            currentQuestion++;
            if (currentQuestion <= quizLength) {
                loadQuestion(uid ,acertos, verifica, exp).then(({ questionData }) => {
                    
                    dados = questionData;
                    verifica.addEventListener('click', () => {
                        verificar(currentQuestion, quizLength, acertos, questionData, verifica);
                    });
                });
            } else {
                mostrarResultado(acertos, quizLength, exp);
            }
        });

        // Evento do botão de submit
        submit.addEventListener('click', async () => {
            await setResp(uid, currentQuestion);
            const answer = getSelected();
            if (answer === dados.resposta) {
                acertos++;
                exp += 20;
            }
            currentQuestion++;
            mostrarResultado(acertos, quizLength, exp);
        });

        // Salvando resultados ao clicar no botão de voltar
        const arrow = document.getElementById('back-arrow');
        arrow.addEventListener('click', async () => {

            await saveUserData(uid, currentQuestion, acertos, exp, firstQuestion);
            window.location = "courses.html";
        });
    }
});
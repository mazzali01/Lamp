import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { reset, getDados } from './database/utils.js';
import { checkPreviousAnswer } from './database/checkAnswers.js';
import { mostrarResultado } from './database/showResults.js';
import { getLastQuestion } from "./getLastQuestion.js";

const bd = getDatabase();
const auth = getAuth();
const diffRef = localStorage.getItem('questionRef');

const enunciado = document.getElementById('enunciado');
const labels = document.querySelectorAll('.label-resp');
const nextQuestion = document.getElementById('nextQuestion');
const submit = document.getElementById('submit');
const verifica = document.getElementById('verifica');
const fonte = document.getElementById('fonte');
const comando = document.getElementById('comando');

// Função para obter o comprimento do questionário
const getLength = () => {
    return new Promise((resolve, reject) => {
        const refLength = ref(bd, diffRef);
        onValue(refLength, (snapshot) => {
            if (snapshot.exists()) {
                const length = Object.keys(snapshot.val()).length; // Usando Object.keys para contar as chaves
                resolve(length);
            } else {
                resolve(0); // Retorna 0 se não existir snapshot
            }
        }, (error) => {
            reject(error);
        });
    });
};

// Função para carregar uma questão
export async function loadQuestion(uid ,acertos, verifica, exp) {
    try {
        const quizLength = await getLength();
        return await new Promise(async (resolve, reject) => {
            const topic = localStorage.getItem('topic');
            const diff = localStorage.getItem('diff');
            var lastQuestion = await getLastQuestion(uid, topic, diff);
            
            let currentQuestion;
            if (lastQuestion !== null) {
                currentQuestion = parseInt(lastQuestion) + 1;
            } else {
                currentQuestion = 1;
            }
            if (currentQuestion <= quizLength) {
                const questionRef = ref(bd, `questions/${topic}/${diff}/${currentQuestion}`);
                getDados(questionRef).then((dados) => {
                    const questionData = dados;
                    fonte.innerText = dados.fonte;
                    enunciado.innerHTML = dados.enunciado;
                    comando.innerHTML = dados.comando;
                    labels[0].innerHTML = dados.alternativas.a;
                    labels[1].innerHTML = dados.alternativas.b;
                    labels[2].innerHTML = dados.alternativas.c;
                    labels[3].innerHTML = dados.alternativas.d;
                    labels[4].innerHTML = dados.alternativas.e;

                    reset();

                    nextQuestion.style.display = "none";
                    verifica.style.display = "none";

                    if (currentQuestion === quizLength) {
                        nextQuestion.style.display = "none";
                        submit.style.display = "none";
                        verifica.style.display = 'flex';
                    }

                
                    checkPreviousAnswer(uid, diffRef, currentQuestion, questionData, quizLength, verifica,  acertos);
        

                    resolve({
                        questionData,
                        quizLength,
                        currentQuestion
                    });
                }).catch(error => {
                    console.error("Ocorreu um erro ao carregar a questão:", error);
                    reject(error);
                });
            } else {
                mostrarResultado(acertos, quizLength, exp);
                resolve({ currentQuestion });
            }
        });
    } catch (error) {
        console.error("Ocorreu um erro ao obter o comprimento do questionário:", error);
    }
}


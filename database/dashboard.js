import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, onValue, update } from "firebase/database";
import { getAuth,  onAuthStateChanged}from "firebase/auth";
import {getResults} from './database/results.js';

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
const auth      = getAuth();

const welcome = document.getElementById('welcome');


// Obtenha o contexto do elemento canvas onde o gráfico será desenhado
const advances = document.getElementById('advances')
var advancesCtx = advances.getContext('2d');

const hits = document.getElementById('hits');
var hitsCtx = hits.getContext('2d');

const qntTopic = document.getElementById('qnt-topic');
var qntTopicCtx = qntTopic.getContext('2d');


var add = 35;
var sub = 30;
var mult = 20;
var div = 15;


auth.onAuthStateChanged(user => {
    welcome.innerHTML = `Bem vindo de volta ao Lamp, ${user.displayName}!`;
    getResults(user).then(results => {
        const total = results.tasks;
        const acertos = results.acertos;
        const erros = total - acertos;

        const semanaAtual = results.weekProgress.semanaA;
        const semanaPassada = results.weekProgress.semanaP;
        const semanaRetrasada = results.weekProgress.semanaR;

        // Obtendo os 4 melhores tópicos
        const melhores = results.melhores;
        const labels = melhores.map(item => item[0]);//recebe o nome dos topicos
        const data = melhores.map(item => item[1]);//recebe o valor de cada topico

        //tratando as labels dos 4 melhores

        for(var i = 0; i <= labels.length; i++) {
            switch(labels[i]) {
                case 'add':
                    labels[i] = 'Adição';
                    break;
                case 'sub':
                    labels[i] = 'Subtração';
                    break;
                case 'mult':
                    labels[i] = 'Multiplicação';
                    break;
                case 'div': 
                    labels[i] = 'Divisâo'
                    break;
                case 'pot':
                    labels[i] = 'Potenciação';
                    break;
                case 'raiz':
                    labels[i] = 'Raiz Quadrada';
                    break;
                case 'porc':
                    labels[i] = 'Porcentagem';
                    break;
                case 'frac':
                    labels[i] = 'Operações com Fração';
                    break;
                case 'cart':
                    labels[i] = 'Plano Cartesiano';
                    break;
            }
        }

        var hitsChart = new Chart(hitsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Acertos', 'Erros'],
                datasets: [{
                    data: [acertos, erros],
                    borderColor: ['#142c4c', 'transparent'],
                    backgroundColor: ['#35c594', '#daf3ea'],
                    borderWidth: 0.25,
                    fill: true,
                    hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        var advancesChart = new Chart(advancesCtx, {
            type: 'line',
            data: {
                labels: ['Semana Retrasada', 'Semana Passada', 'Esta Semana'],
                datasets: [{
                    label: 'Atividades Realizadas',
                    data: [semanaRetrasada, semanaPassada, semanaAtual],
                    borderColor: '#35c594',
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: 'rgba(114,217,187, 0.5)'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        var qntTopicChart = new Chart(qntTopicCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total de Atividades Realizadas',
                        data: data,
                        borderColor: ['#72d9bb', '#35c594', '#142c4c', '#0d0f36'],
                        backgroundColor: [
                            'RGBA(114,217,187,0.4)',
                            'RGBA(53,197,148,0.4)',
                            'RGBA(20,44,76,0.4)',
                            'RGBA(13,15,54,0.4)'
                        ],
                        borderWidth: 2,
                        fill: true
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

    }).catch(error => {
        console.error(error);
    });
});

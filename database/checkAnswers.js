import { getDatabase, ref, get } from "firebase/database";
import { getSelected } from './utils.js';

const bd = getDatabase();
const inputs = document.querySelectorAll("input[type='radio']");

export function checkPreviousAnswer(uid, diffRef, currentQuestion, questionData, quizLength, verifica, acertos) {
    const answerRef = ref(bd, `userResults/${uid}/${diffRef}/${currentQuestion}`);
    get(answerRef).then(snapshot => {
        if (snapshot.exists()) {
            const dados = snapshot.val();
            if(currentQuestion  < quizLength){
                nextQuestion.style.display = 'flex';           
            }else{
                submit.style.display = 'flex';
            }

            inputs.forEach(input => {
                if(input.value == dados.resp){
                    input.checked = true; 
                }
            });


            showResult(questionData, acertos, quizLength, currentQuestion, verifica);
        }else{
            verifica.style.display = 'flex';
        }
    }).catch(error => {
        console.error("Ocorreu um erro ao verificar a resposta anterior:", error);
    });
}

export function verificar(currentQuestion, quizLength, acertos, questionData, verifica) {

    showResult(questionData, acertos, quizLength, currentQuestion, verifica);

    if (currentQuestion  === quizLength) {
        nextQuestion.style.display = "none";
        submit.style.display = "flex";
        verifica.style.display = 'none';
    }else{
        nextQuestion.style.display = "flex";
        verifica.style.display = 'none';
    }
}

function showResult( questionData, acertos, quizLength, currentQuestion, verifica) {
    const answer = getSelected();

    const result = document.querySelector('.resultado');
    const verResult = document.getElementById('verifica-result');
    const expResult = document.getElementById('explica-result');

    result.style.display = 'flex';

    if (answer === questionData.resposta) {
        verResult.innerText = "Parabéns, você acertou!";
        expResult.innerText = questionData.explicacao;
        acertos++;
    } else {
        verResult.innerText = "Que pena, você errou. Na próxima você consegue!";
        expResult.innerText = questionData.explicacao;
    }

    inputs.forEach(input => {
        input.disabled = true;
        if (input.value == questionData.resposta) {
            input.classList.add('correto');
        } else {
            input.classList.add('incorreto');
        }
    });

    if (currentQuestion  === quizLength) {
        nextQuestion.style.display = "none";
        submit.style.display = "flex";
        verifica.style.display = 'none';
    }
}

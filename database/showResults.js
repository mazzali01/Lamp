export function mostrarResultado(acertos, quizLength) {
    const enunciado = document.getElementById('enunciado');
    const labels = document.querySelectorAll('.label-resp');
    const nextQuestion = document.getElementById('nextQuestion');
    const submit = document.getElementById('submit');
    const verifica = document.getElementById('verifica');
    const fonte = document.getElementById('fonte');
    const comando = document.getElementById('comando');
    const resultado  = document.querySelector('.resultado');
    const respostas = document.querySelectorAll('.resposta');
    const trade = document.querySelector('.trade');

    const diffRef = localStorage.getItem('questionRef');
    const diff = localStorage.getItem('diff');
    const topic = localStorage.getItem('topic');

    // console.log(diffRef, diff, topic)

    var exp = acertos * 20; 

    enunciado.innerHTML = `Você acertou ${acertos} de ${quizLength} questões! \n Você recebeu um total de ${exp} de Lumens`;
    fonte.innerHTML = 'Resultado';

    nextQuestion.style.display = "none";
    submit.style.display = "none";
    verifica.style.display = 'none';
    resultado.style.display = 'none';
    comando.style.display = "none";
    trade.style.display = "none";

    respostas.forEach(resposta => {
        resposta.style.display = "none";
    });
}
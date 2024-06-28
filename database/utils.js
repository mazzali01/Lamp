import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const bd = getDatabase();

export function reset() {
    const inputs = document.querySelectorAll("input[type='radio']");
    const result = document.querySelector('.resultado');
    result.style.display = 'none';
    inputs.forEach((input) => {
        input.checked = false;
        input.disabled = false;
        input.classList.remove('correto', 'incorreto');
    });
}

export function getSelected() {
    let answer;
    const inputs = document.querySelectorAll("input[type='radio']");
    inputs.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    });
    return answer;
}

export function getDados(ref) {
    return new Promise((resolve, reject) => {
        onValue(ref, (snapshot) => {
            const dados = snapshot.val();
            if (dados) {
                resolve(dados);
            } else {
                reject(new Error('Dados não encontrados'));
                console.log("Dados não encontrados");
            }
        }, (error) => {
            reject(error);
            console.log(reject(error));
        });
    });
}


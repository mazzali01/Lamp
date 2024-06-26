import { getDatabase, ref, set, child, get, update } from "firebase/database";
import { getAuth } from "firebase/auth";

const bd = getDatabase();
const auth = getAuth();

function getCurrentWeek(diaZero) {
    const agora = new Date();//recebe o dia atual
    const diaZeroDate = new Date(diaZero);//recebe o dia zero do bd
    const diferencaEmMs = agora - diaZeroDate;//recebe a diferença entre o dia atual e o diazero
    const diasDesdeDiaZero = Math.floor(diferencaEmMs / (1000 * 60 * 60 * 24));//transforma essa diferença em ms para segundo
    return Math.floor(diasDesdeDiaZero / 7) + 1;//transforma em dia da semana
}

async function getTotal(refDias, correctDiaAtual) {
    let totalDiario = 0;//define o valor base do total como zero
    const snapshot = await get(child(refDias, `dia ${correctDiaAtual}`));//ref para o bd
    if (snapshot.exists()) {
        snapshot.forEach(topicoSnapshot => {//para cada topico no snapshot

            topicoSnapshot.forEach(diffSnapshot => {//para cada diff dentro dos topicos 
                totalDiario += diffSnapshot.val().questionsAnswerds;//adiciona o valor da ultima questão a variavel total diario
            });
        });
    }

    return totalDiario;
}

async function getWeeklyTotal(refSemanas, semanaAtual, topico) {
    const snapshot = await get(child(refSemanas, `semana ${semanaAtual}`));
    let totalSemanal = 0;

    if (snapshot.exists()) {
        snapshot.forEach(diaSnapshot => {
            diaSnapshot.forEach(topicoSnapshot => {
                topicoSnapshot.forEach(diffSnapshot =>{
                    totalSemanal += diffSnapshot.val().lastQuestion;
                })
        });
    })

        return totalSemanal;
    }
}

async function getExp(uid, exp) {
    const userRef = ref(bd, `user/${uid}`);
    const expRef = child(userRef, 'Lumens');
    const snapshot = await get(expRef);
    let userExp;

    if (snapshot.exists()) {
        userExp = exp + snapshot.val();
    } else {
        userExp = exp;
    }
    return userExp;
}

async function saveUserData(uid, currentQuestion, acertos, exp, firstQuestion) {
    const dataAtual = new Date();
    const userRef = ref(bd, `user/${uid}`);
    try {
        const diaZeroRef = child(userRef, 'diaZero');
        const snapshot = await get(diaZeroRef);

        let diaZero;
        if (snapshot.exists()) {
            diaZero = snapshot.val();
        } else {
            diaZero = dataAtual.toISOString().split('T')[0];
            await set(diaZeroRef, diaZero);
        }

        const semanaAtual = getCurrentWeek(diaZero);
        const diaAtual = Math.floor((dataAtual - new Date(diaZero)) / (1000 * 60 * 60 * 24)) + 1;
        const correctDiaAtual = String(diaAtual).padStart(2, '0');
        const topico = localStorage.getItem('topic');
        const diff = localStorage.getItem('diff');
        const refBase = `userResults/${uid}/semana ${semanaAtual}/dia ${correctDiaAtual}/${topico}/${diff}`;

        const refResults = ref(bd, refBase);
        const refDias = ref(bd, `userResults/${uid}/semana ${semanaAtual}`);
        const refSemanas = ref(bd, `userResults/${uid}`);

        const answerds = currentQuestion - firstQuestion;

        if(answerds > 0){
            await update(refResults, {
                data: dataAtual.toISOString().split('T')[0],
                lastQuestion: (currentQuestion - 1),
                acertos: acertos,
                questionsAnswerds: answerds 
            });
            
            let dailyTotalRef = ref(bd,`userResults/${uid}/semana ${semanaAtual}/dia ${correctDiaAtual}`)
            await update(dailyTotalRef, {
                dailyTotal: totalDiario
            })
        }

        const totalDiario = await getTotal(refDias, correctDiaAtual);



        const totalSemanal = await getWeeklyTotal(refSemanas, semanaAtual);
        const refWeeklyTotal = ref(bd, `userResults/${uid}/semana ${semanaAtual}/totalSemanal`);
        // // Erro ao salvar os dados: set failed: value argument contains NaN in property 'userResults.M51929f9pSPSzU4R2PyefV9zjE23.semana 1.total'
        await set(refWeeklyTotal, totalSemanal);

        const userExp = await getExp(uid, exp);
        await set(child(userRef, 'Lumens'), userExp);

        console.log("Dados salvos com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar os dados: ", error);
        alert("Erro ao salvar os dados: " + error.message);
    }
}

export { getCurrentWeek, saveUserData, getExp }

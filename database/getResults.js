import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get, child, onValue, query, orderByKey, limitToLast} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, onAuthStateChanged }from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

export async function getTotalGeral(uid){

    const refBase = ref(bd, `userResults/${uid}`)
    var totalGeral = 0;
    const snapshot = await get(refBase);
    
        snapshot.forEach((weekSnapshot) => {//para cada objeto dentro dos resultados do user
            const weekKey = weekSnapshot.key;//recebe o nome do objeto
            if (weekKey.startsWith('semana ')) {//se o nome do objeto começar com semana
                const weekData = weekSnapshot.val();// recebe os dados da semana 
                if (weekData && weekData.totalSemanal) {//se os dados que procuramos existirem
                    totalGeral += weekData.totalSemanal;//atribui-se os dados a variavel que retornaremos

                }
            }
        });
   
    return totalGeral
}

export async function getLumens(uid){
    const refBase = ref(bd, `user/${uid}`);
    var exp = 0;
    await onValue(refBase, (snapshot) =>{
        const data = snapshot.val();
        if(data && data.Lumens){
            exp = data.Lumens;
        }
    });
    return exp;
}

export async function getAcertos(uid){
    const refBase = ref(bd, `userResults/${uid}`);
    var acertos = 0;
    const snapshot = await get(refBase);


    await snapshot.forEach((weekSnapshot) => {//para cada objeto dentro dos resultados do user
        const weekKey = weekSnapshot.key;//recebe o nome do objeto
        if (weekKey.startsWith('semana ')) {//se o nome do objeto começar com semana
            weekSnapshot.forEach((daySnapshot) =>{//recebe todos os dias dentro de cada semana
                
            daySnapshot.forEach((topicSnapshot) =>{//recebe todos os topicos dentro de cada dia   
                topicSnapshot.forEach((diffSnapshot) =>{//recebe as dificuldades
                    const data = diffSnapshot.val();//cria uma var para receber os dados
                    acertos += data.acertos;//atribui a quantidade de acertos a variavel local
                });
            });
                
            });
        }
    });

    return acertos;
}


export async function getWeekProgress(uid){
    const refBase = ref(bd, `userResults/${uid}`)
    var semanalProgress = {};
    var lastWeekTotal = 0;
    var secondLastTotal = 0;
    var thirdLastTotal = 0;

    try {
        const snapshot = await get(refBase);
        if (snapshot.exists()) {
            // Ordena as semanas por chave e pega a última semana
            const lastWeekSnapshot = query(snapshot.ref, orderByKey(), limitToLast(1));//procura a ultima key
            const lastWeekData = (await get(lastWeekSnapshot)).val();//recebe os dados dessa key
            const lastWeekKey = Object.keys(lastWeekData)[0];//recebe o nome dessa key

            if (lastWeekData && lastWeekKey.startsWith('semana ')) {
                const lastWeek = lastWeekData[lastWeekKey];
                lastWeekTotal = lastWeek.totalSemanal;
            }


            const weeksData = snapshot.val();
            const weekKeys = Object.keys(weeksData).sort(); // Ordena as semanas por chave

            if (weekKeys.length > 2) { // Verifica se há pelo menos duas semanas
                const secondWeekKey = weekKeys[weekKeys.length - 2];//recebe o penultimo
                const secondWeek = weeksData[secondWeekKey];//pega i valor com a chave no objeto dados secundarios.
                
                secondLastTotal = secondWeek.totalSemanal;
            }

            if(weekKeys.length >3){
                const thirdWeekKey = weekKeys[weekKeys.length - 3];//recebe o penultimo
                const thirdWeek = weeksData[thirdWeekKey];//pega i valor com a chave no objeto dados secundarios.
                
                thirdLastTotal = thirdWeek.totalSemanal;
            }
        }

        semanalProgress = {
            semanaA: lastWeekTotal,//esta semamna
            semanaP: secondLastTotal,//semana passada
            semanaR: thirdLastTotal//semana retrasada
        }

    } catch (error) {
        console.error("Erro ao obter o progresso da última semana:", error);
    }

    return semanalProgress;
}
export async function getTopFour(uid) {
    const refBase = ref(bd, `userResults/${uid}`);
    const snapshot = await get(refBase);
    var answerds = {};

    await snapshot.forEach(semanaSnapshot => {//até o prox comnetario, recebendo a referencia, dia, topico ...
        const semanaKey = semanaSnapshot.key;
        if (semanaKey.startsWith('semana ')) {
            semanaSnapshot.forEach(diaSnapshot => {
                const dayKey = diaSnapshot.key;
                if (dayKey.startsWith('dia ')) {
                    diaSnapshot.forEach(topicoSnapshot => {
                        const topicoKey = topicoSnapshot.key;
                        if (!topicoKey.startsWith('daily')) {//se for um topico
                            var topicoTotal = 0;
                            topicoSnapshot.forEach(diffSnapshot => {
                                const diffData = diffSnapshot.val();
                                topicoTotal += diffData.questionsAnswerds;//recebe o total de questões respondidas desse topico
                            });
                            if (!answerds[topicoKey]) {
                                answerds[topicoKey] = 0;//se esse membro não existir o criará com um valor inicial
                            }
                            answerds[topicoKey] += topicoTotal;//incrementa ao valor de cada diff
                        }
                    });
                }
            });
        }
    });

    // Transforma o objeto answerds em um array de pares chave-valor
    let answerdsArray = Object.entries(answerds);
    
    // Ordena o array em ordem decrescente baseado nos valores (total de questões respondidas)
    answerdsArray.sort((a, b) => b[1] - a[1]);

    // Preenche valores nulos se houver menos de 4 tópicos
    while (answerdsArray.length < 4) {
        answerdsArray.push([``, 0]);
    }

    // Retorna apenas os 4 primeiros valores
    return answerdsArray.slice(0, 4);
}

import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getSelected } from '../database/utils.js';

const bd = getDatabase();
const auth = getAuth();
const diffRef = localStorage.getItem('questionRef');

export async function setResp(uid,currentQuestion) {
    const answer = getSelected();
    const resposta = {
        resp: answer
    };

    const answerRef = ref(bd, `userResults/${uid}/${diffRef}/${(currentQuestion)}`);
    await set(answerRef, resposta);
        

}

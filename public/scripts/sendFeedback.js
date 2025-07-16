const submitBtn = document.getElementById('send');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
import { ButtonsInMain } from "./script.js";

import { feedbackForm } from "./script.js";
import { feedbackFormDiv } from "./script.js";
import { blurred } from "./script.js";

feedbackForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

        const feedbackMessage = {
        name: document.getElementById('full_name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };


    // if(feedbackForm.checkValidity()) {

        try {
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
            const response = await axios.post('/feedback', (feedbackMessage));
            console.log(response.data)

            submitBtn.innerHTML = '<i class="ph ph-check-fat" style="color: var(--success-color);"></i>'
            
            await delay(3000);
            
            submitBtn.innerHTML = '<i class="ph ph-paper-plane-tilt"></i>';
            
            await delay(2000);
            feedbackFormDiv.classList.add('inactive')

            blurred.forEach(item => {
                    item.classList.remove('blurred')
                    item.style.cursor = 'auto'
            })

            ButtonsInMain.forEach(button => {
            button.disabled = false;
            button.style.cursor = 'auto'})

            feedbackForm.reset()

        } catch (error) {
            console.error('Erro ao enviar feedback:', error);
            
            // ⚠️ Atualiza imediatamente para ícone de erro
            submitBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-beat-fade" style="color: var(--error-color);"></i>';

            // Opcional: esperar um pouco antes de restaurar o estado
            await delay(2000);
            
            // Resetar para ícone padrão
            submitBtn.innerHTML = '<i class="ph ph-paper-plane-tilt"></i>';
}

        
    // } else {
    //     feedbackForm.reportValidity();
    // }
});
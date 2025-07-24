import {onSubmit} from './script.js'
import { FeedbackErrorMessage } from './script.js';
import { resultToBeSent } from './script.js';
import { resultForm } from './script.js';
import { link } from './script.js';


export function handleLongLinkSubmission(){

    onSubmit.addEventListener('click', async function handleFormSubmission(event){
    event.preventDefault()
    if(document.activeElement){
        document.activeElement.blur();
    }
    
    onSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>'
    let userUrl = resultToBeSent.value;
    try {
        const response = await axios.post('/submit', {userUrl});
        
        link.innerText = response.data.link;      
        document.getElementById('result-text-share').innerHTML = response.data.link;

        onSubmit.innerHTML = '<i class="ph ph-check-fat" style="color: var(--success-color);"></i>'
        setTimeout(() => {
            onSubmit.innerHTML = '<i class="ph ph-paper-plane-tilt"></i>';
        }, 3000);
        
        resultForm.classList.remove('hidden');

        setTimeout(() => {
            resultForm.classList.add('hidden')
        }, 15000);

        setTimeout(() => {
            resultToBeSent.value = ''
        }, 16000);
    

    } catch (error) {
        const inputEmpty = resultToBeSent.value === '';
        let message = '';
    
        if (inputEmpty) {
            message = 'Link field must not be empty';
            FeedbackErrorMessage(message, onSubmit, resultToBeSent);
            throw new Error(message);
        }
    
        const errorCode = error?.response?.data?.errorCode;
    
        switch (errorCode) {
            case 'SERVICE_UNAVAILABLE':
                message = 'Service unavailable. Try again later.';
                break;
    
            case 'INVALID_URL':
                message = 'Please enter a valid URL';
                break;
    
            case 'INTERNAL_ERROR':
                message = 'Internal error. check your connection or try again.';
                break;

            case'ETIMEDOUT':
                message = 'Trouble connecting. check your connection or try again later.'
                break
    
           default:
                message = 'Unexpected error. check your connection or try again.';
        }
    
        FeedbackErrorMessage(message, onSubmit, resultToBeSent);
        resultToBeSent.value = '';
        throw new Error(message);
    }
  
    })

}
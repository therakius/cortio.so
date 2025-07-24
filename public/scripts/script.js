const toCopy = document.getElementById('copy');

export let footer = document.getElementById('footer');

export let link = document.getElementById('result-text');

export const socials = document.getElementById('socials');

export const feedbackLinkButton = document.getElementById('tofeedback');

export const feedbackFormDiv = document.getElementById('feedback')
export const feedbackForm = document.getElementById('feedback-form')

const feedbackFormExit = document.querySelector('#feedback-exit');

export const onSubmit = document.getElementById('submit-btn');

export const toShare = document.querySelector('#share');

export const popup = document.getElementById('share-popup');

export const exitShare = document.getElementById('exit')

export const resultForm = document.getElementById('result-form');

export const ButtonsInMain = document.querySelectorAll('#main button');

const copyFromShare = document.getElementById('copied');

const sendForMobile = document.getElementById('send-mobile');

export const resultToBeSent = document.getElementById('user-input');

const toggHamburger = document.getElementById('ham-menu')

export let blurred = [resultForm, document.getElementById('input-form'), document.getElementById('title-form')];

let message = ''


import { handleLongLinkSubmission } from "./submit-link.js";
handleLongLinkSubmission(); 

import { handleLinkSharing, handleSocialsSharing } from "./link-sharing-handler.js";
handleLinkSharing();
handleSocialsSharing();


//global functions

async function copyFunctionality(item, button, options = {}) {
    const copiedText = item.innerText;

    try {
        await navigator.clipboard.writeText(copiedText);

        if (typeof options.onSuccess === 'function') {
            options.onSuccess(button);
        } else {

            button.innerHTML = '<i class="ph ph-check-fat"></i>';
            button.style.color = "var(--success-color)";
            setTimeout(() => {
                button.innerHTML = '<i class="ph ph-clipboard-text"></i>';
                button.style.color = "black";
            }, 3000);
        }

        console.log("link copied successfully");
        return copiedText;

    } catch (err) {
        console.log(err);
    }
}

export const FeedbackErrorMessage = (message, clickedButton, messageContainer)=>{

    clickedButton.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-beat-fade" style="color: var(--error-color);"></i>';
    messageContainer.placeholder = message;

    setTimeout(() => {
        clickedButton.innerHTML = '<i class="ph ph-paper-plane-tilt"></i>';
        messageContainer.placeholder = 'paste your link here ...';

    }, 5000);

}


toCopy.addEventListener('click', async (e) => {
    e.preventDefault();
    await copyFunctionality(link, toCopy, {
        onSuccess: (btn) => {
            btn.innerHTML = 'Copied <i class="ph ph-check-fat"></i>';
            btn.style.color = "var(--success-color)";
            setTimeout(() => {
                btn.innerHTML = 'Copy <i class="ph ph-clipboard-text"></i>';
                btn.style.color = "black";
            }, 3000);
        }
    });
}
);  


copyFromShare.addEventListener('click', () => {
    copyFunctionality(link, copyFromShare, {
        onSuccess: (btn) => {
            btn.innerHTML = '<i class="ph ph-check-fat"></i>';
            btn.style.color = "var(--success-color)";
            setTimeout(() => {
                btn.innerHTML = '<i class="ph ph-clipboard-text"></i>';
                btn.style.color = "black";
            }, 3000);
        }
    });
});


// displaying feedback form popup
feedbackLinkButton.addEventListener('click', function handleFeedbackFormPopup(event){
    event.preventDefault()

    popup.addEventListener('transitionend', function handler(){
        footer.style.zIndex = 'auto';
    })
    
    feedbackFormDiv.classList.remove('inactive')
    feedbackLinkButton.style.color = 'var(--primary-color)'

    if(popup.classList.contains('active')){
        popup.classList.remove('active')
    }

    blurred.forEach(item => {
        item.classList.add('blurred')
        item.style.cursor = 'auto'
    })

    document.querySelector('#input-form input').disabled = true;

    ButtonsInMain.forEach(button => {
        button.disabled = true;
        button.style.cursor = 'auto'
    })


})

feedbackFormExit.addEventListener('click', function handleFeedbackformExit(){
    feedbackFormDiv.classList.add('inactive')
    feedbackLinkButton.style.color = 'black';

   blurred.forEach(item => {
        item.classList.remove('blurred')
    })

   blurred.forEach(item => {
        item.classList.remove('blurred')
        item.style.cursor = 'auto'
    })

    document.querySelector('#input-form input').disabled = false;

    ButtonsInMain.forEach(button => {
        button.disabled = false;
        button.style.cursor = 'pointer'
    })



})

//mobile interactions

const copyShareButtons = [document.getElementById('copy-mobile'), document.getElementById('share-mobile')]

sendForMobile.addEventListener('click', async (e)=>{
    e.preventDefault();

    onSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';

    const userUrl = resultToBeSent.value
    
    try {
        const response = await axios.post('/submit', {userUrl});

        link.innerText = response.data.link;      
        
        resultForm.classList.remove('hidden');

        onSubmit.innerHTML = '<i class="ph ph-check-fat" style="color: var(--success-color);"></i>'
        setTimeout(() => {
            onSubmit.innerHTML = '<i class="ph ph-paper-plane-tilt"></i>';
        }, 3000);

        copyShareButtons.forEach(item => item.classList.remove('hidden'));

        setTimeout(() => {

            copyShareButtons[0].classList.remove('hidden')
        }, 800);
    
        setTimeout(() => {
            copyShareButtons[1].classList.remove('hidden')
    
        }, 500);
    
        setTimeout(() => {
            copyShareButtons[0].classList.add('hidden');
        
            setTimeout(() => {
                copyShareButtons[1].classList.add('hidden');
        
                setTimeout(() => {
                    resultForm.classList.add('hidden');
                }, 1000); // 1s depois do botão 1 sumir
        
            }, 1000); // 1s depois do botão 0 sumir
        
        }, 15000); // Espera inicial de 15s  


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
                message = 'check your connection or try again later';
                break;
    
            default:
                message = 'Unexpected error. check your connection and try again.';
        }
    
        FeedbackErrorMessage(message, onSubmit, resultToBeSent);
        resultToBeSent.value = '';
        throw new Error(message);
    }
})

copyShareButtons[0].addEventListener('click', async (e)=>{

    copyFunctionality(link, copyShareButtons[0], {
        onSuccess : (btn)=>{
            btn.innerHTML = '<i class="ph ph-check-fat"></i>';
            btn.style.color = "var(--success-color)";
            setTimeout(() => {
                btn.innerHTML = '<i class="ph ph-clipboard-text"></i>';
                btn.style.color = "black";
            }, 3000);
        }
    });
})

copyShareButtons[1].addEventListener('click', async (e)=>{
    const shareData = {
        title: "Cortio-so",
        text: "Share your URLs fast and easy!",
        url: (link.innerText),
      };

      console.log(shareData.url)

      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error(err);
      }
})

toggHamburger.addEventListener('click', (e)=>{
    toggHamburger.classList.toggle('ph-x')

    if (!toggHamburger.classList.contains('ph-x')) {
        document.getElementById('tofeedback').classList.add('hidden')
    } else {
        document.getElementById('tofeedback').classList.remove('hidden')
    }

} )

feedbackLinkButton.addEventListener('click', (e)=>{
    if(toggHamburger.classList.contains('ph-x')) {
        toggHamburger.classList.toggle('ph-x')
        feedbackLinkButton.classList.add('hidden')
    }
})

if (document.documentElement.clientWidth < 600) {
    const buttonC = document.getElementById('form-copy-btn')
    buttonC.disabled = true;
    buttonC.style.color= 'black'

    const buttonS = document.getElementById('submit-btn')
    buttonS.disabled = false;
    buttonS.style.color = 'black'
    console.log(`your screen is ${document.documentElement.clientWidth}px wide`)

}

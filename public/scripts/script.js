const toCopy = document.getElementById('copy');

let link = document.getElementById('result-text');

const feedbackLinkButton = document.getElementById('tofeedback');

export const feedbackFormDiv = document.getElementById('feedback')
export const feedbackForm = document.getElementById('feedback-form')

const feedbackFormExit = document.querySelector('#feedback-exit');

const onSubmit = document.getElementById('submit-btn');

const toShare = document.querySelector('#share');

const popup = document.getElementById('share-popup');

const exitShare = document.getElementById('exit')

const resultForm = document.getElementById('result-form');

export const ButtonsInMain = document.querySelectorAll('#main button');

const copyFromShare = document.getElementById('copied');

const sendForMobile = document.getElementById('send-mobile');

const resultToBeSent = document.getElementById('user-input');

const toggHamburger = document.getElementById('ham-menu')

export let blurred = [resultForm, document.getElementById('input-form'), document.getElementById('title-form')];

let message = ''

//global functions

async function copyFunctionality(item, button, options = {}) {
    const copiedText = item.innerText;

    try {
        await navigator.clipboard.writeText(copiedText);

        // Se foi passada alguma função de feedback visual, usa ela
        if (typeof options.onSuccess === 'function') {
            options.onSuccess(button);
        } else {
            // Estilo padrão
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

const FeedbackErrorMessage = (message, clickedButton, messageContainer)=>{

    clickedButton.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-beat-fade" style="color: var(--error-color);"></i>';
    messageContainer.placeholder = message;

    setTimeout(() => {
        clickedButton.innerHTML = '<i class="ph ph-paper-plane-tilt"></i>';
        messageContainer.placeholder = 'paste your link here ...';

    }, 5000);

}



exitShare.addEventListener("click", function handleExitShare(){

    popup.classList.remove('active');
    
    document.getElementById('footer').style.zIndex = -1;

    popup.addEventListener('transitionend', function handler(){
        document.getElementById('footer').style.zIndex = 'auto';
    })

})

toShare.addEventListener('click', async function handleShareFunctionality(){

    await navigator.clipboard.writeText(link.innerText);

    popup.classList.add('active');
    document.getElementById('footer').style.zIndex = -1;

    if(!feedbackLinkButton.classList.contains('inactive')){
        feedbackFormDiv.classList.add('inactive')
    }

    popup.addEventListener('transitionend', ()=>{
        document.getElementById('footer').style.zIndex = -1;
    })

})

// submitting the long link

onSubmit.addEventListener('click', async function handleFormSubmission(event){
    event.preventDefault()
    if(document.activeElement){
        document.activeElement.blur();
    }
    
    onSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>'
    let userUrl = resultToBeSent.value;
    try {
        const response = await axios.post('/submit', {userUrl});

        console.log('Resposta do servidor:', response.data);
        console.log(response.data.link);
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

// copy functionalities

toCopy.addEventListener('click',()=>{
   copyFunctionality(link, toCopy, {onSuccess: (btn)=>{
    btn.innerHTML = ' copied <i class="ph ph-check-fat"></i>';
    btn.style.color = "var(--success-color)";

    setInterval(() => {
        btn.innerHTML = ' copy <i class="ph ph-clipboard-text"></i>';
        btn.style.color = "black";
    }, 3000);
   }})
});


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
        document.getElementById('footer').style.zIndex = 'auto';
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


// function to return object with links to the apps
function linksToApp(){

    const shareTo = {
        text: encodeURIComponent("Check this out - it might be usefull for you"),
        link: encodeURIComponent(link.innerText)
    }

    const body = `Check this out! it might be useful for you: ${encodeURIComponent(link.innerText)}`;


    const socials = {
        whatsapp: `https://web.whatsapp.com/send?text=${shareTo.text}%20${shareTo.link}`,
        telegram: `https://web.telegram.org/k/#@share/url?url=${shareTo.link}&text=${shareTo.text}`,
        twitter: `https://twitter.com/intent/tweet?url=${shareTo.link}&text=${shareTo.text}`,
        linkedin: `https://linkedin.com/sharing/share-offsite/?url=${shareTo.link}&text=${shareTo.text}`,
        email: `mailto:?subject=${encodeURIComponent("Interesting")}&body=${body}`,
        facebook: `https://facebook.com/sharer/sharer.php?u=${shareTo.link}`
        
    }

    return socials;
}

// Sharing event

document.getElementById('socials').addEventListener('click', (e)=>{

    popup.classList.remove('active')

    const social = e.target.dataset.social;

    console.log(social)
    setTimeout(() => {
         if(social && linksToApp()[social]) {
        window.open(linksToApp()[social], "_blank")
         }
    }, 800);

    popup.addEventListener('transitionend', function handler(){
        document.getElementById('footer').style.zIndex = 'auto';
    })
   

    console.log(linksToApp()[social]);

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
        // resultPara.textContent = "MDN shared successfully";
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

console.log(screen.width)

if (document.documentElement.clientWidth < 600) {
    const buttonC = document.getElementById('form-copy-btn')
    buttonC.disabled = true;
    buttonC.style.color= 'black'

    const buttonS = document.getElementById('submit-btn')
    buttonS.disabled = false;
    buttonS.style.color = 'black'
    console.log(`your screen is ${document.documentElement.clientWidth}px wide`)

}

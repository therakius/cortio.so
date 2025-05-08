const toCopy = document.getElementById('copy');
let link = document.getElementById('result-text');
const displayFeedbackForm = document.getElementById('tofeedback')
const feedbackForm = document.getElementById('feedback')
const feedbackFormExit = document.querySelector('#feedback-exit')
const feedbackLinkButton = document.getElementById('tofeedback')
const onSubmit = document.getElementById('submit-btn')
const toShare = document.querySelector('#share');
const popup = document.getElementById('share-popup');
const exitShare = document.getElementById('exit')
const resultForm = document.getElementById('result-form');

const ButtonsInMain = document.querySelectorAll('#main button')

const copyFromShare = document.getElementById('copied');

const sendForMobile = document.getElementById('send-mobile')

const resultToBeSent = document.getElementById('user-input');

let blurred = ()=>{

    const blurBehind = [resultForm, document.getElementById('input-form'), document.getElementById('title-form')]

    return blurBehind;
}


exitShare.addEventListener("click", ()=>{
    popup.classList.remove('active');
    document.getElementById('footer').style.zIndex = -1;

    popup.addEventListener('transitionend', function handler(){
        document.getElementById('footer').style.zIndex = 'auto';
    })

})

toShare.addEventListener('click',async()=>{
    await navigator.clipboard.writeText(link);
    popup.classList.add('active');
    document.getElementById('footer').style.zIndex = -1;

    if(!displayFeedbackForm.classList.contains('inactive')){
        feedbackForm.classList.add('inactive')
    }

    popup.addEventListener('transitionend', ()=>{
        document.getElementById('footer').style.zIndex = -1;
    })

})

// submitting the long link

onSubmit.addEventListener('click', async (event)=>{
    event.preventDefault()
    const userUrl = resultToBeSent.value
    let shortenedLink;
    
    try {
        const response = await axios.post('/submit', {userUrl});

        console.log('Resposta do servidor:', response.data);
        console.log(response.data.link);
        link.innerText = response.data.link;      
        
        console.log(link)

        
    } catch (error) {
        console.error('erro ao enviar dados')
    }

    resultForm.classList.remove('hidden')

    setTimeout(() => {
        resultForm.classList.remove('hidden')
    }, 15000);


    
})

// copy functionalities

toCopy.addEventListener('click', async ()=>{
   
    try{

         await navigator.clipboard.writeText(link.innerText);
         toCopy.innerHTML = 'copied <i class="ph ph-check-fat"></i>';
         toCopy.style.color = "var(--success-color)";

         setTimeout(()=>{
            toCopy.innerHTML = 'copy <i class="ph ph-clipboard-text"></i>'
            toCopy.style.color = "black";
         }, 3000)


         console.log("link copied successfully")      
    } catch (err) {
        console.log(err)
    }
});
copyFromShare.addEventListener('click', async ()=>{
    console.log("You clicked me!")
    try{

        await navigator.clipboard.writeText(link.innerText);
        document.querySelector('.shortened > i').classList.remove('ph-clipboard-text');
        document.querySelector('.shortened > i').classList.add('ph-check-fat');
        copyFromShare.style.color = "var(--success-color)";

        setTimeout(()=>{
            document.querySelector('.shortened > i').classList.add('ph-clipboard-text');
            document.querySelector('.shortened > i').classList.remove('ph-check-fat');
           copyFromShare.style.color = "black";
        }, 3000)


        console.log("link copied successfully")      
   } catch (err) {
       console.log(err)
   }
})

// displaying feedback form popup
displayFeedbackForm.addEventListener('click', (event)=>{
    event.preventDefault()

    popup.addEventListener('transitionend', function handler(){
        document.getElementById('footer').style.zIndex = 'auto';
    })
    
    feedbackForm.classList.remove('inactive')
    feedbackLinkButton.style.color = 'var(--primary-color)'

    if(popup.classList.contains('active')){
        popup.classList.remove('active')
    }

    blurred().forEach(item => {
        item.classList.add('blurred')
        item.style.cursor = 'auto'
    })

    document.querySelector('#input-form input').disabled = true;

    ButtonsInMain.forEach(button => {
        button.disabled = true;
        button.style.cursor = 'auto'
    })


})

feedbackFormExit.addEventListener('click', ()=>{
    feedbackForm.classList.add('inactive')
    feedbackLinkButton.style.color = 'black';

    blurred().forEach(item => {
        item.classList.remove('blurred')
    })

    blurred().forEach(item => {
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
        link: encodeURIComponent(link)
    }

    const body = encodeURIComponent(`Check this out – it might be useful for you: ${link}`);


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
   

    console.log(linksToApp()[social])

})

//mobile interactions

const copyShareButtons = [document.getElementById('copy-mobile'), document.getElementById('share-mobile')]
const toggHamburger = document.getElementById('dotted');

sendForMobile.addEventListener('click', async (e)=>{
    e.preventDefault();

    const userUrl = resultToBeSent.value
    let shortenedLink;
    
    try {
        const response = await axios.post('/submit', {userUrl});

        console.log('Resposta do servidor:', response.data);
        console.log(response.data.link);
        link.innerText = response.data.link;      
        
        console.log(link)

        
    } catch (error) {
        console.error('erro ao enviar dados')
    }

    resultForm.classList.remove('hidden')

    copyShareButtons[0].addEventListener('click', async (e)=>{
        try{

            await navigator.clipboard.writeText(link);
            copyShareButtons[0].innerHTML = '<i class="ph ph-check-fat"></i>';
            copyShareButtons[0].style.color = "var(--success-color)";
   
            setTimeout(()=>{
                copyShareButtons[0].innerHTML= '<i class="ph ph-clipboard-text"></i>'
               copyShareButtons[0].style.color = "black";
            }, 3000)
   
   
            console.log("link copied successfully")      
       } catch (err) {
           console.log(err)
       }
    })
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
    buttonS.disabled = true;
    buttonS.style.color = 'black'
    console.log(`your screen is ${document.documentElement.clientWidth}px wide`)

}




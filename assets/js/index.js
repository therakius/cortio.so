const toCopy = document.getElementById('copy');
const link = document.getElementById('result-text').innerText.trim();
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

toCopy.addEventListener('click', async ()=>{
   
    try{

         await navigator.clipboard.writeText(link);
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

onSubmit.addEventListener('click', (event)=>{
    event.preventDefault()

    resultForm.classList.remove('hidden')
    setTimeout(() => {
        resultForm.classList.add('hidden')
    }, 15000);
    
})


const toCopy = document.getElementById('copy');
const link = document.getElementById('result-text').innerText;
const displayFeedbackForm = document.getElementById('tofeedback')
const feedbackForm = document.getElementById('feedback')
const feedbackFormExit = document.querySelector('#feedback-exit')
const feedbackLinkButton = document.getElementById('tofeedback')

const toShare = document.querySelector('#share');
const popup = document.getElementById('share-popup');

const exitShare = document.getElementById('exit')


exitShare.addEventListener("click", ()=>{
    popup.classList.remove('active');
})

toShare.addEventListener('click', ()=>{
 popup.classList.add('active');
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
    feedbackForm.classList.remove('inactive')
    feedbackLinkButton.style.color = 'var(--primary-color)'

})

feedbackFormExit.addEventListener('click', ()=>{
    feedbackForm.classList.add('inactive')
    feedbackLinkButton.style.color = 'black'
})


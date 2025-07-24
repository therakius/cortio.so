import { popup, feedbackLinkButton, link, footer, toShare, exitShare, feedbackFormDiv, socials } from "./script.js";

function SocialsSharing(){
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

export function handleLinkSharing(){

    toShare.addEventListener('click', async function handleShareFunctionality(){
    
        await navigator.clipboard.writeText(link.innerText);
    
        popup.classList.add('active');
        footer.style.zIndex = -1;
    
        if(!feedbackLinkButton.classList.contains('inactive')){
            feedbackFormDiv.classList.add('inactive')
        }
    
        popup.addEventListener('transitionend', ()=>{
            footer.style.zIndex = -1;
        })
    
    })

    exitShare.addEventListener("click", function handleExitShare(){

    popup.classList.remove('active');
    
    footer.style.zIndex = -1;

    popup.addEventListener('transitionend', function handler(){
        footer.style.zIndex = 'auto';
    })
})
} 


export function handleSocialsSharing(){
    socials.addEventListener('click', (e)=>{

    popup.classList.remove('active')

    const social = e.target.dataset.social;

    setTimeout(() => {
         if(social && SocialsSharing()[social]) {
        window.open(SocialsSharing()[social], "_blank")
         }
    }, 800);

    popup.addEventListener('transitionend', function handler(){
        footer.style.zIndex = 'auto';
    })
   

})
}
const toShare = document.querySelector('#share');
const toCopy = document.getElementById('copy');
const link = document.getElementById('result-text').innerText;



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

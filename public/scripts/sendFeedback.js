const sendButton = document.getElementById('send');


sendButton.addEventListener('click', async (e)=>{
    e.preventDefault();

    const feedbackMessage = {
        name: document.getElementById('full_name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    let hasEmptyField = true;
    
    Object.keys(feedbackMessage).forEach(key => {
        if (feedbackMessage[key].trim() === '') {
            console.log(`${key} must not be empty`);
            hasEmptyField = false;
        }
    });
    
    if (hasEmptyField) {

        try {
            const response = await axios.post('/feedback', (feedbackMessage))
            console.log('Resposta do servidor:', response.data);

        } catch (error) {
            console.error('something went wrong', error.data)
        }
       
    }
    

    
})
import express from 'express';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const server_email = process.env.EMAIL_ADDRESS;
const server_email_pass = process.env.EMAIL_PASSWORD;

const router = express.Router();
import bodyParser from 'body-parser';

router.use(bodyParser.urlencoded({extended: true}));

router.post('/feedback', async (req, res)=>{
    let feedbackMessage = req.body
    console.log(feedbackMessage)
    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: server_email,
                pass: server_email_pass
            }
        })

        async function main() {
            const info = await transporter.sendMail({
                from : `"Gaspar, from Syntaxis" <${server_email}>`,
                to: req.body.email,
                subject : `Your feedback has been received!`,
                html: `
                <h2>Thank you for your feedback!</h2>
                <p>Hi, ${req.body.name}!</p>
                <p>We’ve received your feedback with the subject <b>${req.body.subject}</b> and it will be taken into consideration for future updates to the app.</p>
                <p>Your input is invaluable to us, and we’re always working to improve the user experience.</p>
                <p>Best regards, <br> The Syntaxis Team</p>

                `,
            })


         // sending data to google forms

            const formData = new URLSearchParams();
            formData.append('entry.1122704515', req.body.name)
            formData.append('entry.2090161290', req.body.email)
            formData.append('entry.840222182', req.body.subject)
            formData.append('entry.2100339726', req.body.message)            

            const googleFormURL = process.env.GOOGLE_FORMS_URL;

            const response = await fetch(googleFormURL, {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })   


        console.log("message sent: %s", info.messageId)
        const result = await response.text();
        console.log('Form submitted to Google Form (preview):', result.substring(0, 200));
    }
    
        await main()

        const feedbackDict = {feedback : "Message sent successfully!"}

        res.json({feedback_response: feedbackDict.feedback})

    } catch (error) {
        console.error('an error occured', error)
        res.json({error: error})
    }


  
})



export default router;

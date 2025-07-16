import nodemailer from "nodemailer";
import { server_email_pass, server_email } from "../credentials/server.data.js";

export async function sendFeedback(req, res) {
    const {name, email, subject, message} = req.body;
    console.log(name, email, subject, message)
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
                to: email,
                subject : `Your feedback has been received!`,
                html: `
                <h2>Thank you for your feedback!</h2>
                <p>Hi, ${name}!</p>
                <p>We’ve received your feedback with the subject <b>${subject}</b> and it will be taken into consideration for future updates to the app.</p>
                <p>Your input is invaluable to us, and we’re always working to improve the user experience.</p>
                <p>Best regards, <br> The Syntaxis Team</p>

                `,
            })


         // sending data to google forms

            const formData = new URLSearchParams();
            formData.append('entry.1122704515', name)
            formData.append('entry.2090161290', email)
            formData.append('entry.840222182', subject)
            formData.append('entry.2100339726', message)            

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
        return res.status(500).json({ error: 'Falha ao enviar email.' });
    }

}
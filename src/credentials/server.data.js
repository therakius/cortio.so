import dotenv from 'dotenv'
dotenv.config();

export const server_email = process.env.EMAIL_ADDRESS;
export const server_email_pass = process.env.EMAIL_PASSWORD;
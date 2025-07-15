import dotenv from 'dotenv'
dotenv.config()

export const link = 'https://api.tinyurl.com/create';

export const config = {
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
    'Content-Type': 'application/json',
  },
};


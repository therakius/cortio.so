import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); 
import feedbackRoute from './feedback.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));
app.set("view engine", "html");
app.use(express.json());

app.use('/', feedbackRoute);

app.get('/', async (req, res)=>{
    res.sendFile(__dirname+ '/views/index.html')
})

const link = 'https://api.tinyurl.com/create';

const config = {
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

app.post('/submit', async (req, res) => {
  const userUrl = req.body.userUrl;

  try {
    const response = await axios.post(link, { url: userUrl }, config);
    
    const shortenedLink = response.data.data.tiny_url;
    console.log(response.data);

    res.json( {link: shortenedLink});

  } catch (error) {
    console.error(error); // Mantenha no log do servidor apenas
  
    // Caso 1: resposta HTTP 422
    if (error.response?.status === 422) {
      return res.status(422).json({
        errorCode: 'INVALID_URL',
        message: 'Please enter a valid url.'
      });
    }
  
    // Caso 2: serviço remoto retornou HTTP 503
    if (error.response?.status === 503) {
      return res.status(503).json({
        errorCode: 'SERVICE_UNAVAILABLE',
        message: 'Service unavailable. check your connection or try again later.'
      });
    }
  
    // Caso 3: erro de rede/baixo nível — sem resposta do servidor
    if (error.code === 'ESOCKET' || error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return res.status(503).json({
        errorCode: 'NETWORK_ERROR',
        message: 'Trouble connecting. check your connection or try again later.'
      });
    }
  
    // Fallback: erro interno inesperado
    return res.status(500).json({
      errorCode: 'INTERNAL_ERROR',
      message: 'an error occured. check your connection or try again later'
    });
  }
  
});


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})
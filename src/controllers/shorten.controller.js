import express from "express";
import axios from "axios";
import morgan from "morgan";
import { link, config } from "../services/api.tinyurl.js";
const app = express();
app.use(morgan('dev'));

export async function shortenLink(req, res){
    const userUrl = req.body.userUrl

    try {
        const response = await axios.post(link, { url: userUrl }, config);
        
        const shortenedLink = response.data.data.tiny_url;
        console.log(shortenedLink);

        res.json( {link: shortenedLink});

    } catch (error) {
        console.error(`error: ${error.code} | ${error.message}`); // Mantenha no log do servidor apenas
    
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
        if (error.code === 'ESOCKET' || error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
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
}

export default shortenLink;
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); 


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
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Error while shortening the link' });
  }
});


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})
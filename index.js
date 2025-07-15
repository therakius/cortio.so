import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config(); 
import feedbackRoute from "./src/routes/feedback.route.js"
import shortenRoute from "./src/routes/shorten.route.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));
app.use(express.json());
app.use(morgan('dev'));

app.use("/feedback", feedbackRoute);
app.use("/submit", shortenRoute);

app.get('/', async (req, res)=>{
    res.sendFile(__dirname+ '/views/index.html');
});


app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})
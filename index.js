import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());

app.get('/', async (req, res)=>{
    res.render('index.ejs')
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})
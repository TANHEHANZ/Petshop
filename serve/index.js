const express = require('express');
var cors = require('cors');
const dotenv = require('dotenv')
const usuario=require('./controllers/usuario');

const app = express();
const port = 3000;
dotenv.config();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(cors());

app.use(usuario);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
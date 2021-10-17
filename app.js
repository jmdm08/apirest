const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const controladorUsuarios = require('./usuarios/controller');
const controladorAuth = require('./auth/controller');

//CONFIGURAR EL API.
const port = process.env.API_PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// IMPLEMENTAR CONTROLADORES
// URL_SERVER:PORT/usuarios/listar
app.use("/usuarios", controladorUsuarios);
app.use("/auth", controladorAuth);

// CONFIGURAR CARPETA PÚBLICA
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// CARGAR EL INDEX.HTML DESDE LA CARPETA PÚBLICA.
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname+'./index.html'));
});

app.listen(port, function(){
    console.log("API ejecutándose en el puerto: " + port);
});
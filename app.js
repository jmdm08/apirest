const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const controladorUsuarios = require('./usuarios/controller');

//CONFIGURAR EL API.
const port = process.env.API_PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// IMPLEMENTAR CONTROLADORES
// URL_SERVER:PORT/usuarios/listar
app.use("/usuarios", controladorUsuarios);

app.listen(port, function(){
    console.log("API ejecutándose en el puerto: " + port);
});
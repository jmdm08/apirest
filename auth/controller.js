const express = require('express');
const routes = express.Router();
const servicosAuth = require('./service');

routes.post("/registrar", async function(req, res){
    let datos = req.body;
    let resultados = await servicosAuth.registrarUsuario(datos);
    res.send(resultados);
});

routes.post("/iniciar", async function(req, res){
    let datos = req.body;
    let resultados = await servicosAuth.iniciarSesion(datos);
    res.send(resultados);
})

module.exports = routes;
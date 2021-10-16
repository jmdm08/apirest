const express = require('express');
const routes = express.Router();
const serviciosUsuarios = require('./service');

/*
    GET -> SELECCIONAR TODOS
    GET -> SELECCIONAR UNO
    POST -> CREAR
    DELETE -> ELIMINAR
    PUT -> ACTUALIZAR
*/

// SELECCIONAR TODOS LOS USUARIOS
routes.get("/listar", function(req, res){
    // AQUI SE LLAMA EL SERVICIO QUE VA A TRANSFORMAR LA PETICIÓN
    let data = serviciosUsuarios.obtenerUsuarios();
    res.send({mensaje: data});
});

// OBTENER UN USUARIO
routes.get("/listar/:id", function(req, res){
    // AQUÍ EL SERVICIO
    let id = req.params.id;
    let data = serviciosUsuarios.obtenerUsuario(id);
    res.send({mensaje: data});
});

routes.post("/crear", async function(req, res){
    let datos = req.body;
    let data = await serviciosUsuarios.crearUsuario(datos);
    res.status(201).send(data);
})

routes.put("/actualizar/:id", async function(req, res){
    let id = req.params.id;
    let datos = req.body;
    let data = await serviciosUsuarios.actualizarUsuario(id, datos);
    res.send(data);
});

// ID POR QUERY
routes.delete("/eliminar", async function(req, res){
    let id = req.query.id;    
    let data = await serviciosUsuarios.eliminarUsuario(id);
    res.send(data);
})

module.exports = routes;
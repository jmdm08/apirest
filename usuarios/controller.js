const express = require('express');
const routes = express.Router();
const rutaProtegida = require('../jwt/jwt');
const serviciosUsuarios = require('./service');

/*
    GET -> SELECCIONAR TODOS
    GET -> SELECCIONAR UNO
    POST -> CREAR
    DELETE -> ELIMINAR
    PUT -> ACTUALIZAR
*/

// SELECCIONAR TODOS LOS USUARIOS
routes.get("/listar", rutaProtegida, async function(req, res){
    // AQUI SE LLAMA EL SERVICIO QUE VA A TRANSFORMAR LA PETICIÓN
    let data = await serviciosUsuarios.obtenerUsuarios();
    res.send({usuarios: data});
});

// OBTENER UN USUARIO
routes.get("/listar/:id", rutaProtegida, async function(req, res){
    // AQUÍ EL SERVICIO
    let id = req.params.id;
    let data = await serviciosUsuarios.obtenerUsuario(id);
    res.send(data);
});

routes.post("/crear", rutaProtegida, async function(req, res){
    let datos = req.body;
    let data = await serviciosUsuarios.crearUsuario(datos);
    res.status(201).send(data);
})

routes.put("/actualizar/:id", rutaProtegida, async function(req, res){
    let id = req.params.id;
    let datos = req.body;
    let data = await serviciosUsuarios.actualizarUsuario(id, datos);
    res.send(data);
});

// ID POR QUERY
routes.delete("/eliminar", rutaProtegida, async function(req, res){
    let id = req.query.id;    
    let data = await serviciosUsuarios.eliminarUsuario(id);
    res.send(data);
})

module.exports = routes;
const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

routes.use(function(req, res, next){
    let token = undefined;

    if(req.headers['authorization']){
        token = req.headers['authorization'].split(" ").pop();
    }

    if(token){
        jwt.verify(token, process.env.JWT_LLAVE, function(error, decoded){
            if(error){
                res.status(401).send({mensaje: "Token Inválido"});
            }
            else{
                req.usuario = decoded;
                next();
            }
        })
    }
    else{
        res.status(401).send({mensaje: "Sin autorización"})
    }
});

module.exports = routes;
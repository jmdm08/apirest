const modeloAuth = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function registrarUsuario(datos){
    let saltRounds = parseInt(process.env.ENC_SALT_ROUNDS);
    let contrasena = bcrypt.hashSync(datos.contrasena, saltRounds);
    datos.contrasena = contrasena;
    let resultado = await modeloAuth.insertSQL(datos);
    return resultado;
}

async function iniciarSesion(datos){
    let resultado = await modeloAuth.selectByUsuarioSQL(datos.usuario);
    let hash = resultado[0].contrasena;
    let esValida = bcrypt.compareSync(datos.contrasena, hash);
    if(esValida){
        // CREAR EL TOKEN
        let payload = {
            id : resultado[0].id,
            usuario : resultado[0].usuario,
            roles: []
        };

        const token = jwt.sign(payload, process.env.JWT_LLAVE, { expiresIn: process.env.JWT_EXPIRES})

        resultado = {mensaje: "OK", token: token}

    }
    else{
        resultado = {mensaje: "Contraseña Inválida", token: false}
    }
    return resultado;
}

module.exports.registrarUsuario = registrarUsuario;
module.exports.iniciarSesion = iniciarSesion;
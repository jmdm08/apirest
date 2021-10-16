const modeloUsuario = require('./model');

function obtenerUsuarios(){
    // AQUÍ SE LLAMAN LOS MODELOS QUE SE NECESITEN.
    return "Lista de usuario";
}

function obtenerUsuario(id){
    // AQUÍ SE LLAMA EL MODEL
    return "Datos del usuario: " + id;
}

// async
async function crearUsuario(datos){
    const resultado = await modeloUsuario.insertSQL(datos);
    return resultado;
}

async function actualizarUsuario(id, datos){
    const resultado = await modeloUsuario.updateSQL(id, datos);
    return resultado;
}

async function eliminarUsuario(id){
    const resultado = await modeloUsuario.deleteSQL(id);
    return resultado;
}

module.exports.obtenerUsuarios = obtenerUsuarios;
module.exports.obtenerUsuario = obtenerUsuario;
module.exports.crearUsuario = crearUsuario;
module.exports.actualizarUsuario = actualizarUsuario;
module.exports.eliminarUsuario = eliminarUsuario;
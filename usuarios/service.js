const modeloUsuario = require('./model');

async function obtenerUsuarios(){
    const resultados = await modeloUsuario.selectSQL();
    return resultados;
}

async function obtenerUsuario(id){
    const resultados = await modeloUsuario.selectByIdSQL(id); 
    return resultados;
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
const conexion = require('../database/conexion');

function insertSQL(datos){
    let arrayDatos;
    if(datos){
        arrayDatos = [datos.usuario, datos.contrasena]
    }
    else{
        return false;
    }

    let insertSQL = "INSERT INTO login (usuario, contrasena) VALUES (?,?)";
    return conexion.getConnection()
        .then(function(con){
            return con.query(insertSQL, arrayDatos)
                .then(function(resultado){
                    return resultado;
                })
        })
        .catch(function(error){
            console.log(error);
        });
}

function selectByUsuarioSQL(usuario){
    let arrayDatos;
    if(usuario){
        arrayDatos = [usuario]
    }
    else{
        return false;
    }

    let selectSQL = "SELECT * FROM login WHERE usuario = ?";
    return conexion.getConnection()
        .then(function(con){
            return con.query(selectSQL, arrayDatos)
                .then(function(resultado){
                    return resultado;
                })
        })
        .catch(function(error){
            console.log(error);
        });
}

module.exports.insertSQL = insertSQL;
module.exports.selectByUsuarioSQL = selectByUsuarioSQL;
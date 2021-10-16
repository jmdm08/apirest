const conexion = require("../database/conexion");

function insertSQL(datos){
    let arrayDatos;
    if(datos){
        arrayDatos = [];
    }
    else{
        return false;
    }
    const sqlInsert = "INSERT INTO usuario (nombres, apellidos, email, edad) VALUES (?,?,?,?)";
    return conexion.getConnection()
        .then(function(con){
            return con.query(sqlInsert, arrayDatos)
                .then(function(resultados){
                    return resultados;
                })
        })
        .catch(function(error){
            console.log(error)
        });
}

function updateSQL(id, datos){
    let arrayDatos;
    if(datos && id){
        arrayDatos = [datos.nombres, datos.apellidos, datos.email, datos.edad, id]
    }
    else{
        return false;
    }

    let updateSQL = "UPDATE usuario SET nombres = ?, apellidos = ?, email = ?, edad = ? WHERE id = ?";
    return conexion.getConnection()
        .then(function(con){
            return con.query(updateSQL, arrayDatos)
                .then(function(resultados){
                    return resultados;
                })
        })
        .catch(function(error){
            console.log(error);
        })

} 

function deleteSQL(id){
    let arrayDatos;
    if(id){
        arrayDatos = [id]
    }
    else{
        return false;
    }

    let deleteSQL = "DELETE FROM usuario WHERE id = ?";
    return conexion.getConnection()
        .then(function(con){
            return con.query(deleteSQL, arrayDatos)
                .then(function(resultados){
                    return resultados;
                })
        })
        .catch(function(error){
            console.log(error);
        })
}

module.exports.insertSQL = insertSQL;
module.exports.updateSQL = updateSQL;
module.exports.deleteSQL = deleteSQL;
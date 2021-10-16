const mariadb = require('mariadb');
require('dotenv').config();

const config = {
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
}

var conexion;

try{
    conexion = mariadb.createPool(config);
    console.log("Conectado correctamente....")
}
catch(error){
    console.log(error);
}

module.exports = conexion;
window.addEventListener("DOMContentLoaded", function(evento){
    iniciarEventos();
})

function iniciarEventos(){
    document.getElementById("btnGuardar").addEventListener("click", registrarUsuario);
    document.getElementById("btnRegresar").addEventListener("click", regresar);
}

function registrarUsuario(evento){
    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;

    if(usuario && contrasena){
        const datos = {
            "usuario" : usuario,
            "contrasena" : contrasena
        }

        const options = {
            method : "POST",
            headers : {
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify(datos)
        }

        fetch("http://localhost:3200/auth/registrar", options)
            .then(function(respuesta){
                if(respuesta.ok){
                    alert("Registrado Correctamente...");
                    window.location.href = "login.html";
                }
            })
            .catch(function(error){
                console.log(error);
            })
    }
}

function regresar(evento){
    window.location.href = "login.html";
}
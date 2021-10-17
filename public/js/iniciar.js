window.addEventListener("DOMContentLoaded", function(evento){
    iniciarEventos();
});

function iniciarEventos(){
    document.getElementById("btnLogin").addEventListener("click", iniciar);
    document.getElementById("btnRegistrar").addEventListener("click", registrar);
}

function iniciar(evento){
    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;

    if(usuario && contrasena){
        const datos = {
            "usuario" : usuario,
            "contrasena" : contrasena
        }

        const options = {
            method : "POST",
            mode: 'cors',
            headers : {
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify(datos)
        }

        fetch("http://localhost:3200/auth/iniciar",options)
            .then(function(respuesta){
                if(respuesta.ok){
                    respuesta.json()
                        .then(function(token){
                            if(token.token){
                                const auth = {
                                    token : token.token
                                }
                                localStorage.setItem("auth", JSON.stringify(auth));
                                window.location.href = "/";
                            }
                            else{
                                alert("Usuario o contraseña incorrectos...")
                            }
                        })
                }
            })
            .catch(function(error){
                console.log(error)
            })
    }
}

function registrar(evento){
    window.location.href = "registrar.html";
}

window.addEventListener("DOMContentLoaded", function(evento){
    iniciarEventos();
    cargar();
});

function iniciarEventos(){
    document.getElementById("btnGuardar").addEventListener("click", guardar);
    document.getElementById("btnLogout").addEventListener("click", cerrarSesion)
}

function cerrarSesion(evento){
    localStorage.clear();
    window.location.href = "login.html";
}

function cargar(){

    let token = JSON.parse(localStorage.getItem('auth')).token;

    const options = {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    }

    fetch("http://localhost:3200/usuarios/listar", options)
        .then(function(respuesta){
            if(respuesta.ok){
                respuesta.json()
                    .then(function(datos){
                        // AQUI MANIPULOS LOS DATOS.
                        datos.usuarios.forEach(function(usuario){
                            adicionarFila(usuario);
                        })
                    })
            }
        })
        .catch(function(error){
            console.log(error)
        })
}

function guardar(evento){
    let accion = document.getElementById("accion").value

    let datosUsuario = {
        "nombres" : document.getElementById("nombres").value,
        "apellidos" : document.getElementById("apellidos").value,
        "edad" : document.getElementById("edad").value,
        "email" : document.getElementById("email").value
    }

    if(accion === "crear"){

        const options = {
            method : "POST",
            headers : {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        }

        fetch("http://localhost:3200/usuarios/crear", options)
            .then(function(respuesta){
                if(respuesta.ok){
                    respuesta.json()
                        .then(function(json){
                            datosUsuario.id = json.insertId;
                            adicionarFila(datosUsuario);
                        });
                }
                else{
                    alert("Error al crear usuario");
                }
            })
            .catch(function(error){
                console.log(error)
            });
    }
    else{
        let id = document.getElementById("id").value;

        const options = {
            method : "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body : JSON.stringify(datosUsuario)
        }

        fetch("http://localhost:3200/usuarios/actualizar/"+id, options)
            .then(function(respuesta){
                if(respuesta.ok){
                    respuesta.json()
                        .then(function(datos){
                            console.log(datos);
                        })
                }
            })
    }
}

function adicionarFila(datos){
    let tabla = document.getElementById("datosTabla");

    let row = tabla.rows.length;

    let html = "";
    html += "<tr data-id='"+ datos.id+"'>";
    html += "   <td>" + datos.id + "</td>";
    html += "   <td>" + datos.nombres + "</td>";
    html += "   <td>" + datos.apellidos + "</td>";
    html += "   <td>" + datos.edad + "</td>";
    html += "   <td>" + datos.email + "</td>";
    html += "   <td>";
    html += "       <button type='button' class='btnEditar'>Editar</button>"
    html += "       <button type='button' class='btnEliminar'>Eliminar</button>";
    html += "   </td>"
    html += "</tr>";

    tabla.tBodies[0].innerHTML += html;

    // CAPTURO LOS BOTONES DE ELIMINAR USANDO LA CLASE.
    let botoneEliminar = document.getElementsByClassName("btnEliminar");
    for(let i=0; i<botoneEliminar.length; i++){
        // SE RECORRE UNO A UNO LOS BOTONES DE ELIMINAR Y SE LE AGREGA EL EVENTO "CLICK"
        botoneEliminar[i].addEventListener("click", eliminarFila);
    }

    // SE CAPUTRAN LOS BOTONES EDITAR USANDO LA CLASE
    let botoneEditar = document.getElementsByClassName("btnEditar");
    for(let i=0; i<botoneEditar.length; i++){
        botoneEditar[i].addEventListener("click",editarFila);
    }
}

function eliminarFila(evento){
    let fila =  evento.target.closest("tr");
    let id = fila.getAttribute("data-id");

    const options = {
        method: "DELETE"
    }

    fetch("http://localhost:3200/usuarios/eliminar?id="+id, options)
        .then(function(respuesta){
            if(respuesta.ok){
                respuesta.json()
                    .then(function(datos){
                        if(datos){
                            fila.remove();
                        }
                    })
            }
        })

}

function editarFila(evento){
    let fila = evento.target.closest("tr");
    let id = fila.getAttribute("data-id");

    const options = {
        method: "GET"
    }

    fetch("http://localhost:3200/usuarios/listar/"+id, options)
        .then(function(respuesta){
            if(respuesta.ok){
                respuesta.json()
                    .then(function(datos){
                        let usuario = datos[0];
                        document.getElementById("nombres").value = usuario.nombres;
                        document.getElementById("apellidos").value = usuario.apellidos;
                        document.getElementById("edad").value = usuario.edad;
                        document.getElementById("email").value = usuario.email;
                        document.getElementById("id").value = usuario.id;
                        document.getElementById("accion").value = "editar";
                    })
            }
        })
}

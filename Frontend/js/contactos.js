const jwt = sessionStorage.getItem("usertoken");
let plantilla;
let modalConfirmaEliminar = document.getElementById("modal-edit");
let plantilla_modal;

listarContactos();

function listarContactos() {
    fetch('http://127.0.0.1:3030/v1/contactos/', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt}
    }).then(res => {
        res.json().then(data => {
            data.forEach((fila) => {
                plantilla = `<tr>
                                <td class="align-middle"><input type="checkbox" name="" id=""></td>
                                <td><img src="../assets/contact.png"
                                        alt="..." class="img-table"> ${fila.Nombre}</td>
                                <td>${fila.Pais}/ ${fila.Ciudad}</td>
                                <td>${fila.Compania}</td>
                                <td>${fila.Cargo}</td>
                                <td>
                                    <div class="progress">
                                        <div class="progress-bar bg-success" role="progressbar" style="width:${fila.Interes}%"
                                            aria-valuenow="${fila.Interes}" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div>
                                        <i class="fas fa-trash-alt"></i>
                                        <i class="fas fa-pencil-alt"></i>
                                    </div>
                                </td>
                            </tr>`;
                rows.insertAdjacentHTML('beforeend', plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function GuardarContacto(){
    let nombre = document.getElementById(`nombreContacto`).value;
    let apellidoContacto = document.getElementById(`apellidoContacto`).value;
    let nombre_completo = nombre + apellidoContacto;
    let cargoContacto = document.getElementById(`cargoContacto`).value;
    let emailContacto = document.getElementById(`emailContacto`).value;
    let companiaContacto = document.getElementById(`companiaContacto`).value;
    let direccion = document.getElementById(`direccion`).value;
    let interes = document.getElementById(`myRange`).value;
    let porcentaje = document.getElementById(`porcentaje`).value;
    fetch('http://127.0.0.1:3030/v1/contactos/nuevo-contacto', {
        method: 'PUT',
        body:`{"nombre_completo":"${nombre_completo}","cargo":"${cargoContacto}","email":"${emailContacto}",
                "compania":"${companiaContacto}","direccion":"${direccion}","interes":"${interes}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
            console.log(data);
        });
        location.reload();
    }).catch(error => {
        console.log(error);
    });
}

function listarCompanias() {
    
    let selCompania = document.getElementById(`companiaContacto`);

    fetch('http://127.0.0.1:3030/v1/companias', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach(compania =>{
                plantilla = `<option value="${compania.id_compania}">${compania.Nombre}</option>`;
                selCompania.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

let selectRegion = document.getElementById("region");
let selectPais = document.getElementById("pais");
let selectCiudad = document.getElementById("ciudad");

function cargarRegiones() {
    fetch('http://127.0.0.1:3030/v1/localizacion/regiones', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach(region =>{
                plantilla = `<option value="${region.id}">${region.nombre}</option>`;
                selectRegion.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function cargarPaises() {
    fetch(`http://127.0.0.1:3030/v1/localizacion/pais-region/${selectRegion.value}`, {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach(pais =>{
                plantilla = `<option value="${pais.id}">${pais.nombre}</option>`;
                selectPais.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function cargarCiudades() {
    fetch(`http://127.0.0.1:3030/v1/localizacion/ciudad-pais/${selectPais.value}`, {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach(ciudad =>{
                plantilla = `<option value="${ciudad.id}">${ciudad.nombre}</option>`;
                selectCiudad.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}




function editarUser(id_usuario){
    document.getElementById(`labelEdit-user${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`labelEdit-nombre${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`labelEdit-email${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`labelEdit-perfil${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-user${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`inputEdit-nombre${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`inputEdit-email${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`selectEdit-perfil${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`edit-user${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`save-user${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`del-user${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`cancelEdit-user${id_usuario}`).classList.remove("nonvisible");
}

function guardarCambiosUser(id_usuario){
    let usernameActualizado = document.querySelector(`#inputEdit-user${id_usuario}>input`).value;
    let nombreActualizado = document.querySelector(`#inputEdit-nombre${id_usuario}>input`).value;
    let emailActualizado = document.querySelector(`#inputEdit-email${id_usuario}>input`).value;
    let perfilActualizado = document.querySelector(`#selectEdit-perfil${id_usuario}>select`).value;
    fetch('http://127.0.0.1:3030/v1/usuarios/user', {
        method: 'PUT',
        body:`{"id":"${id_usuario}","username":"${usernameActualizado}","nombre_completo":"${nombreActualizado}",
                "nombre_completo":"${nombreActualizado}","email":"${emailActualizado}","id_perfil":"${perfilActualizado}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
        console.log(data);
        });
        document.getElementById(`labelEdit-user${id_usuario}`).classList.remove("nonvisible");
        document.getElementById(`labelEdit-nombre${id_usuario}`).classList.remove("nonvisible");
        document.getElementById(`labelEdit-email${id_usuario}`).classList.remove("nonvisible");
        document.getElementById(`labelEdit-perfil${id_usuario}`).classList.remove("nonvisible");
        document.getElementById(`inputEdit-user${id_usuario}`).classList.add("nonvisible");
        document.getElementById(`inputEdit-nombre${id_usuario}`).classList.add("nonvisible");
        document.getElementById(`inputEdit-email${id_usuario}`).classList.add("nonvisible");
        document.getElementById(`selectEdit-perfil${id_usuario}`).classList.add("nonvisible");
        document.getElementById(`edit-user${id_usuario}`).classList.remove("nonvisible");
        document.getElementById(`save-user${id_usuario}`).classList.add("nonvisible");
        document.getElementById(`del-user${id_usuario}`).classList.remove("nonvisible");
        document.getElementById(`cancelEdit-user${id_usuario}`).classList.add("nonvisible");
        location.reload();
    }).catch(error => {
        console.log(error);
    });
}

function cancelarEditUser(id_usuario){
    document.getElementById(`labelEdit-user${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`labelEdit-nombre${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`labelEdit-email${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`labelEdit-perfil${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`inputEdit-user${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-nombre${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-email${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`selectEdit-perfil${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`edit-user${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`save-user${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`del-user${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`cancelEdit-user${id_usuario}`).classList.add("nonvisible");
}

function eliminarUser(id_usuario){
    plantilla_modal = `<p id="modal eliminar">¿Está seguro que desea eliminar el usuario?</p>
                    <button id="btnAceptarEliminar" class="btn btn-success" onclick="eliminarElemento('${id_usuario}')">ACEPTAR</button>
                    <button id="btnCancelarEliminar" class="btn btn-danger" data-dismiss="modal">CANCELAR</button>`;
    modalConfirmaEliminar.innerHTML = plantilla_modal;
}

function eliminarElemento(id_usuario){
    fetch(`http://127.0.0.1:3030/v1/usuarios/user/${id_usuario}/confirm-delete`, {
        method: 'DELETE',
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
            console.log(data);
        });
        location.reload();
    }).catch(error => {
        console.log(error);
    });
}

const jwt = sessionStorage.getItem("usertoken");
let plantilla;
let modalConfirmaEliminar = document.getElementById("modalEliminarContacto");
let plantilla_modal;
let id_contactoCreado;

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
                                        <div class="progress-bar bg-warning" role="progressbar" style="width:${fila.Interes}%"
                                            aria-valuenow="${fila.Interes}" aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                    <label>${fila.Interes}%</label>
                                </td>
                                <td class="text-center">
                                    <div>
                                        <a id="elim-${fila.id}" class="btn btn-danger" data-toggle="modal" data-target="#eliminarContactoIndividual" onclick="modificarModal(${fila.id})"><i class="fas fa-trash-alt"></i></a>
                                        <a id="edit-${fila.id}" class="btn btn-primary" onclick="editarContacto(${fila.id})"><i class="fas fa-pencil-alt"></i></a>
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

function modificarModal(id_contacto) {
    plantilla_modal = `<div class="modal-body">
                        <div class="mb-3 text-center">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcREziGsRatBq43p8iJyM4Ezqa71SAZg33UhuA&usqp=CAU"
                                class="avatar-pic" alt="">
                            <p class="mt-5">¿Seguro desea eliminar el contacto seleccionado?</p>
                        </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-danger d-block" onclick="eliminarContacto(${id_contacto})">Eliminar</button>
                        </div>`;
    modalConfirmaEliminar.innerHTML = plantilla_modal;
}

function eliminarContacto(id_contacto){
    fetch(`http://127.0.0.1:3030/v1/contactos/contacto/${id_contacto}/confirm-delete`, {
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

function crearContacto(){
    let nombre = document.getElementById(`nombreContacto`).value;
    let apellidoContacto = document.getElementById(`apellidoContacto`).value;
    let nombre_completo = nombre + " "+ apellidoContacto;
    let cargoContacto = document.getElementById(`cargoContacto`).value;
    let emailContacto = document.getElementById(`emailContacto`).value;
    let companiaContacto = document.getElementById(`companiaContacto`).value;
    let ciudadContacto = document.getElementById(`ciudad`).value;
    let direccion = document.getElementById(`direccion`).value;
    let interes = document.getElementById(`interes`).value;
    fetch('http://127.0.0.1:3030/v1/contactos/nuevo-contacto', {
        method: 'POST',
        body:`{"nombre_completo":"${nombre_completo}","cargo":"${cargoContacto}","email":"${emailContacto}",
                "id_compania":"${companiaContacto}","id_ciudad":"${ciudadContacto}","direccion":"${direccion}","interes":"${interes}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
            id_contactoCreado = data;
            document.getElementById('btnGuardarContacto').setAttribute("disabled",true);
            document.querySelectorAll("[id^='canal-']").forEach(btn => {
                btn.removeAttribute("disabled");
            })
        });
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

function guardarCanal(id_canal) {
    let nombreCuentaUsuario = document.querySelectorAll(`#cuenta`);
    let preferencia = document.querySelectorAll(`#preferencias`);
    fetch('http://127.0.0.1:3030/v1/contactos/canal-contacto', {
        method: 'POST',
        body:`{"id_canal":"${id_canal}","id_contacto":"${id_contactoCreado}","cuenta_usuario":"${nombreCuentaUsuario[0].value}",
                "preferencia":"${preferencia[0].value}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
            console.log(data);
        });
    }).catch(error => {
        console.log(error);
    });
}

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
                                        <a id="edit-${fila.id}" class="btn btn-primary" data-toggle="modal" data-target="#agregarContacto" onclick="editarContacto(${fila.id})"><i class="fas fa-pencil-alt"></i></a>
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
    let cargoContacto = document.getElementById(`cargoContacto`).value;
    let emailContacto = document.getElementById(`emailContacto`).value;
    let companiaContacto = document.getElementById(`companiaContacto`).value;
    let ciudadContacto = document.getElementById(`ciudad`).value;
    let direccion = document.getElementById(`direccion`).value;
    let interes = document.getElementById(`interes`).value;
    fetch('http://127.0.0.1:3030/v1/contactos/nuevo-contacto', {
        method: 'POST',
        body:`{"nombre_completo":"${nombre}","cargo":"${cargoContacto}","email":"${emailContacto}",
                "id_compania":"${companiaContacto}","id_ciudad":"${ciudadContacto}","direccion":"${direccion}","interes":"${interes}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
            id_contactoCreado = data;
            //document.getElementById('btnGuardarContacto').setAttribute("disabled",true);
            alert("los datos de contacto se actualizaron exitosamente");
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
let optionSelectPais = document.getElementById(`selectPaisDefault`);
let optionSelectCiudad = document.getElementById(`selectCiudadDefault`);

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
            selectPais.innerHTML=`<select name="pais" id="pais" class="form-control">
                                        <option id="selectCiudadDefault" value="0" disabled selected>Seleccione un país
                                        </option>
                                    </select>`;
            selectCiudad.innerHTML=`<select name="ciudad" id="ciudad" class="form-control">
                                        <option id="selectCiudadDefault" value="0" disabled selected>Seleccione una ciudad
                                        </option>
                                    </select>`;
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
            selectCiudad.innerHTML=`<select name="ciudad" id="ciudad" class="form-control">
                                        <option id="selectCiudadDefault" value="0" disabled selected>Seleccione una ciudad
                                        </option>
                                    </select>`;
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

function editarContacto(id_contacto){
    document.getElementById('divCanales').classList.add("nonvisible");
    document.getElementById('modal-footer').classList.add("nonvisible");
    document.getElementById('tituloModalContacto').innerHTML = "Editar Contacto";
    document.getElementById('guardarCrearContacto').classList.add("nonvisible");
    document.getElementById('guardarEdicion').classList.remove("nonvisible");
    document.getElementById('guardarEdicion').setAttribute("onclick",`actualizarContacto(${id_contacto})`);
    let nombre = document.getElementById(`nombreContacto`);
    let cargoContacto = document.getElementById(`cargoContacto`);
    let emailContacto = document.getElementById(`emailContacto`);
    let companiaContacto = document.getElementById(`companiaContacto`);
    selectRegion = document.getElementById(`region`);
    let direccion = document.getElementById(`direccion`);
    let interes = document.getElementById(`interes`);

    listarCompanias();
    cargarRegiones();

    fetch(`http://127.0.0.1:3030/v1/contactos/contacto/${id_contacto}`, {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt}
    }).then(res => {
        res.json().then(data => {
            nombre.value = data[0].Nombre;
            cargoContacto.value = data[0].Cargo;
            emailContacto.value = data[0].Email;
            companiaContacto.value = data[0].id_compania;
            selectRegion.value = data[0].id_region;
            optionSelectPais.innerHTML = data[0].Pais;
            optionSelectPais.value = data[0].id_pais; 
            optionSelectCiudad.innerHTML = data[0].Ciudad;
            optionSelectCiudad.value = data[0].id_ciudad;      
            direccion.value = data[0].Direccion;
            interes.value = data[0].Interes;          
        });
    }).catch(error => {
        console.log(error);
    });
}

function actualizarContacto(id_contacto){
    let nombre = document.getElementById(`nombreContacto`).value;
    let cargoContacto = document.getElementById(`cargoContacto`).value;
    let emailContacto = document.getElementById(`emailContacto`).value;
    let companiaContacto = document.getElementById(`companiaContacto`).value;
    let ciudadContacto = document.getElementById(`ciudad`).value;
    let direccion = document.getElementById(`direccion`).value;
    let interes = document.getElementById(`interes`).value;
    fetch(`http://127.0.0.1:3030/v1/contactos/contacto/`, {
        method: 'PUT',
        body:`{"id":"${id_contacto}","nombre_completo":"${nombre}","cargo":"${cargoContacto}","email":"${emailContacto}",
                "id_compania":"${companiaContacto}","id_ciudad":"${ciudadContacto}","direccion":"${direccion}","interes":"${interes}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
            id_contactoCreado = data;
            //document.getElementById('btnGuardarContacto').setAttribute("disabled",true);
            alert("los datos de contacto se actualizaron exitosamente");
            location.reload();
        });
    }).catch(error => {
        console.log(error);
    });
}

function buscarContacto() {
    let terminoBusqueda = document.getElementById("busquedaContacto").value;
    fetch(`http://127.0.0.1:3030/v1/contactos/busqueda/${terminoBusqueda}`, {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt}
    }).then(res => {
        res.json().then(data => {
            rows.innerHTML="";
            if (res.status === 200) {
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
                                            <a id="edit-${fila.id}" class="btn btn-primary" data-toggle="modal" data-target="#agregarContacto" onclick="editarContacto(${fila.id})"><i class="fas fa-pencil-alt"></i></a>
                                        </div>
                                    </td>
                                </tr>`;
                    rows.insertAdjacentHTML('beforeend', plantilla);
                });
            }
            
        });
    }).catch(error => {
        console.log(error);
    });
}

function cerrarSesion() {
    sessionStorage.clear();
}
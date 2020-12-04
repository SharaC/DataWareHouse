const jwt = sessionStorage.getItem("usertoken");
let plantilla;
let btnAgregarRegion = document.getElementById('btnAgregarRegion');
let divNuevaRegion = document.getElementById('div-nuevaRegion');
let divNuevoPais = document.getElementById('divNuevoPais');
let btnAgregarPais = document.getElementById('btnAgregarPais');
let selRegionPais = document.getElementById("selRegionPais");
let btnAgregarCiudad = document.getElementById('btnAgregarCiudad');
let selRegionCiudad = document.getElementById("selRegionCiudad");
let selPaisCiudad = document.getElementById("selPaisCiudad");
let modalConfirmaEliminar = document.getElementById("modal-edit");
let plantilla_modal;


mostrarArbolRegiones();

function mostrarArbolRegiones() {
    let nombreRegion = "";
    let nombrePais = "";
            fetch('http://127.0.0.1:3030/v1/localizacion/todo-ciudades', {
                method: 'GET',
                headers: { "Authorization": "Bearer " + jwt }
            }).then(res => {
                res.json().then(data => {
                    data.forEach((fila) => {
                        if (fila.Nombre_region == nombreRegion && fila.Nombre_pais == nombrePais){
                            plantilla = `<tr>
                                            <td class="border-left border-top-0"></td>
                                            <td class="border-top-0"></td>
                                            <td class="border-right border-top-0"></td>
                                            <td class="border-top-0"></td>
                                            <td class="border-top-0"></td>
                                            <td class="border-right border-top-0"></td>
                                            <td id="labelEdit-ciudad${fila.id_ciudad}">${fila.Nombre_ciudad}</td>
                                            <td id="inputEdit-ciudad${fila.id_ciudad}" class="nonvisible"><input class="form-control" type="text" placeholder="${fila.Nombre_ciudad}"></td>
                                            <td id="edit-ciudad${fila.id_ciudad}"><button onclick="editarCiudad(${fila.id_ciudad})" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i></button></td>
                                            <td id="save-ciudad${fila.id_ciudad}" class="nonvisible"><button onclick="guardarCambiosCiudad(${fila.id_ciudad})" class="btn btn-success btn-sm"><i class="fas fa-save"></i></button></td>
                                            <td id="del-ciudad${fila.id_ciudad}" class="border-right"><button id="del-ciudad${fila.Nombre_ciudad}" data-toggle="modal" data-target="#modalEliminar" onclick="eliminarCiudad(${fila.id_ciudad})" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
                                            <td id="cancelEdit-ciudad${fila.id_ciudad}" class="border-right nonvisible"><button id="cancel-ciudad${fila.Nombre_ciudad}" onclick="cancelarEditCiudad(${fila.id_ciudad})" class="btn btn-danger btn-sm"><i class="fas fa-times"></i></button></td>
                                        </tr>`;
                        }else if (fila.Nombre_region == nombreRegion && fila.Nombre_pais != nombrePais){
                            plantilla = `<tr>
                                            <td class="border-left border-top-0"></td>
                                            <td class="border-top-0"></td>
                                            <td class="border-right border-top-0"></td>
                                            <td id="labelEdit-pais${fila.id_pais}">${fila.Nombre_pais}</td>
                                            <td id="inputEdit-pais${fila.id_pais}" class="nonvisible"><input class="form-control" type="text" placeholder="${fila.Nombre_pais}"></td>
                                            <td id="edit-pais${fila.id_pais}"><button onclick="editarPais(${fila.id_pais})" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i></button></td>
                                            <td id="save-pais${fila.id_pais}" class="nonvisible"><button onclick="guardarCambiosPais(${fila.id_pais})" class="btn btn-success btn-sm"><i class="fas fa-save"></i></button></td>
                                            <td id="del-pais${fila.id_pais}" class="border-right"><button id="del-pais${fila.Nombre_pais}" data-toggle="modal" data-target="#modalEliminar" onclick="eliminarPais(${fila.id_pais})" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
                                            <td id="cancelEdit-pais${fila.id_pais}" class="border-right nonvisible"><button id="cancel-pais${fila.Nombre_pais}" onclick="cancelarEditPais(${fila.id_pais})" class="btn btn-danger btn-sm"><i class="fas fa-times"></i></button></td>
                                            
                                            <td id="labelEdit-ciudad${fila.id_ciudad}">${fila.Nombre_ciudad}</td>
                                            <td id="inputEdit-ciudad${fila.id_ciudad}" class="nonvisible"><input class="form-control" type="text" placeholder="${fila.Nombre_ciudad}"></td>
                                            <td id="edit-ciudad${fila.id_ciudad}"><button onclick="editarCiudad(${fila.id_ciudad})" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i></button></td>
                                            <td id="save-ciudad${fila.id_ciudad}" class="nonvisible"><button onclick="guardarCambiosCiudad(${fila.id_ciudad})" class="btn btn-success btn-sm"><i class="fas fa-save"></i></button></td>
                                            <td id="del-ciudad${fila.id_ciudad}" class="border-right"><button id="del-ciudad${fila.Nombre_ciudad}" data-toggle="modal" data-target="#modalEliminar" onclick="eliminarCiudad(${fila.id_ciudad})" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
                                            <td id="cancelEdit-ciudad${fila.id_ciudad}" class="border-right nonvisible"><button id="cancel-ciudad${fila.Nombre_ciudad}" onclick="cancelarEditCiudad(${fila.id_ciudad})" class="btn btn-danger btn-sm"><i class="fas fa-times"></i></button></td>
                                        </tr>`;
                            nombrePais = fila.Nombre_pais;
                        }else{
                            plantilla = `<tr>
                                            <td id="labelEdit-region${fila.id_region}" class="border-left">${fila.Nombre_region}</td>
                                            <td id="inputEdit-region${fila.id_region}" class="nonvisible"><input class="form-control" type="text" placeholder="${fila.Nombre_region}"></td>
                                            <td id="edit-region${fila.id_region}"><button onclick="editarRegion(${fila.id_region})" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i></button></td>
                                            <td id="save-region${fila.id_region}" class="nonvisible"><button onclick="guardarCambiosRegion(${fila.id_region})" class="btn btn-success btn-sm"><i class="fas fa-save"></i></button></td>
                                            <td id="del-region${fila.id_region}" class="border-right"><button id="del-region${fila.Nombre_region}" data-toggle="modal" data-target="#modalEliminar" onclick="eliminarRegion(${fila.id_region})" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
                                            <td id="cancelEdit-region${fila.id_region}" class="border-right nonvisible"><button id="cancel-region${fila.Nombre_region}" onclick="cancelarEditRegion(${fila.id_region})" class="btn btn-danger btn-sm"><i class="fas fa-times"></i></button></td>

                                            <td id="labelEdit-pais${fila.id_pais}">${fila.Nombre_pais}</td>
                                            <td id="inputEdit-pais${fila.id_pais}" class="nonvisible"><input class="form-control" type="text" placeholder="${fila.Nombre_pais}"></td>
                                            <td id="edit-pais${fila.id_pais}"><button onclick="editarPais(${fila.id_pais})" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i></button></td>
                                            <td id="save-pais${fila.id_pais}" class="nonvisible"><button onclick="guardarCambiosPais(${fila.id_pais})" class="btn btn-success btn-sm"><i class="fas fa-save"></i></button></td>
                                            <td id="del-pais${fila.id_pais}" class="border-right"><button id="del-pais${fila.Nombre_pais}" data-toggle="modal" data-target="#modalEliminar" onclick="eliminarPais(${fila.id_pais})" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
                                            <td id="cancelEdit-pais${fila.id_pais}" class="border-right nonvisible"><button id="cancel-pais${fila.Nombre_pais}" onclick="cancelarEditPais(${fila.id_pais})" class="btn btn-danger btn-sm"><i class="fas fa-times"></i></button></td>
                                            
                                            <td id="labelEdit-ciudad${fila.id_ciudad}">${fila.Nombre_ciudad}</td>
                                            <td id="inputEdit-ciudad${fila.id_ciudad}" class="nonvisible"><input class="form-control" type="text" placeholder="${fila.Nombre_ciudad}"></td>
                                            <td id="edit-ciudad${fila.id_ciudad}"><button onclick="editarCiudad(${fila.id_ciudad})" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i></button></td>
                                            <td id="save-ciudad${fila.id_ciudad}" class="nonvisible"><button onclick="guardarCambiosCiudad(${fila.id_ciudad})" class="btn btn-success btn-sm"><i class="fas fa-save"></i></button></td>
                                            <td id="del-ciudad${fila.id_ciudad}" class="border-right"><button id="del-ciudad${fila.Nombre_ciudad}" data-toggle="modal" data-target="#modalEliminar" onclick="eliminarCiudad(${fila.id_ciudad})" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
                                            <td id="cancelEdit-ciudad${fila.id_ciudad}" class="border-right nonvisible"><button id="cancel-ciudad${fila.Nombre_ciudad}" onclick="cancelarEditCiudad(${fila.id_ciudad})" class="btn btn-danger btn-sm"><i class="fas fa-times"></i></button></td>
                                        </tr>`;
                            nombreRegion = fila.Nombre_region;
                            nombrePais = fila.Nombre_pais;
                        }
                        
                        rows.insertAdjacentHTML('beforeend', plantilla);
                        let botonesVacios = document.querySelectorAll('#edit-ciudad,#edit-region,#edit-pais,#del-ciudad,#del-region,#del-pais');
                        botonesVacios.forEach(botonVacio => {
                            botonVacio.innerHTML=""
                        });
                    });
                });
            }).catch(error => {
                console.log(error);
            });
}

function agregarRegion() {
    divNuevaRegion.classList.remove("nonvisible");
    btnAgregarRegion.classList.add("nonvisible");
}

function guardarRegion(){
    let nombreRegion = document.getElementById("nombreRegion");
    fetch('http://127.0.0.1:3030/v1/localizacion/nueva-region', {
        method: 'POST',
        body:`{"nombre":"${nombreRegion.value}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
        console.log(data);
        nombreRegion.value = "";
        });
    }).catch(error => {
        console.log(error);
    });
}

function cancelarRegion(){
    divNuevaRegion.classList.add("nonvisible");
    btnAgregarRegion.classList.remove("nonvisible");
}

function editarRegion(id_region){
    document.getElementById(`labelEdit-region${id_region}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-region${id_region}`).classList.remove("nonvisible");
    document.getElementById(`edit-region${id_region}`).classList.add("nonvisible");
    document.getElementById(`save-region${id_region}`).classList.remove("nonvisible");
    document.getElementById(`del-region${id_region}`).classList.add("nonvisible");
    document.getElementById(`cancelEdit-region${id_region}`).classList.remove("nonvisible");
}

function guardarCambiosRegion(id_region){
    let nombreActualizado = document.querySelector(`#inputEdit-region${id_region}>input`).value;
    fetch('http://127.0.0.1:3030/v1/localizacion/region', {
        method: 'PUT',
        body:`{"id":"${id_region}","nombre":"${nombreActualizado}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
        console.log(data);
        });
        document.getElementById(`labelEdit-region${id_region}`).classList.remove("nonvisible");
        document.getElementById(`inputEdit-region${id_region}`).classList.add("nonvisible");
        document.getElementById(`edit-region${id_region}`).classList.remove("nonvisible");
        document.getElementById(`save-region${id_region}`).classList.add("nonvisible");
        document.getElementById(`del-region${id_region}`).classList.remove("nonvisible");
        document.getElementById(`cancelEdit-region${id_region}`).classList.add("nonvisible");
        location.reload();
    }).catch(error => {
        console.log(error);
    });
}

function cancelarEditRegion(id_region){
        document.getElementById(`labelEdit-region${id_region}`).classList.remove("nonvisible");
        document.getElementById(`inputEdit-region${id_region}`).classList.add("nonvisible");
        document.getElementById(`edit-region${id_region}`).classList.remove("nonvisible");
        document.getElementById(`save-region${id_region}`).classList.add("nonvisible");
        document.getElementById(`del-region${id_region}`).classList.remove("nonvisible");
        document.getElementById(`cancelEdit-region${id_region}`).classList.add("nonvisible");
}

function agregarPais() {
    divNuevoPais.classList.remove("nonvisible");
    btnAgregarPais.classList.add("nonvisible");
    fetch('http://127.0.0.1:3030/v1/localizacion/regiones', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            selRegionPais.innerHTML='<option value="0" disabled selected>Seleccione la región</option>';
            data.forEach(region =>{
                plantilla = `<option value="${region.id}">${region.nombre}</option>`;
                selRegionPais.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function guardarPais(){
    let nombrePais = document.getElementById("nombrePais");
    let selRegionPais = document.getElementById("selRegionPais");
    fetch('http://127.0.0.1:3030/v1/localizacion/nuevo-pais', {
        method: 'POST',
        body:`{"nombre":"${nombrePais.value}","id_region":"${selRegionPais.value}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
        console.log(data);
        nombrePais.value = "";
        selRegionPais.value = "0";
        });
    }).catch(error => {
        console.log(error);
    });
}

function cancelarPais(){
    divNuevoPais.classList.add("nonvisible");
    btnAgregarPais.classList.remove("nonvisible");
}

function editarPais(id_pais){
    document.getElementById(`labelEdit-pais${id_pais}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-pais${id_pais}`).classList.remove("nonvisible");
    document.getElementById(`edit-pais${id_pais}`).classList.add("nonvisible");
    document.getElementById(`save-pais${id_pais}`).classList.remove("nonvisible");
    document.getElementById(`del-pais${id_pais}`).classList.add("nonvisible");
    document.getElementById(`cancelEdit-pais${id_pais}`).classList.remove("nonvisible");
}

function guardarCambiosPais(id_pais){
    let nombreActualizado = document.querySelector(`#inputEdit-pais${id_pais}>input`).value;
    fetch('http://127.0.0.1:3030/v1/localizacion/pais', {
        method: 'PUT',
        body:`{"id":"${id_pais}","nombre":"${nombreActualizado}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
        console.log(data);
        });
        document.getElementById(`labelEdit-pais${id_pais}`).classList.remove("nonvisible");
        document.getElementById(`inputEdit-pais${id_pais}`).classList.add("nonvisible");
        document.getElementById(`edit-pais${id_pais}`).classList.remove("nonvisible");
        document.getElementById(`save-pais${id_pais}`).classList.add("nonvisible");
        document.getElementById(`del-pais${id_pais}`).classList.remove("nonvisible");
        document.getElementById(`cancelEdit-pais${id_pais}`).classList.add("nonvisible");
        location.reload();
    }).catch(error => {
        console.log(error);
    });
}

function cancelarEditPais(id_pais){
        document.getElementById(`labelEdit-pais${id_pais}`).classList.remove("nonvisible");
        document.getElementById(`inputEdit-pais${id_pais}`).classList.add("nonvisible");
        document.getElementById(`edit-pais${id_pais}`).classList.remove("nonvisible");
        document.getElementById(`save-pais${id_pais}`).classList.add("nonvisible");
        document.getElementById(`del-pais${id_pais}`).classList.remove("nonvisible");
        document.getElementById(`cancelEdit-pais${id_pais}`).classList.add("nonvisible");
}


function agregarCiudad() {
    divNuevaCiudad.classList.remove("nonvisible");
    btnAgregarCiudad.classList.add("nonvisible");
    fetch('http://127.0.0.1:3030/v1/localizacion/regiones', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            selRegionCiudad.innerHTML='<option value="0" disabled selected>Seleccione la región</option>';
            selPaisCiudad.innerHTML='<option value="0" disabled selected>Seleccione el país</option>';
            data.forEach(region =>{
                plantilla = `<option value="${region.id}">${region.nombre}</option>`;
                selRegionCiudad.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function listarPaises() {
    fetch(`http://127.0.0.1:3030/v1/localizacion/pais-region/${selRegionCiudad.value}`, {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            selPaisCiudad.innerHTML='<option value="0" disabled selected>Seleccione el país</option>';
            data.forEach(pais =>{
                plantilla = `<option value="${pais.id}">${pais.nombre}</option>`;
                selPaisCiudad.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function guardarCiudad(){
    let nombreCiudad = document.getElementById("nombreCiudad");
    let selPaisCiudad = document.getElementById("selPaisCiudad");
    fetch('http://127.0.0.1:3030/v1/localizacion/nueva-ciudad', {
        method: 'POST',
        body:`{"nombre":"${nombreCiudad.value}","id_paises":"${selPaisCiudad.value}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
            console.log(data);
            nombreCiudad.value = "";
            selRegionCiudad.value = "0";
            selPaisCiudad.value = "0";
        });
    }).catch(error => {
        console.log(error);
    });
}

function cancelarCiudad(){
    divNuevaCiudad.classList.add("nonvisible");
    btnAgregarCiudad.classList.remove("nonvisible");
}

function editarCiudad(id_ciudad){
    document.getElementById(`labelEdit-ciudad${id_ciudad}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-ciudad${id_ciudad}`).classList.remove("nonvisible");
    document.getElementById(`edit-ciudad${id_ciudad}`).classList.add("nonvisible");
    document.getElementById(`save-ciudad${id_ciudad}`).classList.remove("nonvisible");
    document.getElementById(`del-ciudad${id_ciudad}`).classList.add("nonvisible");
    document.getElementById(`cancelEdit-ciudad${id_ciudad}`).classList.remove("nonvisible");
}

function guardarCambiosCiudad(id_ciudad){
    let nombreActualizado = document.querySelector(`#inputEdit-ciudad${id_ciudad}>input`).value;
    fetch('http://127.0.0.1:3030/v1/localizacion/ciudad', {
        method: 'PUT',
        body:`{"id":"${id_ciudad}","nombre":"${nombreActualizado}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
            console.log(data);
        });
        document.getElementById(`labelEdit-ciudad${id_ciudad}`).classList.remove("nonvisible");
        document.getElementById(`inputEdit-ciudad${id_ciudad}`).classList.add("nonvisible");
        document.getElementById(`edit-ciudad${id_ciudad}`).classList.remove("nonvisible");
        document.getElementById(`save-ciudad${id_ciudad}`).classList.add("nonvisible");
        document.getElementById(`del-ciudad${id_ciudad}`).classList.remove("nonvisible");
        document.getElementById(`cancelEdit-ciudad${id_ciudad}`).classList.add("nonvisible");
        location.reload();
    }).catch(error => {
        console.log(error);
    });
}

function cancelarEditCiudad(id_ciudad){
        document.getElementById(`labelEdit-ciudad${id_ciudad}`).classList.remove("nonvisible");
        document.getElementById(`inputEdit-ciudad${id_ciudad}`).classList.add("nonvisible");
        document.getElementById(`edit-ciudad${id_ciudad}`).classList.remove("nonvisible");
        document.getElementById(`save-ciudad${id_ciudad}`).classList.add("nonvisible");
        document.getElementById(`del-ciudad${id_ciudad}`).classList.remove("nonvisible");
        document.getElementById(`cancelEdit-ciudad${id_ciudad}`).classList.add("nonvisible");
}

function eliminarCiudad(id_ciudad){
    let ruta_endpoint = `ciudad/${id_ciudad}/confirm-delete`;
    plantilla_modal = `<p id="modal eliminar">Tenga en cuenta que al eliminar esta ciudad se van a borrar todas las compañias y/o contactos que pertenezcan a esta ciudad. ¿Desea continuar?</p>
                    <button id="btnAceptarEliminar" class="btn btn-success" onclick="eliminarElemento('${ruta_endpoint}')">ACEPTAR</button>
                    <button id="btnCancelarEliminar" class="btn btn-danger" data-dismiss="modal">CANCELAR</button>`;
    modalConfirmaEliminar.innerHTML = plantilla_modal;
}

function eliminarRegion(id_region){
    let ruta_endpoint = `region/${id_region}/confirm-delete`;
    plantilla_modal = `<p id="modal eliminar">Tenga en cuenta que al eliminar esta región se van a borrar todos los países, ciudades, compañias y/o contactos que pertenezcan a esta region. ¿Desea continuar?</p>
                    <button id="btnAceptarEliminar" class="btn btn-success" onclick="eliminarElemento('${ruta_endpoint}')">ACEPTAR</button>
                    <button id="btnCancelarEliminar" class="btn btn-danger" data-dismiss="modal">CANCELAR</button>`;
    modalConfirmaEliminar.innerHTML = plantilla_modal;
}

function eliminarPais(id_pais){
    let ruta_endpoint = `pais/${id_pais}/confirm-delete`;
    plantilla_modal = `<p id="modal eliminar">Tenga en cuenta que al eliminar este país se van a borrar todos las ciudades, compañias y/o contactos que pertenezcan a este país. ¿Desea continuar?</p>
                    <button id="btnAceptarEliminar" class="btn btn-success" onclick="eliminarElemento('${ruta_endpoint}')">ACEPTAR</button>
                    <button id="btnCancelarEliminar" class="btn btn-danger" data-dismiss="modal">CANCELAR</button>`;
    modalConfirmaEliminar.innerHTML = plantilla_modal;
}

function eliminarElemento(ruta_eliminar){
    fetch(`http://127.0.0.1:3030/v1/localizacion/${ruta_eliminar}`, {
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

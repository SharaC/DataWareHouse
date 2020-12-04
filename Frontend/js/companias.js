const jwt = sessionStorage.getItem("usertoken");
let plantilla;
let modalConfirmaEliminar = document.getElementById("modal-edit");
let plantilla_modal;

listarCompanias();
let selectNuevaRegion = document.getElementById("regionCompania");
let selectNuevoPais = document.getElementById("paisCompania");
let selectNuevaCiudad = document.getElementById("ciudadCompania");

function cargarRegiones() {
    fetch('http://127.0.0.1:3030/v1/localizacion/regiones', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach(region =>{
                plantilla = `<option value="${region.id}">${region.nombre}</option>`;
                selectNuevaRegion.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function cargarPaises() {
    selectNuevoPais.innerHTML=`<select name="PaisCompania" class="form-control" id="paisCompania"
                            onchange="cargarCiudades()" required>
                            <option value="0" disabled selected>Seleccione un país</option>
                        </select>`;
    fetch(`http://127.0.0.1:3030/v1/localizacion/pais-region/${selectNuevaRegion.value}`, {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach(pais =>{
                plantilla = `<option value="${pais.id}">${pais.nombre}</option>`;
                selectNuevoPais.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function cargarCiudades() {
    selectNuevaCiudad.innerHTML=`<select name="ciudadCompania" class="form-control" id="ciudadCompania" required>
                            <option value="0" disabled selected>Seleccione una ciudad</option>
                        </select>`;
    fetch(`http://127.0.0.1:3030/v1/localizacion/ciudad-pais/${selectNuevoPais.value}`, {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach(ciudad =>{
                plantilla = `<option value="${ciudad.id}">${ciudad.nombre}</option>`;
                selectNuevaCiudad.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function listarCompanias() {
    fetch('http://127.0.0.1:3030/v1/companias/', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt}
    }).then(res => {
        res.json().then(data => {
            data.forEach((fila) => {
                plantilla = `<tr>
                                <td id="labelEdit-compania${fila.id_compania}" class="border-left">${fila.Nombre}</td>
                                <td id="inputEdit-compania${fila.id_compania}" class="nonvisible"><input class="form-control" type="text" value="${fila.Nombre}"></td>

                                <td id="labelEdit-direccion${fila.id_compania}">${fila.Direccion}</td>
                                <td id="inputEdit-direccion${fila.id_compania}" class="nonvisible"><input class="form-control" type="text" value="${fila.Direccion}"></td>
                                
                                <td id="labelEdit-email${fila.id_compania}">${fila.Email}</td>
                                <td id="inputEdit-email${fila.id_compania}" class="nonvisible"><input class="form-control" type="text" value="${fila.Email}"></td>
                                
                                <td id="labelEdit-telefono${fila.id_compania}">${fila.Telefono}</td>
                                <td id="inputEdit-telefono${fila.id_compania}" class="nonvisible"><input class="form-control" type="text" value="${fila.Telefono}"></td>

                                <td id="labelEdit-region${fila.id_compania}">${fila.Region}/</td>
                                <td id="selectEdit-region${fila.id_compania}" class="nonvisible">
                                    <select name="regionCompania" class="form-control" id="Edit-region${fila.id_compania}" onchange="listarPaises(${fila.id_compania})" >
                                        <option value="${fila.id_region}" selected disabled hidden>${fila.Region}</option>
                                    </select>
                                </td>

                                <td id="labelEdit-pais${fila.id_compania}">${fila.Pais}/</td>
                                <td id="selectEdit-pais${fila.id_compania}" class="nonvisible">
                                    <select name="paisCompania" class="form-control" id="Edit-pais${fila.id_compania}" onchange="listarCiudades(${fila.id_compania})">
                                    <option value="${fila.id_pais}" selected disabled hidden>${fila.Pais}</option>
                                    </select>
                                </td>

                                <td id="labelEdit-ciudad${fila.id_compania}">${fila.Ciudad}</td>
                                <td id="selectEdit-ciudad${fila.id_compania}" class="nonvisible">
                                    <select name="ciudadCompania" class="form-control" id="Edit-ciudad${fila.id_compania}">
                                    <option value="${fila.id_ciudad}" selected disabled hidden>${fila.Ciudad}</option>
                                    </select>
                                </td>

                                <td id="edit-compania${fila.id_compania}"><button onclick="editarCompania(${fila.id_compania})" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i></button></td>
                                <td id="save-compania${fila.id_compania}" class="nonvisible"><button onclick="guardarCambiosCompania(${fila.id_compania})" class="btn btn-success btn-sm"><i class="fas fa-save"></i></button></td>
                                <td id="del-compania${fila.id_compania}" class="border-right"><button id="del-compania${fila.id_compania}" data-toggle="modal" data-target="#modalEliminar" onclick="eliminarCompania(${fila.id_compania})" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
                                <td id="cancelEdit-compania${fila.id_compania}" class="border-right nonvisible"><button id="cancel-compania${fila.id_compania}" onclick="cancelarEditCompania(${fila.id_compania})" class="btn btn-danger btn-sm"><i class="fas fa-times"></i></button></td>
                            </tr>`;
                rows.insertAdjacentHTML('beforeend', plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function editarCompania(id_compania){
    document.getElementById(`labelEdit-compania${id_compania}`).classList.add("nonvisible");
    document.getElementById(`labelEdit-direccion${id_compania}`).classList.add("nonvisible");
    document.getElementById(`labelEdit-email${id_compania}`).classList.add("nonvisible");
    document.getElementById(`labelEdit-telefono${id_compania}`).classList.add("nonvisible");
    document.getElementById(`labelEdit-region${id_compania}`).classList.add("nonvisible");
    document.getElementById(`labelEdit-pais${id_compania}`).classList.add("nonvisible");
    document.getElementById(`labelEdit-ciudad${id_compania}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-compania${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`inputEdit-direccion${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`inputEdit-email${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`inputEdit-telefono${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`selectEdit-region${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`selectEdit-pais${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`selectEdit-ciudad${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`edit-compania${id_compania}`).classList.add("nonvisible");
    document.getElementById(`save-compania${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`del-compania${id_compania}`).classList.add("nonvisible");
    document.getElementById(`cancelEdit-compania${id_compania}`).classList.remove("nonvisible");
    listarRegiones(id_compania);
}

function listarRegiones(id_compania) {
    
    let selRegionCiudad = document.getElementById(`Edit-region${id_compania}`);

    fetch('http://127.0.0.1:3030/v1/localizacion/regiones', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach(region =>{
                plantilla = `<option value="${region.id}">${region.nombre}</option>`;
                selRegionCiudad.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function listarPaises(id_compania) {
    let selRegionPais = document.getElementById(`Edit-region${id_compania}`);
    let selPais = document.getElementById(`Edit-pais${id_compania}`);
    selPais.innerHTML=`<select name="PaisCompania" class="form-control" id="paisCompania"
                            onchange="cargarCiudades()" required>
                            <option value="0" disabled selected>Seleccione un país</option>
                        </select>`;
    fetch(`http://127.0.0.1:3030/v1/localizacion/pais-region/${selRegionPais.value}`, {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach(pais =>{
                plantilla = `<option value="${pais.id}">${pais.nombre}</option>`;
                selPais.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function listarCiudades(id_compania) {
    let selPaisCiudad = document.getElementById(`Edit-pais${id_compania}`);
    let selCiudad = document.getElementById(`Edit-ciudad${id_compania}`);
    selCiudad.innerHTML=`<select name="ciudadCompania" class="form-control" id="ciudadCompania" required>
                            <option value="0" disabled selected>Seleccione una ciudad</option>
                        </select>`;
    fetch(`http://127.0.0.1:3030/v1/localizacion/ciudad-pais/${selPaisCiudad.value}`, {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach(ciudad =>{
                plantilla = `<option value="${ciudad.id}">${ciudad.nombre}</option>`;
                selCiudad.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function guardarCambiosCompania(id_compania){
    let nombreActualizado = document.querySelector(`#inputEdit-compania${id_compania}>input`).value;
    let direccionActualizada = document.querySelector(`#inputEdit-direccion${id_compania}>input`).value;
    let emailActualizado = document.querySelector(`#inputEdit-email${id_compania}>input`).value;
    let telefonoActualizado = document.querySelector(`#inputEdit-telefono${id_compania}>input`).value;
    let ciudadActualizado = document.querySelector(`#selectEdit-ciudad${id_compania}>select`).value;
    fetch(`http://127.0.0.1:3030/v1/companias/compania`, {
        method: 'PUT',
        body:`{"id":"${id_compania}","nombre":"${nombreActualizado}","direccion":"${direccionActualizada}",
                "email":"${emailActualizado}","telefono":"${telefonoActualizado}","id_ciudad":"${ciudadActualizado}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(res => {
        res.json().then(data => {
        console.log(data);
        });
        document.getElementById(`labelEdit-compania${id_compania}`).classList.remove("nonvisible");
        document.getElementById(`labelEdit-direccion${id_compania}`).classList.remove("nonvisible");
        document.getElementById(`labelEdit-email${id_compania}`).classList.remove("nonvisible");
        document.getElementById(`labelEdit-telefono${id_compania}`).classList.remove("nonvisible");
        document.getElementById(`labelEdit-region${id_compania}`).classList.remove("nonvisible");
        document.getElementById(`labelEdit-pais${id_compania}`).classList.remove("nonvisible");
        document.getElementById(`labelEdit-ciudad${id_compania}`).classList.remove("nonvisible");
        document.getElementById(`inputEdit-compania${id_compania}`).classList.add("nonvisible");
        document.getElementById(`inputEdit-direccion${id_compania}`).classList.add("nonvisible");
        document.getElementById(`inputEdit-email${id_compania}`).classList.add("nonvisible");
        document.getElementById(`inputEdit-telefono${id_compania}`).classList.add("nonvisible");
        document.getElementById(`selectEdit-region${id_compania}`).classList.add("nonvisible");
        document.getElementById(`selectEdit-pais${id_compania}`).classList.add("nonvisible");
        document.getElementById(`selectEdit-ciudad${id_compania}`).classList.add("nonvisible");
        document.getElementById(`edit-compania${id_compania}`).classList.remove("nonvisible");
        document.getElementById(`save-compania${id_compania}`).classList.add("nonvisible");
        document.getElementById(`del-compania${id_compania}`).classList.remove("nonvisible");
        document.getElementById(`cancelEdit-compania${id_compania}`).classList.add("nonvisible");
        location.reload();
    }).catch(error => {
        console.log(error);
    });
}

function cancelarEditCompania(id_compania){
    document.getElementById(`labelEdit-compania${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`labelEdit-direccion${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`labelEdit-email${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`labelEdit-telefono${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`labelEdit-region${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`labelEdit-pais${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`labelEdit-ciudad${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`inputEdit-compania${id_compania}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-direccion${id_compania}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-email${id_compania}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-telefono${id_compania}`).classList.add("nonvisible");
    document.getElementById(`selectEdit-region${id_compania}`).classList.add("nonvisible");
    document.getElementById(`selectEdit-pais${id_compania}`).classList.add("nonvisible");
    document.getElementById(`selectEdit-ciudad${id_compania}`).classList.add("nonvisible");
    document.getElementById(`edit-compania${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`save-compania${id_compania}`).classList.add("nonvisible");
    document.getElementById(`del-compania${id_compania}`).classList.remove("nonvisible");
    document.getElementById(`cancelEdit-compania${id_compania}`).classList.add("nonvisible");
}

function eliminarCompania(id_compania){
    plantilla_modal = `<p id="modal eliminar">¿Está seguro que desea eliminar la companía? Tenga en cuenta que se podrían perder los datos de contactos que pertenezcan a ella</p>
                    <button id="btnAceptarEliminar" class="btn btn-success" onclick="eliminarElemento('${id_compania}')">Si, ELIMINAR</button>
                    <button id="btnCancelarEliminar" class="btn btn-danger" data-dismiss="modal">CANCELAR</button>`;
    modalConfirmaEliminar.innerHTML = plantilla_modal;
}

function eliminarElemento(id_compania){
    fetch(`http://127.0.0.1:3030/v1/companias/compania/${id_compania}/confirm-delete`, {
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

let nombreCompania = document.getElementById('nombreCompania');
let direccionCompania = document.getElementById("direccionCompania");
let emailCompania = document.getElementById("emailCompania");
let telefonoCompania = document.getElementById("telefonoCompania");
let ciudadCompania = document.getElementById("ciudadCompania");

function crearCompania(){ 
    fetch('http://127.0.0.1:3030/v1/companias/nueva-compania',{
        method:'POST',
        body:`{"nombre":"${nombreCompania.value}","direccion":"${direccionCompania.value}","email":"${emailCompania.value}","telefono":"${telefonoCompania.value}","id_ciudad":"${ciudadCompania.value}"}`,
        headers: { "Authorization": "Bearer " + jwt,
                    "Content-Type":"application/json" }
    }).then(response => {
        console.log(response);                     
        if(response.status==200){
            response.json().then((data)=>{
                console.log(data);
            });        
            location.href = "../html/companias.html";
        }
        else{
            console.log(response.json);
        }
    });
};

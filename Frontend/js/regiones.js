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
                                            <td class="border-left"></td><td></td><td class="border-right"></td>
                                            <td ></td><td></td><td class="border-right"></td>
                                            <td>${fila.Nombre_ciudad}</td><td><button onclick="editarCiudad(${fila.id_ciudad})" class="btn btn-primary btn-sm"><i id="edit-${fila.id_ciudad}" class="fas fa-pencil-alt"></i></button></td>
                                            <td class="border-right"><button onclick="eliminarCiudad(${fila.id_ciudad})" class="btn btn-danger btn-sm"><i id="del-${fila.Nombre_ciudad}" class="fas fa-trash-alt"></i></button></td>
                                        </tr>`;
                        }else if (fila.Nombre_region == nombreRegion && fila.Nombre_pais != nombrePais){
                            plantilla = `<tr>
                                            <td class="border-left"></td><td></td><td class="border-right"></td>
                                            <td>${fila.Nombre_pais}</td><td><button onclick="editarPais(${fila.id_pais})" class="btn btn-primary btn-sm"><i id="edit-${fila.id_pais}" class="fas fa-pencil-alt"></i></button></td>
                                            <td class="border-right"><button onclick="eliminarPais(${fila.id_pais})" class="btn btn-danger btn-sm"><i id="del-${fila.Nombre_pais}" class="fas fa-trash-alt"></i></button></td>
                                            <td>${fila.Nombre_ciudad}</td><td><button onclick="editarCiudad(${fila.id_ciudad})" class="btn btn-primary btn-sm"><i id="edit-${fila.id_ciudad}" class="fas fa-pencil-alt"></i></button></td>
                                            <td class="border-right"><button onclick="eliminarCiudad(${fila.id_ciudad})" class="btn btn-danger btn-sm"><i id="del-${fila.Nombre_ciudad}" class="fas fa-trash-alt"></i></button></td>
                                        </tr>`;
                            nombrePais = fila.Nombre_pais;
                        }else{
                            plantilla = `<tr>
                                            <td class="border-left">${fila.Nombre_region}</td><td><button onclick="editarRegion(${fila.id_region})" class="btn btn-primary btn-sm"><i id="edit-${fila.id_region}" class="fas fa-pencil-alt"></i></button></td>
                                            <td class="border-right"><button onclick="eliminarRegion(${fila.id_region})" class="btn btn-danger btn-sm"><i id="del-${fila.Nombre_region}" class="fas fa-trash-alt"></i></button></td>
                                            <td>${fila.Nombre_pais}</td><td><button onclick="editarPais(${fila.id_pais})" class="btn btn-primary btn-sm"><i id="edit-${fila.id_pais}" class="fas fa-pencil-alt"></i></button></td>
                                            <td class="border-right"><button onclick="eliminarPais(${fila.id_pais})" class="btn btn-danger btn-sm"><i id="del-${fila.Nombre_pais}" class="fas fa-trash-alt"></i></button></td>
                                            <td>${fila.Nombre_ciudad}</td><td><button onclick="editarCiudad(${fila.id_ciudad})" class="btn btn-primary btn-sm"><i id="edit-${fila.id_ciudad}" class="fas fa-pencil-alt"></i></button></td>
                                            <td class="border-right"><button onclick="eliminarCiudad(${fila.id_ciudad})" class="btn btn-danger btn-sm"><i id="del-${fila.Nombre_ciudad}" class="fas fa-trash-alt"></i></button></td>
                                        </tr>`;
                            nombreRegion = fila.Nombre_region;
                            nombrePais = fila.Nombre_pais;
                        }
                        
                        rows.insertAdjacentHTML('beforeend', plantilla);
                    });
                });
            }).catch(error => {
                alert(error);
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
    }).catch()
}

function cancelarRegion(){
    divNuevaRegion.classList.add("nonvisible");
    btnAgregarRegion.classList.remove("nonvisible");
}

function editarRegion(id_region){
    alert(id_region);
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
    }).catch()
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
    }).catch()
}

function cancelarPais(){
    divNuevoPais.classList.add("nonvisible");
    btnAgregarPais.classList.remove("nonvisible");
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
            data.forEach(region =>{
                plantilla = `<option value="${region.id}">${region.nombre}</option>`;
                selRegionCiudad.insertAdjacentHTML("beforeend",plantilla);
            });
        });
    }).catch()
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
    }).catch()
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
    }).catch()
}

function cancelarCiudad(){
    divNuevaCiudad.classList.add("nonvisible");
    btnAgregarCiudad.classList.remove("nonvisible");
}
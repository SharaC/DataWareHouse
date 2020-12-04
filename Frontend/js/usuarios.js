const jwt = sessionStorage.getItem("usertoken");
let plantilla;
let modalConfirmaEliminar = document.getElementById("modal-edit");
let plantilla_modal;

listarUsuarios();

function listarUsuarios() {
    fetch('http://127.0.0.1:3030/v1/usuarios/listado', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt}
    }).then(res => {
        res.json().then(data => {
            data.forEach((fila) => {
                plantilla = `<tr>
                                <td id="labelEdit-user${fila.id_usuario}" class="border-left">${fila.Usuario}</td>
                                <td id="inputEdit-user${fila.id_usuario}" class="nonvisible"><input class="form-control" type="text" value="${fila.Usuario}"></td>

                                <td id="labelEdit-nombre${fila.id_usuario}">${fila.Nombre}</td>
                                <td id="inputEdit-nombre${fila.id_usuario}" class="nonvisible"><input class="form-control" type="text" value="${fila.Nombre}"></td>
                                
                                <td id="labelEdit-email${fila.id_usuario}">${fila.Email}</td>
                                <td id="inputEdit-email${fila.id_usuario}" class="nonvisible"><input class="form-control" type="text" value="${fila.Email}"></td>
                                
                                <td id="labelEdit-perfil${fila.id_usuario}">${fila.Rol}</td>
                                <td id="selectEdit-perfil${fila.id_usuario}" class="nonvisible">
                                    <select name="perfilUsuario" class="form-control" id="Edit-perfil${fila.id_usuario}" value="${fila.id_perfil}">
                                        <option value="${fila.id_perfil}" selected disabled hidden>${fila.Rol}</option>
                                        <option value="1">administrador</option>
                                        <option value="2">usuario</option>
                                    </select>
                                </td>

                                <td class="text-center" id="labelEdit-password${fila.id_usuario}">************</td>
                                <td id="inputEdit-password${fila.id_usuario}" class="nonvisible"><input class="form-control" type="password" value=""></td>
                                
                                <td id="edit-user${fila.id_usuario}"><button onclick="editarUser(${fila.id_usuario})" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i></button></td>
                                <td id="save-user${fila.id_usuario}" class="nonvisible"><button onclick="guardarCambiosUser(${fila.id_usuario})" class="btn btn-success btn-sm"><i class="fas fa-save"></i></button></td>
                                <td id="del-user${fila.id_usuario}" class="border-right"><button id="del-user${fila.id_usuario}" data-toggle="modal" data-target="#modalEliminar" onclick="eliminarUser(${fila.id_usuario})" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
                                <td id="cancelEdit-user${fila.id_usuario}" class="border-right nonvisible"><button id="cancel-user${fila.id_usuario}" onclick="cancelarEditUser(${fila.id_usuario})" class="btn btn-danger btn-sm"><i class="fas fa-times"></i></button></td>
                            </tr>`;
                rows.insertAdjacentHTML('beforeend', plantilla);
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
    document.getElementById(`labelEdit-password${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-user${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`inputEdit-nombre${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`inputEdit-email${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`inputEdit-password${id_usuario}`).classList.remove("nonvisible");
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
    let passwordActualizado = document.querySelector(`#inputEdit-password${id_usuario}>input`).value;
    fetch('http://127.0.0.1:3030/v1/usuarios/user', {
        method: 'PUT',
        body:`{"id":"${id_usuario}","username":"${usernameActualizado}","nombre_completo":"${nombreActualizado}","email":"${emailActualizado}","id_perfil":"${perfilActualizado}","password":"${passwordActualizado}"}`,
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
        document.getElementById(`labelEdit-password${id_usuario}`).classList.remove("nonvisible");
        document.getElementById(`inputEdit-user${id_usuario}`).classList.add("nonvisible");
        document.getElementById(`inputEdit-nombre${id_usuario}`).classList.add("nonvisible");
        document.getElementById(`inputEdit-email${id_usuario}`).classList.add("nonvisible");
        document.getElementById(`inputEdit-password${id_usuario}`).classList.add("nonvisible");
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
    document.getElementById(`labelEdit-password${id_usuario}`).classList.remove("nonvisible");
    document.getElementById(`inputEdit-user${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-nombre${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-email${id_usuario}`).classList.add("nonvisible");
    document.getElementById(`inputEdit-password${id_usuario}`).classList.add("nonvisible");
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

const jwt = sessionStorage.getItem("usertoken");
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
                        let plantilla;
                        if (fila.Nombre_region == nombreRegion && fila.Nombre_pais == nombrePais){
                            plantilla = `<tr>
                                            <td></td><td></td><td></td>
                                            <td></td><td></td><td></td>
                                            <td>${fila.Nombre_ciudad}</td><td>edit</td><td>elim</td>
                                        </tr>`;
                        }else if (fila.Nombre_region == nombreRegion && fila.Nombre_pais != nombrePais){
                            plantilla = `<tr>
                                            <td></td><td></td><td></td>
                                            <td>${fila.Nombre_pais}</td><td>edit</td><td>elim</td>
                                            <td>${fila.Nombre_ciudad}</td><td>edit</td><td>elim</td>
                                        </tr>`;
                            nombrePais = fila.Nombre_pais;
                        }else{
                            plantilla = `<tr>
                                            <td>${fila.Nombre_region}</td><td>edit</td><td>elim</td>
                                            <td>${fila.Nombre_pais}</td><td>edit</td><td>elim</td>
                                            <td>${fila.Nombre_ciudad}</td><td>edit</td><td>elim</td>
                                        </tr>`;
                            nombreRegion = fila.Nombre_region;
                            nombrePais = fila.Nombre_pais;
                        }
                        
                        rows.insertAdjacentHTML('beforeend', plantilla);
                    });
                });
            }).catch(error => {
                console.log(error);
            });
}
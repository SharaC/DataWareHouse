const jwt = sessionStorage.getItem("usertoken");
mostrarArbolRegiones();

function mostrarArbolRegiones() {
            fetch('http://127.0.0.1:3030/localizacion/ciudades', {
                method: 'GET',
                headers: { "Authorization": "Bearer " + jwt }
            }).then(res => {
                res.json().then(data => {
                    data.forEach((e) => {
                        let template = `<tr><td><input type="checkbox"></td>
                                            <td>${e.regionDesc}</td>
                                            <td>${e.countryDesc}</td>
                                            <td>${e.city}</td>
                                        </tr>`;
                        rows.insertAdjacentHTML('beforeend', template);
                    });
                });
            }).catch(error => {
                console.log(error);
            });
}
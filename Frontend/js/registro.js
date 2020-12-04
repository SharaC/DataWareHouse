let btnRegistro = document.getElementById('btnRegistro');
let username = document.getElementById("username");
let password = document.getElementById("password");
let passwordRepeat = document.getElementById("passwordRepeat");
let nombreCompleto = document.getElementById("nombreCompleto");
let email = document.getElementById("email");
let perfilUsuario = document.getElementById("perfilUsuario");

function registrarUsuario(){
    if (password.value === passwordRepeat.value) {
        fetch('http://127.0.0.1:3030/v1/usuarios/registro',{
            method:'POST',
            body:`{"username":"${username.value}","password":"${password.value}","nombre_completo":"${nombreCompleto.value}","email":"${email.value}","id_perfil":"${perfilUsuario.value}"}`,
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response => {
            console.log(response);                     
            if(response.status==200){
                response.json().then((data)=>{
                    console.log(data);
                });        
                location.href = "../html/usuarios.html";
            }
            else{
                console.log(response.json);
            }
        });
    } else {
        alert("las contraseñas no coinciden");
    }
};
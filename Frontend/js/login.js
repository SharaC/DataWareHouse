let btnLogin = document.getElementById('btnLogin');
let usuario = document.getElementById("usuarioLogin");
let password = document.getElementById("usuarioPassword");

function login(){
        fetch('http://127.0.0.1:3030/v1/usuarios/login',{
            method:'POST',
            body:`{"username":"${usuario.value}","password":"${password.value}"}`,
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response => {                
            if(response.status==200){
                response.json().then((data)=>{
                    sessionStorage.setItem("usertoken", data.token);
                });        
                location.href = "../html/contactos.html";
            }
            else{
                console.log(response.json);
            }
        });
    
    
};
const conexion = require('../../startup/conexion');
const { generarToken } = require("../../middlewares/token/jwt");

const autenticarUsuario = (req, res) => {
    const {username, password } = req.body;
    conexion.query("SELECT * FROM usuarios WHERE username=?", {
        replacements: [username],
        type:conexion.QueryTypes.SELECT
    }).then((result)=> {
        if (result.length === 0) {
            res.status(401).json("Usuario o contraseña inválidos");
        }else if (username === result[0].username && password === result[0].password) {
            const payload = {
                usuario: result[0].username,
                id_usuario : result[0].id,
                rol: result[0].id_perfil
            };
            const token = generarToken(payload);
            res.status(200).json({ token });
        }else{
            res.status(401).json("Usuario o contraseña inválidos");
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
};

const registrarUsuario = (req, res) => {
    const {username, password, nombre_completo, email, id_perfil} = req.body;
    const id_rol = 2;
    conexion.query("INSERT INTO `usuarios` (`username`,`password`,`nombre_completo`,`email`,`id_perfil`) VALUES (?,?,?,?,?);",
    {
        replacements: [username, password, nombre_completo, email, id_perfil],
        type: conexion.QueryTypes.INSERT
    }).then(result => {
        res.status(200).json("usuario creado con éxito, id: " + result[0]);
    }).catch(err => {
        res.status(500).json(err);
    });
};

module.exports = {
    autenticarUsuario,
    registrarUsuario
}
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

const listarUsuarios = (req, res) => {
    conexion.query(`SELECT USU.id AS id_usuario, USU.username AS Usuario, USU.nombre_completo AS Nombre, USU.email AS Email, PER.perfil AS Rol, USU.id_perfil 
                    FROM usuarios USU
                    INNER JOIN perfiles PER ON PER.id = USU.id_perfil;`, 
        {type:conexion.QueryTypes.SELECT
    }).then((result)=> {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
};

const actualizarUsuario = (req, res) => {
    let {id, username,nombre_completo,email,id_perfil} = req.body;
    conexion.query(`UPDATE usuarios SET username=?, nombre_completo=?, email=?, id_perfil=? WHERE id=?;`,
    {
        replacements: [username,nombre_completo,email,id_perfil, id],
        type: conexion.QueryTypes.UPDATE
    }).then(result => {
        result[1] === 0 ? res.status(400).json("los parametros enviados para actualizar no son correctos, ningún usuario se actualizó") : 
        res.status(200).json("El usuario con id: "+id+" fue actualizado correctamente");
    }).catch(err => {
        res.status(500).json(err);
    });
}

const eliminarUsuario = (req, res) => {
    let id = req.params.id;
    conexion.query(`DELETE from usuarios WHERE id=${id};`,
        {
            type: conexion.QueryTypes.DELETE
        }).then(result => {
            result[1] === 0 ? res.status(400).json("los parametros enviados para eliminar no son correctos, ningún usuario se eliminó") :
            res.status(200).json("El usuario con id: "+id+" fue ELIMINADO correctamente");
        }).catch(err => {
            res.status(500).json(err);
            
        });
    
}

module.exports = {
    autenticarUsuario,
    registrarUsuario,
    listarUsuarios,
    actualizarUsuario,
    eliminarUsuario,
}
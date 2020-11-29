const conexion = require('../../startup/conexion');

const listarContactos = (req, res) => {
    conexion.query(`SELECT * FROM contactos;`,
    {
        type: conexion.QueryTypes.SELECT
    }).then(result => {
        result.length === 0 ? res.status(404).json("no se encontró ningún contacto") : res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const listarContactoID = (req, res) => {
    let id = req.params.id;
    conexion.query(`SELECT * FROM contactos WHERE id= ?`,
    {
        replacements: [id],
        type: conexion.QueryTypes.SELECT
    }).then(result => {
        result.length === 0 ? res.status(404).json("no se encontró el contacto solicitado") : res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const crearContacto = (req, res) => {
    let {nombre_completo,cargo,email,id_compania,direccion,interes,id_ciudad} = req.body;
    conexion.query("INSERT INTO `contactos` (`nombre_completo`,`cargo`,`email`,`id_compania`,`direccion`,`interes`,`id_ciudad`) VALUES (?,?,?,?,?,?,?);",
    {
        replacements: [nombre_completo,cargo,email,id_compania,direccion,interes,id_ciudad],
        type: conexion.QueryTypes.INSERT
    }).then(result => {
        res.status(200).json("Se creó el contacto con id: " + result[0]);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const editarContacto = (req, res) => {
    let {id, nombre_completo,cargo,email,id_compania,direccion,interes,id_ciudad} = req.body;
    conexion.query(`UPDATE contactos SET nombre_completo=?, cargo=?, email=?, id_compania=?, direccion=?, interes=?, id_ciudad=? WHERE id=?;`,
    {
        replacements: [nombre_completo,cargo,email,id_compania,direccion,interes,id_ciudad, id],
        type: conexion.QueryTypes.UPDATE
    }).then(result => {
        result[1] === 0 ? res.status(400).json("los parametros enviados para actualizar no son correctos, ningún contacto se actualizó") : 
        res.status(200).json("El contacto con id: "+id+" fue actualizado correctamente");
    }).catch(err => {
        res.status(500).json(err);
    });
}

const eliminarContacto = (req, res) => {
    let id = req.params.id;
    conexion.query(`DELETE from contactos WHERE id=${id};`,
        {
            type: conexion.QueryTypes.UPDATE
        }).then(result => {
            result[1] === 0 ? res.status(400).json("los parametros enviados para eliminar no son correctos, ningún contacto se eliminó") :
            res.status(200).json("El contacto con id: "+id+" fue ELIMINADO correctamente");
        }).catch(err => {
            if (err.parent.errno === 1451) {
                res.status(409).json("El contacto no puede ser eliminado por que está relacionado con un pedido en la tabla detalles_pedidos");
            }else{
              res.status(500).json(err);
            }
        });
    
}

module.exports = { 
    listarContactos,
    listarContactoID,
    crearContacto,
    editarContacto,
    eliminarContacto
}
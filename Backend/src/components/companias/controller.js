const conexion = require('../../startup/conexion');

const listarCompanias = (req, res) => {
    conexion.query(`SELECT * FROM companias;`,
    {
        type: conexion.QueryTypes.SELECT
    }).then(result => {
        result.length === 0 ? res.status(404).json("no se encuentran compañías registradas aún") : res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const listarCompaniaID = (req, res) => {
    let id = req.params.id;
    conexion.query(`SELECT * FROM companias WHERE id= ?`,
    {
        replacements: [id],
        type: conexion.QueryTypes.SELECT
    }).then(result => {
        result.length === 0 ? res.status(404).json("no se encontró la compania pedida") : res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const crearCompania = (req, res) => {
    let {nombre,direccion,email,telefono,id_ciudad} = req.body;
    conexion.query("INSERT INTO `companias` (`nombre`,`direccion`,`email`,`telefono`,`id_ciudad`) VALUES (?,?,?,?,?);",
    {
        replacements: [nombre,direccion,email,telefono,id_ciudad],
        type: conexion.QueryTypes.INSERT
    }).then(result => {
        res.status(200).json("Se ha añadido la compania con id: " + result[0]);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const editarCompania = (req, res) => {
    let {id, nombre,direccion,email,telefono,id_ciudad} = req.body;
    conexion.query(`UPDATE companias SET nombre=?, direccion=?, email=?, telefono=?, id_ciudad=? WHERE id=?;`,
    {
        replacements: [nombre,direccion,email,telefono,id_ciudad, id],
        type: conexion.QueryTypes.UPDATE
    }).then(result => {
        result[1] === 0 ? res.status(400).json("los parametros enviados para actualizar no son correctos, ninguna compañía se actualizó") : 
        res.status(200).json("La compañía con id: "+id+" se actualizó correctamente");
    }).catch(err => {
        res.status(500).json(err);
    });
}

const eliminarCompania = (req, res) => {
    let id = req.params.id;
    let id_rol = req.id_rol;
    if (id_rol === 1){
        conexion.query(`DELETE from compania WHERE id=${id};`,
        {
            type: conexion.QueryTypes.UPDATE
        }).then(result => {
            result[1] === 0 ? res.status(400).json("los parametros enviados para eliminar no son correctos, ningún producto se eliminó") :
            res.status(200).json("Producto con id: "+id+" fue ELIMINADO correctamente");
        }).catch(err => {
            if (err.parent.errno === 1451) {
                res.status(409).json("El producto no puede ser eliminado por que está relacionado con un pedido en la tabla detalles_pedidos");
            }else{
              res.status(500).json(err);
            }
        });
    } else {
        res.status(403).json("el usuario no tiene permisos para eliminar productos")
    }
    
}

module.exports = {
    listarCompanias,
    listarCompaniaID,
    crearCompania,
    editarCompania,
    eliminarCompania
}
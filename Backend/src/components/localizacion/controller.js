const conexion = require('../../startup/conexion');

const listarRegiones = (req, res) => {
    conexion.query(`SELECT * FROM regiones;`,
    {
        type: conexion.QueryTypes.SELECT
    }).then(result => {
        result.length === 0 ? res.status(404).json("no se encontró ninguna region") : res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const listarRegionID = (req, res) => {
    let id = req.params.id;
    conexion.query(`SELECT * FROM regiones WHERE id= ?`,
    {
        replacements: [id],
        type: conexion.QueryTypes.SELECT
    }).then(result => {
        result.length === 0 ? res.status(404).json("no se encontró la region solicitada") : res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const crearRegion = (req, res) => {
    let {nombre} = req.body;
    conexion.query("INSERT INTO `regiones` (`nombre`) VALUES (?);",
    {
        replacements: [nombre],
        type: conexion.QueryTypes.INSERT
    }).then(result => {
        res.status(200).json("Region creada con id: " + result[0]);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const editarRegion = (req, res) => {
    let {id, nombre} = req.body;
    conexion.query(`UPDATE regiones SET nombre=? WHERE id=?;`,
    {
        replacements: [nombre, id],
        type: conexion.QueryTypes.UPDATE
    }).then(result => {
        result[1] === 0 ? res.status(400).json("los parametros enviados para actualizar no son correctos, ninguna región se actualizó") : 
        res.status(200).json("Región con id: "+id+" fue actualizada correctamente");
    }).catch(err => {
        res.status(500).json(err);
    });
}

const eliminarRegion = (req, res) => {
    let id = req.params.id;
    conexion.query(`DELETE from regiones WHERE id=${id};`,
    {
        type: conexion.QueryTypes.UPDATE
    }).then(result => {
        result[1] === 0 ? res.status(400).json("los parametros enviados para eliminar no son correctos, ninguna región se eliminó") :
        res.status(200).json("La región con id: "+id+" fue ELIMINADA correctamente");
    }).catch(err => {
        if (err.parent.errno === 1451) {
            res.status(409).json("La región no puede ser eliminada por que está relacionado con un país en la tabla paises");
        }else{
            res.status(500).json(err);
        }
    });
}


const listarPaises = (req, res) => {
    conexion.query(`SELECT * FROM paises;`,
    {
        type: conexion.QueryTypes.SELECT
    }).then(result => {
        result.length === 0 ? res.status(404).json("no se encontró ningún país") : res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const listarPaisID = (req, res) => {
    let id = req.params.id;
    conexion.query(`SELECT * FROM paises WHERE id= ?`,
    {
        replacements: [id],
        type: conexion.QueryTypes.SELECT
    }).then(result => {
        result.length === 0 ? res.status(404).json("no se encontró el producto solicitado") : res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const crearPais = (req, res) => {
    let {nombre,id_region} = req.body;
    conexion.query("INSERT INTO `paises` (`nombre`,`id_region`) VALUES (?,?);",
    {
        replacements: [nombre,id_region],
        type: conexion.QueryTypes.INSERT
    }).then(result => {
        res.status(200).json("País creado con id: " + result[0]);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const editarPais = (req, res) => {
    let {id, nombre,id_region} = req.body;
    conexion.query(`UPDATE paises SET nombre=?, id_region=? WHERE id=?;`,
    {
        replacements: [nombre,id_region, id],
        type: conexion.QueryTypes.UPDATE
    }).then(result => {
        result[1] === 0 ? res.status(400).json("los parametros enviados para actualizar no son correctos, ningún país se actualizó") : 
        res.status(200).json("El país con id: "+id+" fue actualizado correctamente");
    }).catch(err => {
        res.status(500).json(err);
    });
}

const eliminarPais = (req, res) => {
    let id = req.params.id;
    conexion.query(`DELETE from paises WHERE id=${id};`,
    {
        type: conexion.QueryTypes.UPDATE
    }).then(result => {
        result[1] === 0 ? res.status(400).json("los parametros enviados para eliminar no son correctos, ningún país se eliminó") :
        res.status(200).json("El país con id: "+id+" fue ELIMINADO correctamente");
    }).catch(err => {
        if (err.parent.errno === 1451) {
            res.status(409).json("El país no puede ser eliminado por que está relacionado con una ciudad en la tabla ciudades");
        }else{
            res.status(500).json(err);
        }
    });
}



const listarCiudades = (req, res) => {
    conexion.query(`SELECT * FROM ciudades;`,
    {
        type: conexion.QueryTypes.SELECT
    }).then(result => {
        result.length === 0 ? res.status(404).json("no se encontró ninguna ciudad") : res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const listarCiudadID = (req, res) => {
    let id = req.params.id;
    conexion.query(`SELECT * FROM ciudades WHERE id= ?`,
    {
        replacements: [id],
        type: conexion.QueryTypes.SELECT
    }).then(result => {
        result.length === 0 ? res.status(404).json("no se encontró la ciudad solicitada") : res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const crearCiudad = (req, res) => {
    let {nombre,id_paises} = req.body;
    conexion.query("INSERT INTO `ciudades` (`nombre`,`id_paises`) VALUES (?,?);",
    {
        replacements: [nombre,id_paises],
        type: conexion.QueryTypes.INSERT
    }).then(result => {
        res.status(200).json("Ciudad creada con id: " + result[0]);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const editarCiudad = (req, res) => {
    let {id, nombre,id_paises} = req.body;
    console.log(id);
    conexion.query(`UPDATE ciudades SET nombre=?, id_paises=? WHERE id=?;`,
    {
        replacements: [nombre,id_paises, id],
        type: conexion.QueryTypes.UPDATE
    }).then(result => {
        result[1] === 0 ? res.status(400).json("los parametros enviados para actualizar no son correctos, ninguna ciudad se actualizó") : 
        res.status(200).json("La ciudad con id: "+id+" fue actualizada correctamente");
    }).catch(err => {
        res.status(500).json(err);
    });
}

const eliminarCiudad = (req, res) => {
    let id = req.params.id;
    conexion.query(`DELETE from ciudades WHERE id=${id};`,
    {
        type: conexion.QueryTypes.UPDATE
    }).then(result => {
        result[1] === 0 ? res.status(400).json("los parametros enviados para eliminar no son correctos, ninguna ciudad se eliminó") :
        res.status(200).json("La ciudad con id: "+id+" fue ELIMINADA correctamente");
    }).catch(err => {
        if (err.parent.errno === 1451) {
            res.status(409).json("La ciudad no puede ser eliminada por que está relacionado con un pedido en la tabla contactos o companias");
        }else{
            res.status(500).json(err);
        }
    });
    
}

module.exports = {
    listarRegiones, listarRegionID, crearRegion, editarRegion, eliminarRegion,
    listarPaises, listarPaisID, crearPais, editarPais, eliminarPais,
    listarCiudades, listarCiudadID, crearCiudad, editarCiudad, eliminarCiudad
}
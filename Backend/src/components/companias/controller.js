const conexion = require('../../startup/conexion');

const listarCompanias = (req, res) => {
    conexion.query(`SELECT COM.id AS id_compania, COM.nombre AS Nombre, COM.direccion AS Direccion, COM.email AS Email, COM.telefono AS Telefono, CIU.nombre AS Ciudad, COM.id_ciudad,
                    PAI.nombre AS Pais, CIU.id_paises , REG.nombre AS Region, PAI.id_region
                    FROM companias COM
                    INNER JOIN ciudades CIU ON CIU.id = COM.id_ciudad
                    INNER JOIN paises PAI ON PAI.id = CIU.id_paises
                    INNER JOIN regiones REG ON REG.id = PAI.id_region;`,
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
    console.log(req.body);
    let {nombre,direccion,email,telefono,id_ciudad} = req.body;
    console.log(nombre, direccion, email, telefono, id_ciudad)
    conexion.query("INSERT INTO `companias` (`nombre`,`direccion`,`email`,`telefono`,`id_ciudad`) VALUES (?,?,?,?,?);",
    {
        replacements: [nombre,direccion,email,telefono,id_ciudad],
        type: conexion.QueryTypes.INSERT
    }).then(result => {
        console.log(result)
        res.status(200).json("Se ha añadido la compania con id: " + result[0]);
    }).catch(err => {
        console.log(err)
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
    conexion.query(`DELETE from companias WHERE id=${id};`,
        {
            type: conexion.QueryTypes.UPDATE
        }).then(result => {
            result[1] === 0 ? res.status(400).json("los parametros enviados para eliminar no son correctos, ninguna compañía se eliminó") :
            res.status(200).json("La compañía con id: "+id+" fue ELIMINADA correctamente");
        }).catch(err => {
            res.status(500).json(err);
        });
    
}

module.exports = {
    listarCompanias,
    listarCompaniaID,
    crearCompania,
    editarCompania,
    eliminarCompania
}
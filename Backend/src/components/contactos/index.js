const router = require('express').Router();
const { validarToken } = require('../../middlewares/token/jwt');
const { 
    listarContactos,
    listarContactoID,
    crearContacto,
    crearCanalContacto,
    editarContacto,
    eliminarContacto
} = require('./controller');

router.get('/', validarToken, listarContactos);
router.get('/contacto/:id', validarToken, listarContactoID);
router.post('/nuevo-contacto', validarToken, crearContacto);
router.put('/contacto', validarToken, editarContacto);
router.delete('/contacto/:id/confirm-delete', validarToken, eliminarContacto);

router.post('/canal-contacto', validarToken, crearCanalContacto);


module.exports = router;
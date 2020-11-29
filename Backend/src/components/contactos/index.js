const router = require('express').Router();
const { validarToken } = require('../../middlewares/token/jwt');
const { 
    listarContactos,
    listarContactoID,
    crearContacto,
    editarContacto,
    eliminarContacto
} = require('./controller');

router.get('/', validarToken, listarContactos);
router.get('/producto/:id', validarToken, listarContactoID);
router.post('/nuevo-producto', validarToken, crearContacto);
router.put('/producto', validarToken, editarContacto);
router.delete('/producto/:id/confirm-delete', validarToken, eliminarContacto);


module.exports = router;
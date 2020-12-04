const router = require('express').Router();
const { validarToken } = require('../../middlewares/token/jwt');
const { 
    autenticarUsuario,
    registrarUsuario,
    listarUsuarios,
    actualizarUsuario,
    eliminarUsuario 
} = require('./controller');

router.post('/login', autenticarUsuario);
router.post('/registro', registrarUsuario);
router.get('/listado', validarToken, listarUsuarios);
router.put('/user', validarToken, actualizarUsuario);
router.delete('/user/:id/confirm-delete', validarToken, eliminarUsuario);

module.exports = router;
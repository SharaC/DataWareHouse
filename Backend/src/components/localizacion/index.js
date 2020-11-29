const router = require('express').Router();
const { validarToken } = require('../../middlewares/token/jwt');
const { 
    listarRegiones, listarRegionID, crearRegion, editarRegion, eliminarRegion,
    listarPaises, listarPaisID, crearPais, editarPais, eliminarPais,
    listarCiudades, listarCiudadID, crearCiudad, editarCiudad, eliminarCiudad
} = require('./controller');

router.get('/', validarToken, listarRegiones);
router.get('/producto/:id', validarToken, listarRegionID);
router.post('/nuevo-producto', validarToken, crearRegion);
router.put('/producto', validarToken, editarRegion);
router.delete('/producto/:id/confirm-delete', validarToken, eliminarRegion);

router.get('/', validarToken, listarPaises);
router.get('/producto/:id', validarToken, listarPaisID);
router.post('/nuevo-producto', validarToken, crearPais);
router.put('/producto', validarToken, editarPais);
router.delete('/producto/:id/confirm-delete', validarToken, eliminarPais);

router.get('/', validarToken, listarCiudades);
router.get('/producto/:id', validarToken, listarCiudadID);
router.post('/nuevo-producto', validarToken, crearCiudad);
router.put('/producto', validarToken, editarCiudad);
router.delete('/producto/:id/confirm-delete', validarToken, eliminarCiudad);


module.exports = router;
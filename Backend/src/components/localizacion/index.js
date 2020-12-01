const router = require('express').Router();
const { validarToken } = require('../../middlewares/token/jwt');
const { 
    listarTodo, listarRegiones, listarRegionID, crearRegion, editarRegion, eliminarRegion,
    listarPaises, listarPaisID, crearPais, editarPais, eliminarPais,
    listarCiudades, listarCiudadID, crearCiudad, editarCiudad, eliminarCiudad
} = require('./controller');

router.get('/todo-ciudades', validarToken, listarTodo);

router.get('/regiones', validarToken, listarRegiones);
router.get('/region/:id', validarToken, listarRegionID);
router.post('/nueva-region', validarToken, crearRegion);
router.put('/region', validarToken, editarRegion);
router.delete('/region/:id/confirm-delete', validarToken, eliminarRegion);

router.get('/paises', validarToken, listarPaises);
router.get('/pais/:id', validarToken, listarPaisID);
router.post('/nuevo-pais', validarToken, crearPais);
router.put('/pais', validarToken, editarPais);
router.delete('/pais/:id/confirm-delete', validarToken, eliminarPais);

router.get('/ciudades', validarToken, listarCiudades);
router.get('/ciudades/:id', validarToken, listarCiudadID);
router.post('/nueva-ciudad', validarToken, crearCiudad);
router.put('/ciudad', validarToken, editarCiudad);
router.delete('/ciudad/:id/confirm-delete', validarToken, eliminarCiudad);


module.exports = router;
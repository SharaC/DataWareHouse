const router = require('express').Router();
const { validarToken } = require('../../middlewares/token/jwt');
const { 
    listarCompanias,
    listarCompaniaID,
    crearCompania,
    editarCompania,
    eliminarCompania
} = require('./controller');

router.get('/', validarToken, listarCompanias);
router.get('/producto/:id', validarToken, listarCompaniaID);
router.post('/nuevo-producto', validarToken, crearCompania);
router.put('/producto', validarToken, editarCompania);
router.delete('/producto/:id/confirm-delete', validarToken, eliminarCompania);


module.exports = router;
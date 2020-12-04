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
router.get('/compania/:id', validarToken, listarCompaniaID);
router.post('/nueva-compania', validarToken, crearCompania);
router.put('/compania', validarToken, editarCompania);
router.delete('/compania/:id/confirm-delete', validarToken, eliminarCompania);


module.exports = router;
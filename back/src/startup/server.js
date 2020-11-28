const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const routerProductos = require('../components/contactos');
const routerUsuarios = require('../components/usuarios');
const routerUsuarios = require('../components/companias');
const routerPedidos = require('../components/localizacion');
const routerApiWelcome = require('../components/welcome');


class Server {
    constructor(config) {
        this.config = config;
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());

        this.app.use(helmet.permittedCrossDomainPolicies({permittedPolicies: "by-content-type"}));
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "POST, GET");
            next();
        });

        this.app.use(`${config.apiVersion}/api-ping`, routerApiWelcome);
        this.app.use(`${config.apiVersion}/usuarios`, routerUsuarios);
        this.app.use(`${config.apiVersion}/contactos`, routerProductos);
        this.app.use(`${config.apiVersion}/companias`, routerPedidos);
        this.app.use(`${config.apiVersion}/localizacion`, routerPedidos);
    }

    runServer(){
        this.app.listen(this.config.appPort, () => {
            console.log(`Servidor corriendo en el puerto ${this.config.appPort}`)
        });
    }
        
}

module.exports = Server;
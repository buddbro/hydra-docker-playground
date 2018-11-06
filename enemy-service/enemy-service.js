/**
* @name Enemy
* @summary Enemy Hydra Express service entry point
* @description Returns an angry message to whoever calls it
*/
'use strict';

const version = require('./package.json').version;
const hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra()



let config = require('fwsp-config');

/**
* Load configuration file and initialize hydraExpress app
*/
config.init('./config/config.json')
  .then(() => {
    config.version = version;
    return hydraExpress.init(config.getObject(), version, () => {
      hydraExpress.registerRoutes({
        '/v1/enemy': require('./routes/enemy-v1-routes')
      });
    });
  })
  .then(serviceInfo => {
    console.log('serviceInfo', serviceInfo)

    hydra.on('message', (message) => {
      console.log('message reply', message)
    })

    let message = hydra.createUMFMessage({
      to: 'hello:/',
      frm: 'enemy-service:/',
      bdy: {}
    })
  
    hydra.sendMessage(message)
  })
  .catch(err => console.log('err', err))
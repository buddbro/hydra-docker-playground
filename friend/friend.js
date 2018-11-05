var hydraExpress = require('hydra-express')
var config = require('./config.json')
var hydra = hydraExpress.getHydra()

config.hydra.serviceName = 'friend'
config.hydra.servicePort = 3001



hydraExpress.init(config, () => {})
    .then((serviceInfo) => {
        console.log('serviceInfo', serviceInfo)

        hydra.on('message', (message) => {
            console.log('message reply', message)
        })

        let message = hydra.createUMFMessage({
            to: 'hello:/',
            frm: 'friend:/',
            bdy: {}
        })
        
        hydra.sendMessage(message)
    })
    .catch(err => console.log('Error', err))
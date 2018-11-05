var hydraExpress = require('hydra-express')
var config = require('./config.json')
var hydra = hydraExpress.getHydra()

console.log("Hello world I am alive apperantly")

hydraExpress.init(config, () => {})
    .then((serviceInfo) => {
        console.log('serviceInfo', serviceInfo)
        hydra.on('message', (message) => {
            let messageReply = hydra.createUMFMessage({
                to: message.frm,
                frm: 'hello:/',
                bdy: {
                    msg: `Hello from ${hydra.getServiceName()} - ${hydra.getInstanceID()}`
                }
            })
            hydra.sendMessage(messageReply);
        })
        return 0;
    })
    .catch(err => {
        console.log('Error', err)
    })
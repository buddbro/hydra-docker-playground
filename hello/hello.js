var hydraExpress = require('hydra-express')
var config = require('./config.json')
var hydra = hydraExpress.getHydra()

console.log("Hello world I am alive apperantly")

hydraExpress.init(config, () => {})
    .then((serviceInfo) => {
        console.log('serviceInfo', serviceInfo)
        hydra.on('message', (message) => {
            console.log('message reply', message)

            let messageReply = hydra.createUMFMessage({
                to: message.frm,
                frm: 'hello:/',
                bdy: {
                    msg: generateResponse(message.frm)
                }
            })
            hydra.sendMessage(messageReply);
        })
        return 0;
    })
    .catch(err => {
        console.log('Error', err)
    })

function generateResponse(from) {
    switch(from) {
        case 'friend:/':
            return `Hello my friend.`
        case 'enemy-service:/':
            return `You shall not pass!`
        default:
            return `Howdy stranger!`
    }
}
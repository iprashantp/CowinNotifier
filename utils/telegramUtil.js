import request from 'request'
import constLib from '../constants/constants.js'


var sendMessage = message => {
    var url = `${constLib.constants.telegramReqURL}${message}`
    request.get(url, (error, response, body) => {
        if(error){
            console.log('error sending telegram message')
        }
    });
}

export default {
    sendMessage
}
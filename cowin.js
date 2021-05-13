import request from "request";
import sound from 'sound-play'
import constLib from './constants.js'
import sendMail from './mailer.js'

var callCowin = () => {
    var currentDate = new Date();
    var currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
    // console.log(`url1: ${constLib.constants.cowinUrl1}\n${constLib.constants.cowinUrl2}`)
    console.log(`${currentTime} :\tfinding slots...`)
    request(constLib.constants.cowinUrl1, function (error, response, body) {
        handleResponse(error, response, body, constLib.constants.pin1, currentTime);
    });
    request(constLib.constants.cowinUrl2, function (error, response, body) {
        handleResponse(error, response, body, constLib.constants.pin2, currentTime);
    });
}

var handleResponse = (error, response, body, pin, currentTime) => {
    if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        getAvailableSlots(data.centers, currentTime, pin)
    } else if (!error) { //error
        console.log(`${currentTime} :\t${response.statusCode}:${response.statusMessage}`)
    } else {
        console.log(`${currentTime} :\tpin: ${pin} response ${response}`)
    }
}

var getAvailableSlots = (centers, currentTime, pin) => {
    // mailer.sendMail("test mail")
    //playMusic()
    console.log(`${currentTime} :\tpin: ${pin} checking availability...`)
    centers.forEach(center => {
        var sessions = center.sessions;
        sessions.forEach(session => {
            if (session.available_capacity > 0 && session.min_age_limit == 18) {
                var message = `${currentTime} :\t${center.fee_type} ##SLOTS AVAILABLE## in ${center.name} pin:${center.pincode} on ${session.date}, vaccine:${session.vaccine}`
                console.log(message)
                sendMail(message)
                playMusic()
            }
        });
    });
}

var playMusic = () =>{
sound.play('./iphone_original_tone.mp3', function (err) {
    if (err) throw err;
    console.log("Notified for Available slots");
});
}

export default {
    callCowin
}
import request from "request";
import sound from 'sound-play'
import constLib from '../constants/constants.js'
import mailUtil from '../utils/mailUtil.js'
import dateUtil from '../utils/dateUtil.js'

var callCowin = () => {
    var currentDate = dateUtil.getDate()
    var currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
    console.log(`\n${currentTime} :\tFinding slots(on/after ${constLib.constants.date})...`)

    for (let [pin, url] of constLib.constants.pinUrlMap) {
        request(url, (error, response, body) => {
            handleResponse(error, response, body, pin, currentTime);
        });
    }
}

var handleResponse = (error, response, body, pin, currentTime) => {
    if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        getAvailableSlots(data.centers, currentTime, pin)
    } else if (!error) { //error
        console.log(`${currentTime} :\tpin: ${pin} ${response.statusCode}: ${response.statusMessage}`)
    } else {
        console.log(`${currentTime} :\tpin: ${pin} response ${response}`)
    }
}

var getAvailableSlots = (centers, currentTime, pin) => {
    var available = false;
    //mailUtil.sendMail("test mail")
    //sound.playMusic()
    var location = ''
    var block = ''
    centers.forEach(center => {
        var sessions = center.sessions;
        location = location === '' ? `[${center.state_name}, ${center.district_name}] ` : location
        block = `(${center.block_name}) `
        sessions.forEach(session => {
            if (session.available_capacity > 0 && session.min_age_limit == 18) {
                available = true
                var message = `${currentTime} :\t${center.fee_type} ##SLOTS_AVAILABLE## in ${center.name} ${location}Pin:${pin}${block} on ${session.date}, vaccine:${session.vaccine}`
                try {
                    doSlotAvailabilityAction(message)
                } catch (err) {
                    console.log(`${center}\nError:${err}`)
                }
            }
        });
    });
    console.log(available ? '' : `${currentTime} :\tPin:${pin} ${block}${location}| #SLOT_NOT_AVAILABLE#`)
}

var doSlotAvailabilityAction = message => {
    console.log(message)
    playMusic()
    sendMail(message)
}

var sendMail = message => {
    mailUtil.sendMail(message)
}

var playMusic = () => {
    sound.play('./iphone_original_tone.mp3', function (err) {
        if (err) throw err;
        console.log("Notified via music for Available slots");
    });
}

export default {
    callCowin
}
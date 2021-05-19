import request from "request";
import sound from 'sound-play'
import constLib from './constants/constants.js'
import mailUtil from './utils/mailUtil.js'
import dateUtil from './utils/dateUtil.js'
import telegramUtil from './utils/telegramUtil.js'

var callCowin = () => {
    var currentDate = dateUtil.getDate()
    var currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
    console.log(`\n${currentTime} :\tFinding slots(on/after ${constLib.constants.date})...`)

    for (let [pin, url] of constLib.constants.pinUrlMap) {
        // console.log(`requesting ${url}`)
        request.get(url, (error, response, body) => {
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
    // sendMail("test mail")
    // notify()
    // sendTelegramMessage('test message')
    var location = ''
    var block = ''
    var ageSlot = constLib.constants.age == 18?'18-45':'45+'
    centers.forEach(center => {
        var sessions = center.sessions;
        location = location === '' ? `[${center.state_name}, ${center.district_name}] ` : location
        block = `(${center.block_name}) `
        sessions.forEach(session => {
            if (session.min_age_limit == constLib.constants.age && session[`${constLib.constants.doseStr}`] > 0 ) {
                available = true
                var message = `${currentTime} :\t${center.fee_type} ##SLOTS_AVAILABLE##(age:${ageSlot}) in ${center.name} ${location}Pin:${pin}${block} on ${session.date}, vaccine:${session.vaccine}`
                try {
                    // console.log(message)
                    doSlotAvailabilityAction(message)
                } catch (err) {
                    console.log(`${center}\nError:${err}`)
                }
            }
        });
    });
    console.log(available ? '' : `${currentTime} :\tPin:${pin} ${block}${location}| #SLOT_NOT_AVAILABLE#(age:${ageSlot})`)
}

var doSlotAvailabilityAction = message => {
    let notification = constLib.constants.notifications;
    console.log(message)
    if (notification.systemnotification) notify()
    if (notification.telegram) sendTelegramMessage(message)
    if (notification.email) sendMail(message)
}

var sendTelegramMessage = message => {
    let msg = message.replace(/#/g, "")
    telegramUtil.sendMessage(msg)
}

var sendMail = message => {
    //Disabled for now
    // mailUtil.sendMail(message)
}

var notify = () => {
    sound.play('./resources/iphone_original_tone.mp3', function (err) {
        if (err) throw err;
        console.log("Notified via music for Available slots")
    })
    .catch(err=>{
        console.log(`error: ${err}`)
    })
}

export default {
    callCowin
}

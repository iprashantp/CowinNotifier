import PropertiesReader from 'properties-reader';
import dateUtil from '../utils/dateUtil.js'

const prop = PropertiesReader('./resources/cowin.ini');
var constants = {}
var getUrl = (pin, date) => `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`
var getPin = pins => pins.toString().split(",")

var getPinUrlMap = (pins, date) => {
    var pinUrlMap = new Map()
    pins.forEach(pin => {
        pinUrlMap.set(pin, getUrl(pin, date))
    })
    return pinUrlMap
}
var getAgeSlab = age => {
    if(age >= 45) return 45
    else if(age >= 18) return 18
    return 0
}
var getNotificationTypes = notificationType => {
    var notifications = {
        telegram : false,
        systemnotification : false,
        email : false
    }
    let notificationTypes = notificationType.toString().split(",")
    notificationTypes.forEach( notification => {
        switch(notification){
            case '1':
                notifications.telegram = true;
                break;
            case '2':
                notifications.systemnotification = true;
                break;
            case '3':
                notifications.email = true;
                break;
        }
    })
    return notifications;
}
var initConstants = () => {
    constants.host = 'smtp.gmail.com'
    constants.port = '465'
    constants.service = 'gmail'
    constants.name = prop.get('main.name')
    constants.pinUrlMap = getPinUrlMap(getPin(prop.get('main.pin')), dateUtil.getDateInFormat());
    constants.date = dateUtil.getDateInFormat()
    constants.mailId = prop.get('main.mailId')
    constants.password = prop.get('main.password')
    constants.doseStr = `available_capacity_dose${prop.get('main.dose')}`
    constants.age = getAgeSlab(`${prop.get('main.age')}`)
    constants.mobileNo = prop.get('main.mobileNo')
    constants.updateInterval = prop.get('main.updateInterval')
    constants.notifications = getNotificationTypes(prop.get('main.notifications'))
    //telegram
    constants.telegrambaseurl = 'https://api.telegram.org/bot'
    constants.telegramtoken = prop.get('telegram.token')
    constants.telegramgroup = prop.get('telegram.group')
    constants.telegramReqURL = `https://api.telegram.org/bot${prop.get('telegram.token')}/sendMessage?chat_id=${prop.get('telegram.group')}&text=`
}

export default {
    constants,
    initConstants
};
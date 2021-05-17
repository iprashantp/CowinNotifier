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
}

export default {
    constants,
    initConstants
};
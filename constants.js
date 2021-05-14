import PropertiesReader from 'properties-reader';

const prop = PropertiesReader('./cowin.ini');
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
var initConstants = () => {
    constants.host = 'smtp.gmail.com'
    constants.port = '465'
    constants.service = 'gmail'
    constants.name = prop.get('main.name')
    constants.pinUrlMap = getPinUrlMap(getPin(prop.get('main.pin')), prop.get('main.date'));
    constants.date = prop.get('main.date')
    constants.mailId = prop.get('main.mailId')
    constants.password = prop.get('main.password')
    // console.log(`${constants.pin1},${constants.pin2},${constants.date},${constants.mailId},${constants.password},\n${constants.cowinUrl1},\n${constants.cowinUrl2}`)
}

export default {
    constants,
    initConstants
};
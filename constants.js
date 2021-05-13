import PropertiesReader from 'properties-reader';
const prop = PropertiesReader('./cowin.ini');


var constants = {}

var getUrl = (pin, date) => `https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode=${pin}&date=${date}`
var getPin = pins => pins.split(",")


var initConstants = () => {
    constants.host = 'smtp.gmail.com'
    constants.port = '465'
    constants.service = 'gmail'
    constants.name = prop.get('main.name')
    constants.pin1 = prop.get('main.pin1')
    constants.pin2 = prop.get('main.pin2')
    constants.date = prop.get('main.date')
    constants.mailId = prop.get('main.mailId')
    constants.password = prop.get('main.password')
    constants.cowinUrl1 = getUrl(prop.get('main.pin1'), prop.get('main.date'))
    constants.cowinUrl2 = getUrl(prop.get('main.pin2'), prop.get('main.date'))
    // console.log(`${constants.pin1},${constants.pin2},${constants.date},${constants.mailId},${constants.password},\n${constants.cowinUrl1},\n${constants.cowinUrl2}`)
}

export default {
    constants,
    initConstants
};
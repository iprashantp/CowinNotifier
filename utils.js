var getDate = () => {
    return new Date();
}

var getDateInFormat = () =>{
    let date = getDate()
    let day,month,year
    day = date.getDate()
    month = 1+date.getMonth()
    year = date.getFullYear()

    day = day<10?`0${day}`:day;
    month = month<10?`0${month}`:month
    return `${day}-${month}-${year}`
}

export default {
    getDate,
    getDateInFormat
}
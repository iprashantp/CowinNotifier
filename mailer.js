import nodemailer from 'nodemailer'
import constLib from './constants.js'

const transporter = nodemailer.createTransport({
    service: constLib.constants.service,
    secure: true,
    ignoreTLS: true,
    // logger: true,
    // debug: true,
    secureConnection: false,
    port: constLib.constants.port, // true for 465, false for other ports
    host: constLib.constants.host,
    auth: {
        user: constLib.constants.mailId,
        pass: constLib.constants.password,
    },
    tls: {
        rejectUnAuthorized: true
    }
});

const sendMail = function (message) {
    console.log(message)
    transporter.sendMail(mailDataBuilder(message), function (err, info) {
        if (err)
            console.log(`error sending mail: ${err}`)
        else
            console.log(info);
    });
}

var mailDataBuilder = function (message) {
    var mailData = {
        from: `${constLib.constants.mailId}`,
        to: constLib.constants.mailId,
        subject: 'Slots available from node.js',
        text: `available slots: ${message}`
    }
    return mailData;
}

export default {
    sendMail
};
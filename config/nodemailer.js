

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport ({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "patitasconectadas9@gmail.com",
        pass: "dxdr pubv ttgi nuul"
    }
});

module.exports = transporter;
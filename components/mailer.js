const SMTP_CONFIG = {
	service: "gmail",
	auth: {
		user: 'nodejs145@gmail.com',
		pass: '0pIh?I$z'
	}
};

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport(SMTP_CONFIG);

function sendMail(options, callback) {
	transporter.sendMail(options, callback);
}

exports.sendMail = sendMail; 
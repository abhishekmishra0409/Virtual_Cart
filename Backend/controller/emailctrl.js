const nodemailer = require('nodemailer');
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASS,
        },
    });

    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Forgot Password" <abc@gmail.com.com>', // sender address
            to: data.to, // list of receivers
            subject: data.subject, // Subject line
            text: data.text, // plain text body
            html: data.htm, // html body
        });

        console.log("Message sent: %s", info.messageId);
    }

    // Call the main function
    await main();
});

module.exports = { sendEmail };

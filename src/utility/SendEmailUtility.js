// require('dotenv').config();
// const nodemailer = require('nodemailer');

// const SendEmailUtility= async (EmailTo, EmailText) => {


//         //transporter
//         let transporter = await nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 465,
//             secure: true, // true for 465, false for other ports //587,
//             auth: {
//                 user: process.env.SMTP_USERNAME,
//                 pass: process.env.SMTP_PASSWORD
//             },
//         })

	
	
//        let mailOptions = {
//            from: `Diagnostics Center ${process.env.SMTP_FROM}`, //sender email address//smtp-username
//            to: EmailTo, //receiver email address
//            subject: "Diagnostics Center",
//            html: `
//              <p>Your Verification Code is: <span style="font-size: 16px; font-weight: bold;">${EmailText}</span>
//               The code will expire in 10 minutes.</p>`

//        };


// 	    return await transporter.sendMail(mailOptions);

// }
// module.exports=SendEmailUtility

var nodemailer = require('nodemailer');

exports.sendOTP = (otp, email) =>{ 
const transporter = nodemailer.createTransport(process.email);
var mailOptions = {
    from: 'youremail@gmail.com',
    to: email,
    subject: 'One time Password for the Authentication',
    html: '<h1>This is the new one time password for the website</h1>' +
           '<p>' + otp + '</p>'
    };
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return {
        result : false,
        error:error
    };
    } 
    else {
    return {
        result : true,
        };
        }   
    });
}
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
module.exports = class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
        service: 'Gmail', // true for 465, false for other ports
        auth: {
            user: "timelytu@gmail.com", // generated ethereal user
            pass: "TimelyTest1031" // generated ethereal password
        }
    });
  }

  accountCreationMail(email){
    console.log('sending mail');
    let mailOptions = {
        from: "timelytu@gmail.com", // sender address
        to: email, // list of receivers
        subject: 'Created account', // Subject line
        html: '<b>Thank you for creating an account with Timely!\n'
              +'If this was not you, sucks cause we don\'t have this implemented</b>' // html body
    };
    console.log(mailOptions);
    // send mail with defined transport object
    this.transporter.sendMail(mailOptions, (err, info) => {
        if (err)
          console.log(err);
        else
          console.log(info);
    });
  }
}

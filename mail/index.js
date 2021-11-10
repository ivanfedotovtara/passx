const nodemailer = require("nodemailer");

module.exports = {
  sendMailOnRegister: function sendMailOnRegister({ user_email, temp_id }) {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });

    var mailOptions = {
      from: user,
      to: user_email,
      subject: "Sending Email using Node.js",
      text: `Your number is: ${temp_id}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};

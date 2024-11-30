const nodemailer = require("nodemailer");

async function sendNotification(email, taskName) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "niajh.edd@gmail.com",
      pass: process.env.APP_PASS,
    },
  });

  const mailOptions = {
    from: "niajh.edd@gmail.com",
    to: email,
    subject: "Overdue Task Notification",
    text: `The task "${taskName}" is overdue. Please take action.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
}

module.exports = sendNotification;

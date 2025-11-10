const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendNotification = async (data) => {
  const { email, subject, message } = data;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject || 'Notification',
    text: message || 'Hello, this is a notification from Kafka-based service.',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📨 Email sent to', email);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
};

module.exports = { sendNotification };



const nodemailer = require('nodemailer');

const sendEmail = async ({ name, email, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL, // Sender's email address
    to: process.env.RECEIVER_EMAIL, // Receiver's email address
    subject: `Message from ${name}`, // Subject of the email
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Body of the email
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Failed to send email.");
  }
};

module.exports = sendEmail;

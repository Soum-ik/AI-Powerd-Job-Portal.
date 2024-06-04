import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (EmailText, EmailSubject, EmailTo) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${EmailTo}`,
    subject: `${EmailSubject}`,
    text: `${EmailText}`,
  }; 
  try {
    const info = await transporter.sendMail(mailOptions); 
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;

const nodemailer = require('nodemailer');
const { db, createId } = require('../store/memoryStore');

const sendContactMessage = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('Name, email, subject, and message are required.');
  }

  const savedMessage = {
    id: createId('msg'),
    name,
    email,
    phone: phone || '',
    subject,
    message,
    createdAt: new Date().toISOString(),
  };

  db.messages.unshift(savedMessage);

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_RECEIVER || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Robotics enquiry: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\n\n${message}`,
    });
  }

  res.status(201).json({ message: 'Message received.', contact: savedMessage });
};

module.exports = { sendContactMessage };

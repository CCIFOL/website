const nodemailer = require('nodemailer');

const emailMap = {
  general: 'theccifountainoflife@gmail.com',
  prayer: 'prayer@ccifountainoflife.org',
  testimony: 'testimony@ccifountainoflife.org',
  media: 'media@ccifountainoflife.org',
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendMessage = async (req, res) => {
  const { name, email, phone, type, message } = req.body;

  if (!name || !email || !type || !message) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  const toEmail = emailMap[type];
  if (!toEmail) return res.status(400).json({ error: 'Invalid message type.' });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: toEmail,
      subject: `New ${type} message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not Provided'}
        Type: ${type}
        Message: ${message}
      `,
    });

    res.status(200).json({ message: 'Your message has been sent successfully.' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
};

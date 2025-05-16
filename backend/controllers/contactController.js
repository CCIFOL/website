const nodemailer = require('nodemailer');

const departmentEmails = {
  general: 'kinyi9461@gmail.com',
  prayer: 'prayer@ccifountainoflife.org',
  testimony: 'testimony@ccifountainoflife.org',
  media: 'media@ccifountainoflife.org',
};

exports.sendMessage = async (req, res) => {
  const { name, email, phone, type, message } = req.body;
console.log("i ,,,,,,,,,,,,,,,,n")
  if (!name || !email || !message || !type) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const to = departmentEmails[type] || departmentEmails.general;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to,
      subject: `New ${type} message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message.' });
    console.log(err.message)
  }
};

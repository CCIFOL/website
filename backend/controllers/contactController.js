const nodemailer = require('nodemailer');

const departmentEmails = {
  general: 'info@ccifountainoflife.org',
  prayer: 'prayer@ccifountainoflife.org',
  testimony: 'testimony@ccifountainoflife.org',
  media: 'media@ccifountainoflife.org',
};

exports.sendMessage = async (req, res) => {
  const { name, email, phone, type, message } = req.body;
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

    const styledHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f9ff; padding: 20px; border-radius: 8px;">
        <div style="background-color: #004aad; color: white; padding: 15px; border-radius: 6px 6px 0 0;">
          <h2 style="margin: 0;">New ${type.charAt(0).toUpperCase() + type.slice(1)} Message</h2>
        </div>
        <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 6px 6px;">
          <p><strong style="color: #004aad;">Name:</strong> ${name}</p>
          <p><strong style="color: #004aad;">Email:</strong> ${email}</p>
          <p><strong style="color: #004aad;">Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong style="color: #004aad;">Message:</strong><br/>${message}</p>
        </div>
        <p style="font-size: 12px; color: #666; text-align: center; margin-top: 30px;">
          © ${new Date().getFullYear()} CCI Fountain of Life Church
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to,
      subject: `New ${type} message from ${name}`,
      html: styledHtml,
    });

    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message.' });
    console.log(err.message);
  }
};

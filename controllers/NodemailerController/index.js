const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
    }
});
// Middleware to create data for request body



// Function to send an email
exports.sendEmail = async (req, res) => {
    const { subject, email, name, message,phone } = req.body;
    console.log(subject, email, name, message, "req.body");

    const mailOptions = {
        from: email,
        to: 'naman13399@gmail.com',
        subject: subject,
        text: message,
        html: `
            <h1>New Message from ${name}</h1>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const express = require('express');
const router = express.Router();
const { sendEmail } = require('../../controllers/NodemailerController/index');

// Route to send an email
router.post('/send', sendEmail);

module.exports = router;

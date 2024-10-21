const express = require('express');
const router = express.Router();
const AdminController = require('../../controllers/adminController');

// Login route for admin
router.post('/login', AdminController.loginAdmin);

module.exports = router; // Exporting the router

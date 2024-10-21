const Admin = require('../../models/adminModel/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new admin (sign up)
exports.loginAdmin = async (req, res) => {
    try {
        const { password, email } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        
        if (existingAdmin) {
            const isMatch = await bcrypt.compare(password, existingAdmin.password);
            if (isMatch) {
                const token = jwt.sign({ id: existingAdmin._id }, JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ message: 'Admin logged in successfully', token });
            } else {
                return res.status(401).json({ message: 'Invalid password OR email' });
            }
        } else {
            return res.status(401).json({ message: 'Invalid password OR email' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Middleware to verify admin token
exports.verifyAdminToken = (req, res, next) => {
    console.log(req.headers.authorization)
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


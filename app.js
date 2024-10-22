const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectRoutes = require('./routers/projectRoutes/index'); // Import project routes
const adminRoutes = require('./routers/admin/index'); // Import admin routes
const mongoose = require('mongoose');
const path = require('path'); // Added path import
const fs = require('fs'); // Import fs for file system operations
const formidableMiddleware = require('express-formidable');
require('dotenv').config();
const emailRoutes = require('./routers/email'); // Import email routes

const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully');
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// API routes
app.use('/api/projects', projectRoutes); // Use project routes under /api/projects
app.use('/api/admin', adminRoutes); // Use admin routes under /api/admin
app.use('/uploads', express.static(uploadsDir)); // Fixed path for static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Fixed path for static files
app.use('/api/email', emailRoutes); // Use email routes under /api/email
// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

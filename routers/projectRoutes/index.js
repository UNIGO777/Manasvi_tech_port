const express = require('express');
const multer = require('multer');
const path = require('path');
const ProjectController = require('../../controllers/projectController');
const fs = require('fs');
// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const { verifyAdminToken } = require('../../controllers/adminController');
// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Use the uploadsDir variable for the destination
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000000 }, // 1MB file size limit per file
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|bmp|tiff|tif|webp|heic|heif|svg|ico|raw|jfif|exif|dng|cr2|nef|orf|arw|3fr|rw2|pef|srw|x3f|kdc|dcr|erf|mef|mos|ptx|pxn|r3d|rwl|srf|sraw|sraw2|mp4|avi|mov|wmv|flv|mkv|webm|mpeg|mpg|3gp|m4v|f4v|rm|rmvb|vob|ts|divx|xvid/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Error: Invalid file type!'));
    }
  },
});

// Express Router setup
const router = express.Router();

// Routes
router.get('/',  ProjectController.getAllProjects);

router.post('/create-project', verifyAdminToken, upload.fields([
  { name: 'demoVideo', maxCount: 1 },
  { name: 'mainImage', maxCount: 1 },
  { name: 'subMainImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), ProjectController.createProject);

router.get('/getProjectById/:id', ProjectController.getProjectById);
router.put('/updateProject/:id', verifyAdminToken, upload.fields([
  { name: 'demoVideo', maxCount: 1 },
  { name: 'mainImage', maxCount: 1 },
  { name: 'subMainImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), ProjectController.updateProject);
router.delete('/deleteProject/:id', verifyAdminToken, ProjectController.deleteProject);

// Exporting the router
module.exports = router;

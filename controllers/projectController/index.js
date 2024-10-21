const Project = require('../../models/projectModel/index');
const multer = require('multer');
const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ message: 'Error: Too many files uploaded!' });
        } else if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'Error: File too large!' });
        }
    }
    next(err);
};

// Create a new project with images
exports.createProject = async (req, res) => {
    try {
        const projectData = req.body;
        const { demoVideo, mainImage, subMainImage, images } = req.files;
        
        const demoVideoPath = demoVideo ?`${demoVideo[0].filename}` : null;
        const mainImagePath = mainImage ? `${mainImage[0].filename}` : null;
        const subMainImagePath = subMainImage ? `${subMainImage[0].filename}` : null;
        const imagesPath = images ? images.map(image => `${image?.filename}`) : [];
        // Store the paths of uploaded images
        const newProject = new Project({
            name: projectData.name,
            description: projectData.description,
            demoLink: projectData.demoLink,
            keyFeatures: projectData.keyFeatures,
            demoVideo: demoVideoPath,
            images: imagesPath,
            mainImage: mainImagePath,
            subMainImage: subMainImagePath,
            techStacks: projectData.techStacks,
            outcome: projectData.outcome,
            projectStatus: projectData.projectStatus,
            projectType: projectData.projectType,
            clientReview: projectData.clientReview,
        });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Middleware for handling image uploads
exports.multerErrorHandler = multerErrorHandler;

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
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Update only the fields that are provided in the request body
        const projectData = req.body;
        if (req.body.name) project.name = req.body.name;
        if (req.body.description) project.description = req.body.description;
        if (req.body.demoLink) project.demoLink = req.body.demoLink;
        if (req.body.keyFeatures) project.keyFeatures = req.body.keyFeatures;
        if (req.body.techStacks) project.techStacks = req.body.techStacks;
        if (req.body.outcome) project.outcome = req.body.outcome;
        if (req.body.projectStatus) project.projectStatus = req.body.projectStatus;
        if (req.body.projectType) project.projectType = req.body.projectType;
        if (req.body.clientReview) project.clientReview = req.body.clientReview;

        // Update file fields if they are provided, otherwise keep the previous values
        const { demoVideo, mainImage, subMainImage, images } = req.files || {};
        if (images && Array.isArray(images) && images.length > 0) {
            project.images = images.map(image => image.filename);
        }
       
        if (demoVideo && demoVideo.length > 0) {
            project.demoVideo = demoVideo[0].filename;
        }
        if (mainImage && mainImage.length > 0) {
            project.mainImage = mainImage[0].filename;
        }
        if (subMainImage && subMainImage.length > 0) {
            project.subMainImage = subMainImage[0].filename;
        }

        await project.save();
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

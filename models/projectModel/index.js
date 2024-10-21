const mongoose = require('mongoose');

const keyFeatureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { _id: false });

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    demoLink: { type: String, required: true },
    keyFeatures: { type: [keyFeatureSchema], required: true },
    demoVideo: { type: String, required: true },
    images: { type: [{ type: String }], required: true },
    mainImage: { type: String, required: true },
    subMainImage: { type: String, required: true }, 
    outcome: { type: String, required: true },
    techStacks: { type: [{ type: String }], required: true },
    clientReview: { type: String, required: true },
    projectStatus: { type: String, enum: ['ongoing', 'completed'], required: true },
    projectType: { type: String, enum: ['product', 'service'], required: true },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
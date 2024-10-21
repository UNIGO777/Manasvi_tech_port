const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const Admin = require("./models/adminModel"); // Import the Admin model
const Project = require("./models/projectModel"); // Import the Project model

// Connect to MongoDB
mongoose.connect('mongodb+srv://manasvitech01:ManasviPort@cluster0.icrxw.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0/manasvi-portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully for seeding');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Create a new admin user
// const createAdminUser = async () => {
//     try {
//         const hashedPassword = await bcrypt.hash('dharma', 10); // Hash the password with bcrypt

//         const admin = new Admin({
//             email: 'dk8209190@gmail.com', // Replace with desired email
//             password: hashedPassword  // Use the hashed password
//         });

//         await admin.save();
//         console.log('Admin user created successfully');
//     } catch (error) {
//         console.error('Error creating admin user:', error);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// // Run the seeder

// createAdminUser();

// Update all demoLinks in Project model
const updateDemoLinks = async () => {
    try {
        const projects = await Project.find();
        for (let project of projects) {


                let parts = project.demoLink.split('-');
                // project.demoLink = `http://localhost:5000/uploads-${parts[1]}`; // Add localhost:5000 to the demo link
           project.demoLink = `/uploads/${parts[1]}`;

            // const demoLink = project.demoLink;
            // console.log(demoLink.slice(-7));
            // const newDemoLink = `/uploads/${(demoLink).slice(-16)}`;
            // console.log(newDemoLink);
            // project.demoLink = newDemoLink;

            await project.save();
        }
        console.log('Demo links updated successfully');
    } catch (error) {
        console.error('Error updating demo links:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the seeder
updateDemoLinks();


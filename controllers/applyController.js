const Apply = require('../models/apply'); // Ensure the path to your Apply model is correct

// Controller function to handle the POST request
const applyPost = async (req, res) => {
    const { email, roll, name, contact, drive } = req.body;

    try {
        // Create a new application entry using the Apply model
        const newApplication = new Apply({
            email,
            roll,
            name,
            contact,
            drive
        });

        // Save the application in the database
        const savedApplication = await newApplication.save();

        // Send back a success response
        res.status(201).json({ user: savedApplication });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to apply' });
    }
};
const viewAllApplications = async (req, res) => {
    try {
        const applications = await Apply.find();
        res.status(200).json(applications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve applications' });
    }
};

module.exports = {
    applyPost,
    viewAllApplications
};

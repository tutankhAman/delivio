const express = require('express');
const cloudinary = require('cloudinary').v2; // Import Cloudinary
const fileUpload = require('express-fileupload'); // Ensure you have this middleware
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET   // Your Cloudinary API secret
});

// Route for file upload
router.post('/upload', async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).send('No files were uploaded or incorrect key.');
    }

    const uploadedFile = req.files.file;

    try {
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(uploadedFile.tempFilePath, {
            folder: 'uploads' // Optional: specify a folder in Cloudinary
        });

        // Return the public_id and URL
        res.json({
            public_id: result.public_id,
            url: result.secure_url
        });
    } catch (err) {
        console.error('UploadThing Error:', err); // Log the entire error object
        return res.status(err.response ? err.response.status : 500).send(err.response ? err.response.data : 'Internal Server Error');
    }
});

module.exports = router;


const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const sharp = require('sharp'); // For image compression

// Initialize Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'dds3adzjq',
    api_key: '551798746762666',
    api_secret: 'SRwqr4qSHEmCJ7aHUmcsCLQx5Z4'
});

// Ensure 'uploads' and 'outputs' directories exist
const ensureDirectoryExistence = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log(`Created directory: ${dir}`);
    }
};

ensureDirectoryExistence('uploads');
ensureDirectoryExistence('outputs');

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Endpoint to handle image uploads and processing
app.post('/api/upload', upload.array('files', 10), async (req, res) => {
    try {
        console.log('Request received at /api/upload');

        // Check if files are uploaded
        if (!req.files || req.files.length === 0) {
            console.error('No files uploaded');
            return res.status(400).json({ error: 'No files uploaded.' });
        }

        const files = req.files.map(file => file.path);

        // Process each file with the rust detection script
        const outputFiles = await Promise.all(files.map(filePath => {
            return new Promise((resolve, reject) => {
                const outputFilePath = `outputs/output-${Date.now()}-${path.basename(filePath)}`;
                
                exec(`python rust_detect.py ${filePath} ${outputFilePath}`, async (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error executing Python script: ${error.message}`);
                        return reject(error);
                    }

                    console.log(`Python script output: ${stdout}`);
                    
                    // Compress the image before uploading
                    const compressedOutputPath = `outputs/compressed-${path.basename(outputFilePath)}`;
                    await sharp(outputFilePath)
                        .resize({ width: 1024 })  // Example resizing
                        .toFile(compressedOutputPath);
                        
                    resolve(compressedOutputPath);
                });
            });
        }));

        // Cloudinary upload options with timeout
        const cloudinaryOptions = {
            timeout: 120000  // 2 minutes
        };

        // Optionally, upload processed images to Cloudinary
        const urls = await Promise.all(outputFiles.map(async (outputFile) => {
            try {
                const result = await cloudinary.uploader.upload(outputFile, cloudinaryOptions);
                return result.secure_url;
            } catch (err) {
                console.error(`Error uploading to Cloudinary: ${err.message}`);
                throw err;
            }
        }));

        // Send back the URLs of the processed images
        res.json({ urls });

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Failed to process images' });
    }
});

// Serve static files for uploaded images
app.use('/uploads', express.static('uploads'));

// Basic test route to check if the server is running
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set public folder for uploaded files
app.use(express.static('public'));

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: 'public/',
  filename: (req, file, cb) => {
    // Save file with original name
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('htmlfile'), (req, res) => {
  const filename = req.file.originalname;
  res.send(`
    <h2>Uploaded!</h2>
    <p>Your file is live at:</p>
    <a href="/${filename}" target="_blank">zappyhosting.vercel.app/${filename}</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

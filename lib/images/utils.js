const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const storage = multer.memoryStorage();

const upload = multer({ storage });

const optimizeAndSaveImage = async (fileBuffer, filename) => {
  const outputPath = path.join(__dirname, '../../public/uploads', filename);

  try {
    await sharp(fileBuffer)
      .resize(800)
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Image optimization failed');
  }
};

module.exports = {
  upload,
  optimizeAndSaveImage,
};
const path = require('path');
const sharp = require('sharp');

const optimizeAndSaveImage = async (fileBuffer, filename, mimetype) => {
  const outputPath = path.join(__dirname, '../../public/uploads', filename);

  try {
    const image = sharp(fileBuffer);

    if (mimetype === 'image/jpeg' || mimetype === 'image/jpg') {
      await image.resize(800).jpeg({ quality: 80 }).toFile(outputPath);
    } else if (mimetype === 'image/png') {
      await image.resize(800).png({ compressionLevel: 9 }).toFile(outputPath);
    } else if (mimetype === 'image/webp') {
      await image.resize(800).webp({ quality: 80 }).toFile(outputPath);
    } else {
      return null
    }

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

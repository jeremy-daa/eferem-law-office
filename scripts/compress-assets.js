const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (/\.(png|jpg|jpeg)$/i.test(file)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

async function compressRemaining() {
  const imagesDir = path.join(__dirname, "../public/images");
  const allImages = getAllFiles(imagesDir);

  for (const imgPath of allImages) {
    const stat = fs.statSync(imgPath);
    if (stat.size > 200000) {
      const tmpPath = imgPath + ".tmp";
      try {
        await sharp(imgPath)
          .resize({ width: 1400, withoutEnlargement: true })
          .jpeg({ quality: 75, progressive: true })
          .toFile(tmpPath);
        
        fs.unlinkSync(imgPath);
        fs.renameSync(tmpPath, imgPath);
        const newStat = fs.statSync(imgPath);
        console.log(`Optimized ${path.basename(imgPath)}: ${Math.round(stat.size/1024)}KB -> ${Math.round(newStat.size/1024)}KB`);
      } catch (err) {
        if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
        console.error(`Error on ${path.basename(imgPath)}:`, err.message);
      }
    }
  }
}

compressRemaining();

const multer = require('multer');
const path = require('path');
const MediaTypeError = require('../../errors/MediaTypeError');

const allowedMimes = ['application/pdf', 'image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
function checkFileExtension(file, callback) {
  if (allowedMimes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new MediaTypeError);
  }
}

const storage = {
    local: multer.diskStorage({
      destination: (req, file, callback) => {
        const uploadFolder =
          path.resolve(__dirname, '..', 'domains', 'products', 'images');
        callback(null, uploadFolder);
      },
      filename: async (req, file, callback) => {
        const extension = path.extname(file.originalname);
        file.id = Date.now() + extension;
        callback(null, file.id);
      },
    }),
  };


const oneMB = 10*1024*1024;

const upload = {
    storage: storage[process.env.STORAGE_TYPE],
    limits: {fileSize: oneMB},
    fileFilter: (req, file, callback) => {
      checkFileExtension(file, callback);
    },
  };

module.exports = upload;

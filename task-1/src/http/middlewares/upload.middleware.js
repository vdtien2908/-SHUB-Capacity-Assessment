const multer = require('multer');

const { storage } = require('../../configs');

const upload = multer({ storage: storage });

module.exports = upload;

const util = require("util");
const multer = require("multer");
const maxSize = 35 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + `/resources/static/assets/uploads/undefined/`);
  },
  filename: (req, file, cb) => {
    global._fileName_ = file.originalname
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

console.log("upload.js")

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
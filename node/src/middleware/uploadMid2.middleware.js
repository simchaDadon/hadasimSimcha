const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

var storage = new GridFsStorage({
    url: "mongodb://localhost:27017/smart",
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware2 = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware2;
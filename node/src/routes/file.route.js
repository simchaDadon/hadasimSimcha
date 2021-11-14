const router = require('express').Router();
const fileController = require('../controller/file.controller')

console.log("user-route")

// files
router.post("/getNumbersLines", fileController.getNumbersLines);
router.post("/getNumbersWords", fileController.getNumbersWords);
router.post("/getSignalWords", fileController.getSignalWords);
router.post("/getLengthAvgSentence", fileController.getLengthAvgSentence);
router.post("/getLengthMaxSentence", fileController.getLengthMaxSentence);
router.post("/getPopularWord", fileController.getPopularWord);
router.post("/getPopularWordNotMeaning", fileController.getPopularWordNotMeaning);
router.post("/getLongSequenceWithoutK", fileController.getLongSequenceWithoutK);
router.post("/getMaxNumber", fileController.getMaxNumber);
router.post("/getCountColors", fileController.getCountColors);

module.exports = router;
const uploadFile = require("../middleware/upload");
const uploadMid2 = require("../middleware/uploadMid2.middleware");
const fs = require('fs')
const replaceAll = require("replaceall");
const { wordsToNumbers } = require('words-to-numbers');

const upload = async (req, res) => {
  console.log("upload files work!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      console.log("Please upload a file!")
      return res.status(400).send({ message: "Please upload a file!" });
    }
    funUploadFile()
  }
  catch (err) {
    console.log({ "err::: ": err })
    console.log("Could not upload the file!!!!!")
    res.status(500).send({ message: `Could not upload the file: ${req.file.originalname}. ${err}` });
  }
};


const funUploadFile = async (req, res) => {
  console.log("funUploadFile")
  try {
    await uploadMid2(req, res);
    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    return res.send(`File has been uploaded.`);
  } catch (error) {
    // console.log(error);
    return res.send(`Error when trying upload file: ${error}`);
  }
};

//1
const getNumbersLines = async (req, res) => {
  console.log("-------------------------------------getNumbersLines")
  await upload(req, res)
  try {
    const data = fs.readFileSync(`./resources/static/assets/uploads/undefined/${_fileName_}`, 'UTF-8');
    let lines = data.split(/\n/).filter(w => w != "")
    console.log("The file has " + lines.length + " lines :)")
    return res.status(200).send({ message: "מספר השורות בטקסט: " + lines.length })
  } catch (err) {
    console.error(err);
  }
}

//2
const getNumbersWords = async (req, res) => {
  console.log("-------------------------------------getNumbersWords")
  await upload(req, res)
  try {
    let data = fs.readFileSync(`./resources/static/assets/uploads/undefined/${_fileName_}`, 'UTF-8');
    data = replaceAll("\n", " ", data);
    let words = data.split(" ").filter(w => w != "")
    console.log("countWord: " + words.length)
    return res.status(200).send({ message: "מספר המילים בטקסט: " + words.length })
  } catch (err) {
    console.error({ "err getNumbersWords ": err });
    return res.status(403).send({ err: err })
  }
}

//3
const getSignalWords = async (req, res) => {
  console.log("-------------------------------------getSignalWords")
  await upload(req, res)
  try {
    let data = fs.readFileSync(`./resources/static/assets/uploads/undefined/${_fileName_}`, 'UTF-8');
    const words = data.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/);
    const contacts = new Map()
    words.forEach((sentence) => {
      if (contacts.has(sentence)) {
        x = contacts.get(sentence)
        contacts.set(sentence, { count: x.count + 1 })
      }
      else {
        contacts.set(sentence, { count: 1 })
      }
    });
    let countUnique = 0
    for (const [key, value] of contacts.entries()) {
      if (value.count == 1)
        countUnique++
    }
    console.log(countUnique)
    return res.status(200).send({ message: "מילים יחודיות " + countUnique })
  } catch (err) {
    console.error(err);
    return res.status(403).send({ err: err })
  }
}

//4 -a
const getLengthAvgSentence = async (req, res) => {
  console.log("-------------------------------------getLengthAvgSentence")
  await upload(req, res)
  try {
    let data = fs.readFileSync(`./resources/static/assets/uploads/undefined/${_fileName_}`, 'UTF-8');
    data = replaceAll("\n", " ", data);
    data = replaceAll("-", " ", data);
    data = replaceAll(",", " ", data);
    data = replaceAll("  ", " ", data);
    let sentences = data.split(/[.?!\r\n/]+/)
    let sumLengthSentences = 0
    sentences = sentences.filter(s => sumLengthSentences += s.split(" ").length)
    console.log("sumLengthSentences= " + sumLengthSentences)
    console.log("sentences.length= " + sentences.length)
    console.log("avgSentences is= " + sumLengthSentences / sentences.length)
    return res.status(200).send({ message: "ממוצע אורכי המשפטים: " + sumLengthSentences / sentences.length })
  } catch (err) {
    console.error(err);
    return res.status(403).send({ err: err })
  }
}

//4 -b
const getLengthMaxSentence = async (req, res) => {
  console.log("-------------------------------------getLengthMaxSentence")
  await upload(req, res)
  try {
    let data = fs.readFileSync(`./resources/static/assets/uploads/undefined/${_fileName_}`, 'UTF-8');
    data = replaceAll("-", " ", data);
    data = replaceAll(",", " ", data);
    data = replaceAll("  ", " ", data);
    let sentences = data.split(/[.?!/]+/)
    let maxLengthSentence = 0
    let maxStrSentence = 0
    sentences.forEach((sentence) => {
      if (sentence.length > maxLengthSentence) {
        maxLengthSentence = sentence.length
        maxStrSentence = sentence
      }
    });
    console.log("maxLengthSentence is= " + maxLengthSentence)
    console.log("maxStrSentence is= " + maxStrSentence)
    return res.status(200).send({ message: "אורך המשפט המקסימלי: " + maxLengthSentence })
  } catch (err) {
    console.error(err);
    return res.status(403).send({ err: err })
  }
}

//5 -a
const getPopularWord = async (req, res) => {
  console.log("-------------------------------------getPopularWord")
  await upload(req, res)
  try {
    let data = fs.readFileSync(`./resources/static/assets/uploads/undefined/${_fileName_}`, 'UTF-8');
    const words = data.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/);
    const contacts = new Map()
    words.forEach((sentence) => {
      if (contacts.has(sentence)) {
        x = contacts.get(sentence)
        contacts.set(sentence, { count: x.count + 1 })
      }
      else {
        contacts.set(sentence, { count: 1 })
      }
    });
    let popular = ""
    let countPopular = 0
    for (const [key, value] of contacts.entries()) {
      if (value.count > countPopular) {
        popular = key;
        countPopular = value.count
      }
    }
    console.log(popular)
    return res.status(200).send({ message: popular })
  } catch (err) {
    console.error(err);
    return res.status(403).send({ err: err })
  }
}

//5 -b
const getPopularWordNotMeaning = async (req, res) => {
  // console.log("-------------------------------------getPopularWordNotMeaning")
  // await upload(req, res)
  // try {
  // } catch (err) {
  //   console.error({ "err getCountColors ": err });
  //   return res.status(403).send({ err: err })
  // }
}

//6
const getLongSequenceWithoutK = async (req, res) => {
  console.log("-------------------------------------getLongSequenceWithoutK")
  await upload(req, res)
  try {
    let data = fs.readFileSync(`./resources/static/assets/uploads/undefined/${_fileName_}`, 'UTF-8');
    const words = data.split(/[\s\r\n.,;:-?!]+/);
    let maxLengthWithoutK = 0
    let countTempWithoutK = 0
    let maxStr = ""
    let strTemp = ""
    words.forEach((word) => {
      if (!word.includes('k')) {
        countTempWithoutK++
        strTemp += word + " "
      }
      else {
        if (countTempWithoutK > maxLengthWithoutK) {
          maxLengthWithoutK = countTempWithoutK
          maxStr = strTemp
        }
        strTemp = ""
        countTempWithoutK = 0
      }
    });
    console.log("the sentence is: " + maxStr)
    console.log("the count is " + maxLengthWithoutK)
    return res.status(200).send({
      message: maxLengthWithoutK + " מילים-----" + maxStr
    })
  } catch (err) {
    console.error(err);
    return res.status(403).send({ err: err })
  }
}

//7
const getMaxNumber = async (req, res) => {
  console.log("-------------------------------------getMaxNumber")
  await upload(req, res)
  try {
    let data = fs.readFileSync(`./resources/static/assets/uploads/undefined/${_fileName_}`, 'UTF-8');
    data = replaceAll("\n", " ", data);
    const words = data.split(/[\s\r\n.,;:-?!]+/);
    let max = 0
    let strNum = ""
    maxWord = ""
    words.forEach((word) => {
      if (word == "and") {
        strNum += word + " ";
      }
      else {
        if (typeof (wordsToNumbers(word)) == "number") {
          strNum += word + " "
          if (Number(wordsToNumbers(word)) > max) {
            max = parseInt(wordsToNumbers(word))
            console.log("max= " + max + " " + word)
            maxWord = word
          }
          if (Number(wordsToNumbers(strNum)) > max) {
            max = parseInt(wordsToNumbers(strNum))
            console.log("max= " + max + " " + strNum)
            maxWord = strNum
          }
        }
        if (typeof (wordsToNumbers(word)) !== "number") {
          strNum = ""
        }
        if (word.includes('.' || ',')) {
          console.log(word + "include . or ,")
          strNum = ""
        }
      }
    });
    console.log("max number= " + max)
    return res.status(200).send({ message: maxWord + " " + "המספר הגדול ביותר בטקסט הוא: " + max })
  } catch (err) {
    console.error(err);
    return res.status(403).send({ err: err })
  }
}

//8
const getCountColors = async (req, res) => {
  console.log("-------------------------------------getCountColors")
  await upload(req, res)
  try {
    let data = fs.readFileSync(`./resources/static/assets/uploads/undefined/${_fileName_}`, 'UTF-8');
    const words = data.split(' ');
    const arrColors = ['red', 'green', 'blue', 'black', 'white', 'yellow', 'pink',
      'Amaranth', 'Amber', 'Amethyst', 'Apricot', 'Aquamarine', 'Azure', '',
      'Beige', 'red', 'Black', 'Bronze', 'Brown', 'Burgundy', 'Byzantium',
      'Chocolate', 'Coffee', 'Gold', 'Gray', 'Pink', 'Red'
    ];
    const mapAnswerColors = new Map()

    words.forEach((word) => {
      let x = arrColors.indexOf(word)
      if (x != -1) {
        if (mapAnswerColors.has(word)) {
          let c = mapAnswerColors.get(word)
          mapAnswerColors.set(word, { count: c.count + 1 })
        }
        else {
          mapAnswerColors.set(word, { count: 1 })
        }
      }
    });
    let answer = ""
    for (const [key, value] of mapAnswerColors.entries()) {
      console.log(key + " מופיע " + value.count + " פעמים")
      answer += key + " מופיע " + value.count + "פעמים " + " / "
    }
    return res.status(200).send({ message: answer })
  } catch (err) {
    console.error(err);
    return res.status(403).send({ err: err })
  }
}

module.exports = {
  upload,
  getNumbersLines,
  getNumbersWords,
  getSignalWords,
  getLengthAvgSentence,
  getLengthMaxSentence,
  getPopularWord,
  getPopularWordNotMeaning,
  getLongSequenceWithoutK,
  getMaxNumber,
  getCountColors
};
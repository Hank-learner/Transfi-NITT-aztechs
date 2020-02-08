const functions = require("firebase-functions");
const secrets = require("./secrets.json");
const privateKey = secrets.jwt_key;
const config = require("./config.js");
const fs = require('fs')
const path = '../output/rollno_list.txt'

exports.tagger = functions.https.onRequest(async (req, res) => {
  try {
   while(!fs.existsSync(path));
    fs.readFile(path, 'utf8',(err, data) => {
      if(err) return err;
      console.log(data)
    })
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

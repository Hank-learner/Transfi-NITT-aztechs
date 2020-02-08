const functions = require("firebase-functions");
const secrets = require("./secrets.json");
const privateKey = secrets.jwt_key;
const config = require("./config.js");
const pynode = require("@fridgerator/pynode");

exports.tagger = functions.https.onRequest(async (req, res) => {
  try {
    pynode.dlOpen("libpython3.6m.so");

    pynode.startInterpreter();
    pynode.appendSysPath("../");
    pynode.openFile("recog_no_args.py");
    pynode.call("face_detector", (err, res) => {
      if (err) return err;
      res.send(res);
    });
    console.log(x);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

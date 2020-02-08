const functions = require("firebase-functions");
const secrets = require("./secrets.json");
const privateKey = secrets.jwt_key;
const config = require("./config.js");
const jwt = require("jsonwebtoken");
const db = config.db;
const cors = require('cors')({
    origin: true
});

// login for students
exports.studentLogin = functions.https.onRequest(async (req, res) => {
    try {
        return cors(req, res, async () => {
        let { rollno, password } = req.body;
        const ref = await db.ref(`/Students/${rollno}`);
        const snapshot = await ref.once("value");
        let pass = snapshot.val()["password"];
        if(pass == password) {
            let token = jwt.sign(
                { rollno: rollno },
                privateKey
              );
              req.token = token;
              console.log(token);
              res.status(200).send("Login Successful");
        } else {
            res.status(401).send("Login failed");
        }
        });

    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// login for professors
exports.profLogin = functions.https.onRequest(async (req, res) => {
    try {
        return cors(req, res, async () => {
        let { rollno, password } = req.body;
        const ref = await db.ref(`/Professors/${rollno}`);
        const snapshot = await ref.once("value");
        let pass = snapshot.val()["password"];
        if(pass == password) {
            let token = jwt.sign(
                { rollno: rollno },
                privateKey
              );
            req.token = token;
            res.status(200).send("Login Successful");
        } else {
            res.status(401).send("Login failed");
        }
        });

    } catch(err) {
        console.log(err);
        res.status(500).send("Login failed");
    }
});
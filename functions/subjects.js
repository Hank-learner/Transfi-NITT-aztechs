const functions = require("firebase-functions");
const config = require("./config.js");
const db = config.db;
const middleware = require("./middleware.js");

// get subjects handled by prof
exports.getSubjects = functions.https.onRequest(async (req, res) => {
    // return middleware.jwtCheck(req, res, async () => {
        try {
            let rollno = req.query.rollno;
            const ref = await db.ref(`/Professors/${rollno}/subjects`);
            const snapshot = await ref.once("value");
            let arr = [];
            snapshot.forEach(childSnapShot => {
                arr.push(childSnapShot.key);
            });
            console.log(snapshot);
            res.status(200).json(arr);
        } catch(err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    // })
});

//function to get students in a particular subject handled by prof
exports.getClass = functions.https.onRequest(async(req, res) => {
    // return middleware.jwtCheck(req, res, async () => {
        try {
            let { rollno, subject } = req.query;
            const ref = await db.ref(`/Professors/${rollno}/subjects/${subject}`);
            const snapshot = await ref.once("value");
            let arr = [];
            snapshot.forEach(childSnapShot => {
                arr.push(childSnapShot.key);
            });
            res.status(200).json(arr);
        } catch(err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    // })
});


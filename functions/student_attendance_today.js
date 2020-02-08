const functions = require("firebase-functions");
const config = require("./config.js");
const db = config.db;

exports.attendance_today = functions.https.onRequest(async (req, res) => {
    try {
        let rollno = req.query.rollno;
        
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
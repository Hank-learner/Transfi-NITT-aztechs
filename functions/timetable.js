const functions = require("firebase-functions");
const config = require("./config.js");
const db = config.db;
const middleware = require("./middleware.js");
const cors = require('cors')({
    origin: true
});

exports.view_student_timetable = functions.https.onRequest(async (req, res) => {
    // return middleware.jwtCheck(req, res, async () => {
        try {
            return cors(req, res, async () => {
            const roll_no = req.query.roll_no;
            ref = await db.ref(`/Students/${roll_no}/timetable`);
            let snapshot = await ref.once("value");
            if (snapshot)
                res.status(200).json(snapshot);
            else
                res.status(400).send("invalid roll_no");
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal server error");
        }
    // })
})

exports.view_professor_timetable = functions.https.onRequest(async (req, res) => {
    // return middleware.jwtCheck(req, res, async () => {
        try {
            return cors(req, res, async () => {
            const roll_no = req.query.roll_no;
            ref = await db.ref(`/Professors/${roll_no}/timetable`);
            let snapshot = await ref.once("value");
            if (snapshot)
                res.status(200).json(snapshot);
            else
                res.status(400).send("invalid roll_no");
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal server error");
        }
    // })
})
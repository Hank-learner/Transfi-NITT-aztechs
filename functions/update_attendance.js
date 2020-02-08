const functions = require("firebase-functions");
const config = require("./config.js");
const db = config.db;
const middleware = require("./middleware.js");
const fs = require("fs");

//function check_student()
exports.update_attendance = functions.https.onRequest(async (req, res) => {
    // return middleware.jwtCheck(req, res, async () => {
        try {
            let rollno = fs.readFileSync("rollno_list.txt").split(" ");
            let profid = req.body.profid;
            let subject = req.body.subject;
            let date = new Date().toString().slice(0, 15);
            let absent_list = []
            let ref1 = await db.ref(`/Professors/${profid}/subjects/${subject}`);
            let snapshot = await ref1.once("value");
            let d = 0;
            snapshot.forEach(childSnapshot => {
                d = 0;
                for (var i = 0; i < rollno.length; i++) {
                    if (childSnapshot.key == rollno[i])
                        d = 1;
                }
                if (d == 0)
                    absent_list.push(childSnapshot.key);
            })
            console.log(absent_list);
            await Promise.all(
                absent_list.map(async (rollno) => {
                    let ref = await db.ref(`/Professors/${profid}/subjects/${subject}/${rollno}`);
                    let snapshot = await ref.once("value");
                    let per = snapshot.child(`percentage`).val();
                    let total = snapshot.child(`total_class`).val();
                    per *= 0.01;
                    per = (per * total) / (total + 1);
                    per *= 100;
                    total = total + 1;
                    await ref.update({
                        [`percentage`]: per,
                        [`total_classes`]: total
                    });
                    let ref2 = db.ref(`/Students/${rollno}/subjects/${subject}/attendance`);
                    await ref2.update({
                        [`${date}`]: 0
                    });
                    let ref3 = db.ref(`/Students/${rollno}/subjects/${subject}`);
                    await ref3.update({
                        percentage: per,
                        total: total
                    });
                })
            )

            await Promise.all(
                rollno.map(async (item) => {
                    let ref = await db.ref(`/Professors/${profid}/subjects/${subject}/${item}`);
                    let snap = await ref.once("value");
                    let per = snap.child(`percentage`).val();
                    let total = snap.child(`total_classes`).val();
                    per *= 0.01;
                    per = ((per * total) + 1) / (total + 1);
                    per *= 100;
                    total = total + 1;
                    
                    await ref.update({
                        [`percentage`]: per,
                        [`total_classes`]: total
                    });
                    let ref2 = db.ref(`/Students/${item}/subjects/${subject}/attendance`);
                    await ref2.update({
                        [`${date}`]: 1
                    });
                    let ref3 = db.ref(`/Students/${item}/subjects/${subject}`);
                    await ref3.update({
                        percentage: per,
                        total: total
                    });
                })
            )
            res.status(200).send("Updated");
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    // })
})

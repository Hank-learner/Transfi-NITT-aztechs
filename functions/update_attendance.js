const functions = require("firebase-functions");
const config = require("./config.js");
const db = config.db;
const middleware = require("./middleware.js");
const fs = require("fs");
const base64ToImage = require('base64-to-image');

exports.generateImage = functions.https.onRequest(async (req, res) => {
    var path ='../captured/';
    var optionalObj = {'fileName': Date.now().toString(), 'type':'png'};
    base64ToImage(req.body.image,path,optionalObj);
    console.log("Filename:", optionalObj.fileName + "." + optionalObj.type)
    res.redirect("http://localhost:5001/aztech-e3e7f/us-central1/update_attendance");
});

//function check_student()
exports.update_attendance = functions.https.onRequest(async (req, res) => {
    // return middleware.jwtCheck(req, res, async () => {
        try {
                if(fs.existsSync('../output/rollno_list.txt')) fs.unlinkSync('../output/rollno_list.txt');
                 while(!fs.existsSync("../output/rollno_list.txt"));
                let rollno = fs.readFileSync("../output/rollno_list.txt", 'utf8').split(" ");
                console.log(rollno)
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
                    if (d == 0 && childSnapshot.key != "percentage" && childSnapshot.key != "total_classes")
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
                let res_data ={
                    rollno,
                    absent_list
                }
                console.log(res_data)
                res.status(200).send(res_data);
            
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    // })
})

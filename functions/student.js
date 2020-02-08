const functions = require("firebase-functions");
const config = require("./config.js");
const db = config.db;
const jwt = require("jsonwebtoken");
const middleware = require("./middleware.js")

// to get details of students
exports.student_details = functions.https.onRequest(async(req, res) =>{
    // return middleware.jwtCheck(req, res, async () => {
        try {
            const roll_no= req.query.roll_no;
            ref=await db.ref(`/Students/${roll_no}/subjects`);
            let snapshot = await ref.once(`value`);
            if(snapshot)
               res.status(200).json(snapshot);
              
            else
                res.status(400).send("invalid roll_no");
                
            }
        catch(err){
            console.log(err);
            return res.status(500).send("Internal server error");
        }
    // })
})

exports.message_to_prof = functions.https.onRequest(async(req, res)=>{
    // return middleware.jwtCheck(req, res, async () => {
      try{  
        const roll_no= req.body.roll_no;
        const sub= req.body.subject;
        const text = req.body.text;
        let ref1 = await db.ref(`/Students/${roll_no}/${sub}`);
        let date= new Date().slice(0,15);

        let snap= await ref1.once(`value`);
        let prof_no= await snap.child(`prof`).val();
        let ref2= await db.ref(`/Professors/${prof_no}/Messages/${roll_no}`)
        
        
        await ref2.update({
            [`${date}`] : {
                     [`text`]: text,
                     [`status`]:"unread"
            }
        });
        res.status(201).send("MESSAGES updated");
    }
    catch(err){
        console.log(err);
         res.status(500).send("Internal server error");

    }              
  
    // })
})




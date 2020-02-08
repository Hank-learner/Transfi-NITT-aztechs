const functions = require("firebase-functions");
const config = require("./config.js");
const db = config.db;
const jwt = require("jsonwebtoken");
const jwtCheck= require("./middleware.js")


// get all subject percentage of the student 

exports.sub_percentage= functions.https.onRequest(async(req, res) =>{
    return jwtCheck(req, res, async()=>{
        try {const functions = require("firebase-functions");
        const config = require("./config.js");
        const db = config.db;
        
        // get subjects handled by prof
        exports.getSubjects = functions.https.onRequest(async (req, res) => {
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
        });
        
            const roll_no= req.body.roll_no;
            let ref=await db.ref(`/Students/${roll_no}/subjects`);
            let snapshot = await ref.once(`value`);
            if(snapshot.val())
               res.status(200).json({data: snapshot.val()});
              
            else
                res.status(400).json({"response code":-3, message:"invalid roll_no"})
                
            }
        catch(err){
            console.log(err);
            return res.status(500).send("Internal server error");
        }
    })
})

// sending message to the prof

exports.message_to_prof = functions.https.onRequest(async(req, res)=>{
    return jwtCheck(req, res, async()=>{
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
  
    })
})




const express = require('express');
const router = express.Router();
const getConnection = require('../db')
const verifyToken = require('../middleware/verify-token');



// Count number of yes and no
router.get('/assessment_ans', (req,res) => {

    
    const questionQueryString = `SELECT q.questionID, q.question, COUNT(a.answer) as yes
    FROM question as q, answer as a
    WHERE q.questionID = a.questionID AND q.type = 1 AND answer = "yes"
    GROUP BY q.questionID
    ORDER BY q.questionID`

    
    getConnection().query(questionQueryString, (err, results, fields) => {
        

        if (err) {
            console.log("Failed to add to the database" + err);
            return;
        }

        if (results.length === 0) {
            res.json([])
            return;
        }

    
        const responseQueryString = `SELECT COUNT(a.answer) as no
        FROM question as q, answer as a
        WHERE q.questionID = a.questionID AND q.type = 1 AND answer = "no"
        GROUP BY q.questionID
        ORDER BY q.questionID`

        getConnection().query(responseQueryString, (err, nums_no, fields) => {
            if (err) {
                console.log("Failed to add to the database" + err);
            }

            var i;

            for (i = 0; i < results.length; i++) {
                results[i].no = nums_no[i].no
            }
            

            res.json(results)

        })
        
    })

});

// get feedback

router.get('/feedback_response', verifyToken, (req,res) => {

    
    const questionQueryString = `SELECT feedbackQuestionID, feedbackQuestion as Title
    FROM feedbackQuestion`

    
    getConnection().query(questionQueryString, req.body, async (err, results, fields) => {
        

        if (err) {
            console.log("Failed to add to the database" + err);
            return;
        }

        if (results.length === 0) {
            res.json([])
            return;
        }

        var i;
        for (i = 0; i < results.length; i++) {

            const responseQueryString = `SELECT feedback, COUNT(DISTINCT feedbackID) AS Count
            FROM feedback
            WHERE feedbackQuestionID = ?
            GROUP BY feedback
            ORDER BY feedback`

            results[i].answer = await new Promise((resolve, reject) => {
                getConnection().query(responseQueryString, [results[i].feedbackQuestionID], (err, answers, fields) => {
                    if (err) reject("Failed to add to the database" + err);
                    else resolve(answers);
                })
            });
            
        }

        var j;
        for (j = 0; j < results.length; j++) {
            
            var k;
            answers = results[j].answer

            for (k = 0; k < answers.length; k++) {

                results[j][`A${answers[k].feedback}`] = answers[k].Count
            }

            delete results[j].answer;
        }
        
        res.json(results)
        
    })

});


        
// get patient
router.post("/get_patient", (req, res) => {
    const user = req.body;
    const NHSno = user.Nhsno;
    const lastname = user.lastname;
    const queryString = "SELECT patientID FROM patient WHERE NHSno = ? AND lastname = ?";
    getConnection().query(queryString, [NHSno, lastname], (err, patient, fields) => {

        if (err) {
            console.log("Failed to connect to the database." + err);
            return;
        }
        if (patient.length === 0) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        patientID = patient[0].patientID

        const queryString = "SELECT responseID, completeTime FROM response WHERE patientID = ? ORDER BY completeTime DESC"

        // First I am checking if there is a any previous survey of the patient
        getConnection().query(queryString, [patientID], async (err, results, fields) => {
            if (err) {
                console.log("Failed to add to the database" + err);
                return;
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "This patient has never filled in a survey."
                })
            }

            // I am obtaining all the previous surveys answers
            var i;
            for (i = 0; i < results.length; i++) {
                
                 // Change the date format
                start = new Date(results[i].startTime)
                results[i].startTime = `Date: ${start.toDateString()} Time: ${start.toLocaleTimeString()}`

                end = new Date(results[i].completeTime)
                results[i].completeTime = `Date: ${end.toDateString()} Time: ${end.toLocaleTimeString()}`

                const answersQueryString = `SELECT a.questionID, q.question, q.type, q.pos, a.answer
                FROM answer AS a, question AS q
                WHERE a.questionID = q.questionID AND a.responseID = ?`
                results[i].answer = await new Promise((resolve, reject) => {
                    getConnection().query(answersQueryString, [results[i].responseID], (err, answers, fields) => {
                        if (err) reject("Failed to add to the database" + err);
                        else resolve(answers);
                    })
                });
                
                


            }

            res.json(results)

        })
        
    })



    
})






// Adding new questions
router.post("/add_question", (req, res) => {

    const new_question = req.body
    const new_ID = req.body.questionID
// console.log("new_question", new_question)
// console.log("new question ID", new_question.questionID)
    const queryCheck = "SELECT * FROM question WHERE questionID = ?"
    getConnection().query(queryCheck, new_ID, (err, results, fields) => {
        if (err) {
            console.log("Couldn't check for Dupes" + err);
            res.sendStatus(500);
            return;
        }
        console.log("results from checking query", results)
        console.log("new_ID", new_ID)
        console.log("results length", results.length, "results check:", (results.length > 0))
        if (results.length > 0) {
    //         //Delete the entry first:
    //     const queryString = "DELETE FROM question WHERE questionID = ?"
    //     getConnection().query(queryString, new_ID, (err, results, fields) => {
    //     if (err) {
    //         console.log("Failed to delete the question." + err);
    //         return;
    //     }
    //     res.send();
    //     console.log("Succesfully deleted the question.");

    // })
    
        }
    })

    const queryString = "INSERT INTO question SET ? "
    getConnection().query(queryString, req.body, (err, results, fields) => {
        if (err) {
            console.log("Failed to add a new question." + err);
            res.sendStatus(500);
            return;
        }

        // Just updating the json which was
        // console.log("results", results)
        // console.log("new_question", new_question)
        // console.log("new question question ID", new_question.questionID)
        // console.log("results.insertId", results.insertId)
        // if (results.insertId != 0) {new_question.questionID = results.insertId}
        new_question.questionID = results.insertId
        console.log("new question ID", new_question.questionID)
        res.send(new_question);
        // res.send()
        console.log("Success, you have added a new question into the database.");
        // route.reload 
    })
})

// Deleting question
router.get("/delete_question:id", (req, res) => {
// router.post("/delete_question", (req, res) => {

    // const delete_question = req.body
        const queryString = "DELETE FROM question WHERE questionID = ?"
        getConnection().query(queryString, req.params.id, (err, results, fields) => {
        // getConnection().query(queryString, req.body, (err, results, fields) => {

        if (err) {
            console.log("Failed to delete the question." + err);
            return;
        }
        res.send();
        console.log("Succesfully deleted the question.");

    })
})

// Obtain all the question
router.get("/questions", (req, res) => {

    const queryString = `SELECT questionID, question, questionType.type, pos
    FROM question
    INNER JOIN questionType ON question.type = questionType.typeID
    ORDER BY pos ASC`
    getConnection().query(queryString, (err, results, fields) => {
        if  (err) {
            console.log("Failed to query the question" + err)
            res.sendStatus(500);
            return;
        }
        questions = results;

        var i;
        for (i = 0; i < results.length; i++) {
            questions[i].pos = i;
            questions[i]["answers"] = ""
        }

        res.json(questions)
        // console.log(questions)
        // console.log(questions.length)
    });


});


module.exports = router
const express = require('express');
const router = express.Router()
const getConnection = require('../db')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verify-token');

router.post('/new_survey', verifyToken, (req, res) => {

    const patientID = req.userData.userID;
    const data = req.body.data;
    const startTime = req.body.startTime;
    // const completeTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var moment = require('moment-timezone');
    const completeTime = moment.tz("Europe/London").format().slice(0, 19).replace('T', ' ');
    const queryString = "INSERT INTO response (patientID, startTime, completeTime) VALUES (?, ?, ?)"
    getConnection().query(queryString, [patientID, startTime, completeTime], (err, results, fields) => {
        if (err) {
            console.log("Failed to add to the database" + err);
            return;
        }
        const responseID = results.insertId;

        const answersQuery = "INSERT INTO answer (responseID, patientID, questionID, answer) VALUES (?, ?, ?, ?)"

        var i;
        for (i = 0; i < data.length; i++) {

            questionID = data[i].questionID;
            answer = data[i].answers;
            
            getConnection().query(answersQuery, [responseID, patientID, questionID, answer], (err, results, fields) => {
                if (err) {
                    console.log("Failed to add to the database" + err);
                    return;
                }
            })

        }

    })
    res.status(200).json({
        message: "Survey Completed"
    })

})


router.get('/patient_history', verifyToken, (req,res) => {
    const patientID = req.userData.userID;
    const queryString = "SELECT responseID, completeTime FROM response WHERE patientID = ? ORDER BY completeTime DESC"

    // First I am checking if there is a any previous survey of the patient
    getConnection().query(queryString, patientID, async (err, results, fields) => {
        if (err) {
            console.log("Failed to add to the database" + err);
            return;
        }

        if (results.length === 0) {
            res.json([])
            return;
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


router.get('/patient_info', verifyToken, (req, res) => {
    const queryString = "SELECT NHSno, phone, email, firstname, lastname FROM patient where patientID = ?"
    getConnection().query(queryString, [req.userData.userID], (err, results, fields) => {
        if (err) {
            console.log("Failed to add to the database" + err);
            return;
        }

        if (results.length === 0) {
            console.log("The NHS patient user does not exist.");
            return;
        }
        console.log("success");
        res.json(results[0]);
    })
})



router.post('/add_feedback', verifyToken, (req, res) => {
    const patientID = req.userData.userID;
    const data = req.body.data;
    const startTime = req.body.startTime;
    // const completeTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var moment = require('moment-timezone');
    const completeTime = moment.tz("Europe/London").format().slice(0, 19).replace('T', ' ');
    const queryString = "INSERT INTO feedbackresponse (patientID, startTime, completeTime) VALUES (?, ?, ?)"
    console.log(patientID, startTime, completeTime, new Date())
    getConnection().query(queryString, [patientID, startTime, completeTime], (err, results, fields) => {
        if (err) {
            console.log("Failed to add to the database" + err);
            return;
        }
        const feedbackID = results.insertId;

        const queryStringFeedback = "INSERT INTO feedback (feedbackID, patientID, feedbackQuestionID, feedback) VALUES (?, ?, ?, ?)"

        var i;
        for (i = 0; i < data.length; i++) {
            feedbackQuestionID = data[i].feedbackQuestionID;
            feedback = data[i].feedback;
    
            getConnection().query(queryStringFeedback, [feedbackID, patientID, feedbackQuestionID, feedback], (err, results, fields) => {
                if (err) {
                    console.log("Failed to add to the database" + err);
                    return;
                }
            })

        }

    })
    res.status(200).json({
        message: "Survey Completed"
    })
})

router.get('/feedback_ques', (req, res) => {
    const queryString = 'SELECT * FROM feedbackquestion';
    getConnection().query(queryString, (err, results, fields) => {
        if (err) {
            console.log("Error querying.");
            return;
        }

        questions = results;

        var i;
        for (i = 0; i < results.length; i++) {
            questions[i].pos = i;
            questions[i]["feedback"] = ""
        }

        res.json(questions);
    })
})


router.post('/login', (req, res) => {
    const user = req.body;
    const NHSno = user.NHSno;
    const lastname = user.lastname;
    const queryString = "SELECT patientID FROM patient WHERE NHSno = ? AND lastname = ?";

    getConnection().query(queryString, [NHSno, lastname], (err, results, fields) => {

        if (err) {
            console.log("Failed to connect to the database." + err);
            return;
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Authorisation failed."
            });
        }

        jwt.sign({
            userID : results[0].patientID,
        }, 'J9dah7kPbo', {expiresIn : "1h"}, (err, token) => {
            res.status(200).json({
                message: "Authorisation successful",
                token: token})
        });


    })
    
})


module.exports = router;
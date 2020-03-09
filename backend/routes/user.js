const express = require('express');
const router = express.Router();
const getConnection = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verifyToken = require('../middleware/verify-token');




router.post('/login', (req, res) => {
    console.log(req.body)
    const user = req.body;
    const username = user.username;
    const password = user.password;
    const queryString = "SELECT username, userID, hashedPassword, userRoleID, statusID, firstname FROM nhsUsers WHERE statusID=1 AND username = ?";

    getConnection().query(queryString, [username], (err, results, fields) => {
        if (err) {
            console.log("Failed to connect to the database." + err);
            return;
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Authorisation failed."
            });
        }

        // This is to check if working status (current or former worker)
        if (results[0].statusID === 2) {
            return res.status(401).json({
                message: "Authorisation failed."
            });
        }
        const hash = results[0].hashedPassword.toString();
        bcrypt.compare(password, hash, (err, bcr_res) => {

            if (err) {
                return res.status(401).json({
                    message: "Authorisation failed."
                });
            }

            if (bcr_res === false) {
                return res.status(401).json({
                    message: "Authorisation failed."
                })
            } else {
                jwt.sign({
                    userID : results[0].userID,
                    userRoleID: results[0].userRoleID,
                    firstname: results[0].firstname
                }, 'J9dah7kPbo', {expiresIn : "1h"}, (err, token) => {
                    res.status(200).json({
                        message: "Authorisation successful",
                        token: token})
                });
            }
        })


    })

})

router.post('/register', verifyToken, (req, res) => {
    const user = req.body;
    user.password = user.passwordGroup.password
    delete user.passwordGroup;

    const password = req.body.password;

    const queryCheckUser = `SELECT username, description
    FROM nhsUsers
    INNER JOIN workingstatus on workingstatus.statusID = nhsUsers.statusID
    where nhsUsers.username = ?`
    getConnection().query(queryCheckUser,[user.username], (err, results, fields) => {
        
        if (err) {
            return res.status(400).json({
                error: err
            });
        };

        if (results.length >= 1) {
            return res.status(400).json({
                message: "This Nhs Staff is already registered",
                description: results[0].description
            });
        }


    
        if (user.userRole === "Admin") {
            userRoleID = 1;
        } else if (user.userRole === "NHS Staff") {
            userRoleID = 2;
        } else {
            return res.status(400).json({
                message: "Invaid user role."
            });
        }
        
        
        bcrypt.hash(password, saltRounds, function(err, hash) {

            if (err) {
                return res.status(400).json({
                    message: "Error"
                });
            };

            const queryString = "INSERT INTO nhsUsers (username, hashedPassword, firstname, lastname, email, phone, userRoleID, statusID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

            user.password = hash;
            const insert = [user.username, user.password, user.firstname, user.lastname, user.email, user.phone, userRoleID, 1]
      
        
            getConnection().query(queryString, insert, (err, results, fields) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error"
                    });
                };

                res.status(200).json({
                    message: "Account created."})
            })

          });

    })

})


router.post('/remove_user', verifyToken, (req, res) => {
    const userID = req.body.userID;
    const queryString = "SELECT statusID FROM nhsUsers WHERE userID = ?";
    getConnection().query(queryString, [userID], (err, results, fields) => {
        if (err) {
            console.log("Failed to connect to the database." + err);
            return;
        }

        if (results.length === 0) {
            console.log("NHS Staff does not exist.")
            return;
        }
        if (results[0].statusID === 2) {
            console.log("This is an ex-employee.");
            return;
        }

        const removeQueryString = "UPDATE nhsUsers SET statusID = 2 WHERE userID = ?"
        getConnection().query(removeQueryString, [userID], (err, results, fields) => {
            if (err) {
                console.log("Failed to connect to the database." + err);
                return;
            } else {
                console.log("remove");
                return results;
                // res.send("success");
            }

        })

    })

})


// Get all the user
router.get('/get_user', verifyToken, (req, res) => {

    if (req.userData.userRoleID !== 1) {
        return res.status(401).json({
            message: "Authorisation access."
        })
    }

    const queryString = `SELECT u.userID, u.username, u.firstname, u.lastname, u.email, u.phone, r.roleName, u.userRoleID, s.description
    FROM nhsUsers AS u, userRole AS r, workingStatus AS s
    WHERE u.userRoleID = r.roleID 
    AND s.statusID = u.statusID
    ORDER BY s.description ASC, u.userRoleID ASC, u.lastname ASC`;
    getConnection().query(queryString, (err, results, fields) => {
        if (err) {
            console.log("Failed to connect to the database." + err);
            return;
        }
        // console.log(results)
        res.json(results);

    })

})

// edit status of users
router.post('/edit_user', verifyToken, (req, res) => {
    const userID = req.body.userID;
    const userRoleID = req.body.userRoleID;
    console.log(userID);
    queryString = ''
    if (userRoleID === 1) {
        queryString = `UPDATE nhsUsers SET userRoleID = 2 WHERE userID = ?`; //change to nurses
        console.log("userRoleID = 1");
    } else {
        queryString = `UPDATE nhsUsers SET userRoleID = 1 WHERE userID = ?`; //change to admin
        console.log("userRoleID = 2");
    }
    getConnection().query(queryString, [userID], (err, results, fields) => {
        if (err) {
            console.log("Failed to connect to the database." + err);
            return;
        } 
        console.log(results);
        // res.send("success");
    })

})



module.exports = router;

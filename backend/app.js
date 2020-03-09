const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require('cors')

const questions = require("./routes/questions.js");
const user = require("./routes/user.js");
const appUser = require("./routes/app_user");



const app = express();
app.use(morgan("dev"));


const PORT = process.env.PORT || 3000


// Middleware

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

 

// router
app.use('/', questions);
app.use('/', user);
app.use('/app', appUser);

// Error handaling middleware
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error:{
            message: err.message
        }
    })
})

// remove this later. This is just for testing.
app.get('/test' ,(req, res) => {
    console.log(Date.now()/ 1000)
    res.send(Date(Date.now()))
})



app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}`)
})




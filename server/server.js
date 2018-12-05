const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// store config variables in dotenv
//require('dotenv').config();
const PORT = 3500;
const cors = require('cors');

// ****** allow cross-origin requests code START ****** //
app.use(cors()); // uncomment this to enable all CORS and delete cors(corsOptions) in below code
//const allowedOrigins = process.env.allowedOrigins.split(',');
/**
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
 */
// ****** allow cross-origin requests code END ****** //

// ****** validation rules START ****** //
const valFunctions = require('./validators/validate');
// ****** validation rules END ****** //

// app Routes
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// POST /login gets urlencoded bodies
app.post('/register', jsonParser, function (req, res) {
    if(valFunctions.checkInputDataNULL(req,res)) return false;
    if(valFunctions.checkInputDataQuality(req,res)) return false;
    //if(valFunctions.checkJWTToken(req,res)) return false;
    //if(valFunctions.checkUserAuthRole(req,res)) return false;
    var dbFunctions = require('./models/controller');
    dbFunctions.createUser(req,res);
});

app.use('/', (req, res) => res.send("Welcome to Billezy!"));
app.listen(PORT, function(){
    console.log("Server running on localhost:" + PORT);
});
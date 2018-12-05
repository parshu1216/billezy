const pool = require('./connect_inc');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

var resultsNotFound = {
  "errorCode": "0",
  "errorMessage": "Operation not successful.",
  "rowCount": "0",
  "data": ""
};
var resultsFound = {
  "errorCode": "1",
  "errorMessage": "Operation successful.",
  "rowCount": "1",
  "data": ""
};

module.exports = {
    createUser: function (req, res) {
      pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!
  
        bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
          var sql = 'INSERT INTO login_info SET ?';
          var values = { 'username': req.body.Username, 'email': req.body.Email, 'password': hash, 'createdAt': new Date() }
          var sql2 = 'INSERT INTO user SET ?';
          var values2 = { 'username': req.body.Username, 'email': req.body.Email, 'password': hash, 'createdAt': new Date() }
          // Use the connection
          connection.query(sql, values, function (error, results, fields) {
            if (error) {
              resultsNotFound["errorMessage"] = "User already exists.";
              return res.send(resultsNotFound);
            } else return res.send(resultsFound);
  
            // When done with the connection, release it.
            connection.release(); // Handle error after the release.
            if (error) throw error; // Don't use the connection here, it has been returned to the pool.
          });
          connection.query(sql2, values2, function (error, results, fields) {
            if (error) {
              resultsNotFound["errorMessage"] = "Entry already exists.";
              return res.send(resultsNotFound);
            } else return res.send(resultsFound);
  
            // When done with the connection, release it.
            connection.release(); // Handle error after the release.
            if (error) throw error; // Don't use the connection here, it has been returned to the pool.
          });




        });
      });
    },
    
  loginUser: function (req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

        var sql = 'SELECT * FROM `login_info` WHERE `email` = ?';
        var values = [req.body.Email]
        // Use the connection
        connection.query(sql, values, function (error, results, fields) {
          if (error) {
            resultsNotFound["errorMessage"] = "Something went wrong with Server.";
            return res.send(resultsNotFound);
          }
          if (results =="") {
            resultsNotFound["errorMessage"] = "User Id not found.";
            return res.send(resultsNotFound);
          }
          bcrypt.compare(req.body.Password, results[0].password, function (err, result) {
      if (result == true) {
        var token = {
          "token": jwt.sign(
            { email: req.body.Email },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
          )
        }
        resultsFound["data"] = token;
        res.send(resultsFound);
      } else {
        resultsNotFound["errorMessage"] = "Incorrect Password.";
        return res.send(resultsNotFound);
      }
    });

          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });
      });
  },
}

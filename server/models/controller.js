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
          } else {
            connection.query(sql2, values2, function (error, results, fields) {
              if (error) {
                resultsNotFound["errorMessage"] = "Entry already exists.";
                return res.send(resultsNotFound);
              } else return res.send(resultsFound);

              // When done with the connection, release it.
              //connection.release(); // Handle error after the release.
              //if (error) throw error; // Don't use the connection here, it has been returned to the pool.
            });

            //return res.send(resultsFound);
          }

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
        if (results == "") {
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
  getUser: function (input, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      var sql = 'SELECT * FROM `user` WHERE `email` = ?';
      var values = [input]
      // Use the connection
      connection.query(sql, values, function (error, results, fields) {
        if (error) {
          resultsNotFound["errorMessage"] = "Something went wrong with Server.";
          return res.send(resultsNotFound);
        }
        if (results == "") {
          resultsNotFound["errorMessage"] = "User Id not found.";
          return res.send(resultsNotFound);
        }
        resultsFound["data"] = results[0];
        res.send(resultsFound);
        // When done with the connection, release it.
        connection.release(); // Handle error after the release.
        if (error) throw error; // Don't use the connection here, it has been returned to the pool.
      });
    });
  },
  updateUser: function (userEmail, req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
        var sql = 'UPDATE user SET ? WHERE `email` = ?';
        var values = { 'username': req.body.Username, 'email': req.body.Email, 'password': hash, 'question': req.body.question, 'answer': req.body.answer, 'updatedAt': new Date() }
        var updated_sql = 'UPDATE login_info SET ? WHERE `email` = ?';
        var updated_values = { 'username': req.body.Username, 'email': req.body.Email, 'password': hash }
        // Use the connection
        connection.query(sql, [values, userEmail], function (error, results, fields) {
          if (error) {
            console.log(error)
            resultsNotFound["errorMessage"] = "Data is NOT updated.";
            return res.send(resultsNotFound);
          } 
          else {
            connection.query(updated_sql, [updated_values, userEmail], function (error, results, fields) {
              if (error) {
                console.log(error)
                resultsNotFound["errorMessage"] = "Data is NOT updated.";
                return res.send(resultsNotFound);
              } else return res.send(resultsFound)
    
              // When done with the connection, release it.
              //connection.release(); // Handle error after the release.
              //if (error) throw error; // Don't use the connection here, it has been returned to the pool.
            });
            
            //return res.send(resultsFound);
          }

          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });

      
      });
    });
  },
}

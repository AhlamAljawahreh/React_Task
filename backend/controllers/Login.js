const connection = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  const query = `SELECT * FROM users WHERE email=?`;
  const data = [email];
  connection.query(query, data, (err, results) => {
    if (err) throw err;
    // result are the data returned by mysql server
    if (results.length) {
      bcrypt.compare(password, results[0].password, (err, response) => {
        if (err) res.json(err);
        if (response) {
          const payload = {
            userId: results[0].id,
            role: results[0].role,
          };
          const options = {
            expiresIn: "24h",
          };
          const secret = process.env.SECRET;

          const token = jwt.sign(payload, secret, options);

          res.status(200).json({
            success: true,
            message: "Valid login credentials",
            token,
            userId: results[0].id,
            role: results[0].role,
          });
        } else {
          res.status(200).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
            err,
          });
        }
      });
    } else {
      res
        .status(200)
        .json({ success: false, message: "The email doesn't exist", err });
    }
  });
};

module.exports = { login };

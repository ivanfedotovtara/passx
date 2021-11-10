const db = require("../../db");
const { validateEmail } = require("../../global/validations");
const bcrypt = require("bcrypt");

const AuthController = {
  register: async (req, res) => {
    const { email, password, status, created_on, last_login, username } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    // if email and password exist
    if ((!email, !password)) {
      res.send({ status: 0, msg: "Enter email and password" });
    }

    // email length > 5 char
    if (email.length < 6) {
      res.send({
        status: 0,
        msg: "Email should be not less than 5 characters",
      });
    }
    // password length > 5 char
    if (password.length < 6) {
      res.send({
        status: 0,
        msg: "Password should be not less than 5 characters",
      });
    }

    // email validation
    if (validateEmail(email)) {
      // check if not registered
      db.query(
        `select email from accounts where email = '${email}'`,
        (err, result) => {
          if (err) throw err;

          if (result.rows != 0) {
            return res.send({
              status: 0,
              msg: "You are registered before.",
            });
          } else {
            db.query(
              "insert into accounts(email, password, status, created_on, last_login, username) values ($1, $2, $3, $4, $5, $6)",
              [email, hashedPassword, status, created_on, last_login, username],
              (err, result) => {
                if (err) throw err;
                return res.send("Successfully created.");
              }
            );
          }
        }
      );
    } else {
      // email validation error
      return res.send({
        status: 0,
        msg: "You have entered an invalid email address!",
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    async function comparePassword(userPassword) {}

    // if email and password exist
    if ((!email, !password)) {
      res.send({ status: 0, msg: "Enter email and password" });
    }

    // email length > 5 char
    if (email.length < 6) {
      res.send({
        status: 0,
        msg: "Email should be not less than 5 characters",
      });
    }
    // password length > 5 char
    if (password.length < 6) {
      res.send({
        status: 0,
        msg: "Password should be not less than 5 characters",
      });
    }

    if (validateEmail(email)) {
      const sql = `select email, password from accounts where email = '${email}'`;

      db.query(sql, (err, result) => {
        if (err) throw err;

        if (result.rows.length != 0) {
          bcrypt.compare(
            password,
            result.rows[0].password,
            function (err, result) {
              console.log(result);
              if (result) {
                res.send({
                  status: 1,
                  msg: "Successful login",
                });
              } else {
                res.send({
                  status: 0,
                  msg: "Invalid password",
                });
              }
            }
          );
        } else {
          res.send({
            status: 0,
            msg: "You don't have account. Please, register first.",
          });
        }
      });
    }
  },
};

module.exports = AuthController;

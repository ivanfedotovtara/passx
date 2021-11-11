const db = require("../../db");
const { validateEmail } = require("../../global/validations");
const bcrypt = require("bcrypt");
const { sendMailOnRegister } = require("../../mail");

const AuthController = {
  register: async (req, res) => {
    const { email, password, created_on, last_login, status, activated, role } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 5);
    const tempId = Math.floor(100000 + Math.random() * 900000);

    // if email and password exist
    if ((!email, !password)) {
      return res.send({ status: 0, msg: "Enter email and password" });
    }

    // password length > 5 char
    if (password.length < 6) {
      return res.send({
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
            res.send({
              status: 0,
              msg: "You are registered before.",
            });
          } else {
            db.query(
              "insert into accounts(email, password, created_on, last_login, status, activated, temp_id, role) values ($1, $2, $3, $4, $5, $6, $7, $8)",
              [
                email,
                hashedPassword,
                created_on,
                last_login,
                status,
                activated,
                tempId,
                role,
              ],
              (err, result) => {
                if (err) throw err;

                sendMailOnRegister({ user_email: email, temp_id: tempId });

                res.send({
                  status: 1,
                  msg: "Successfully created.",
                  temp_id: tempId,
                });
              }
            );
          }
        }
      );
    } else {
      // email validation error
      res.send({
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

  activateAccount: (req, res) => {
    const { email, tempId } = req.body;

    db.query(
      `select email, temp_id, id from accounts where email = '${email}'`,
      (err, result) => {
        if (err) throw err;

        if (result.rows.length == 0) {
          res.send({ status: 0, msg: "No user with this email." });
        } else {
          const temp_id = result.rows[0].temp_id;

          if (temp_id == tempId) {
            db.query(
              `update accounts set activated = true, status = true, temp_id = null where id = ${result.rows[0].id}`
            );

            res.send({ status: 1, msg: "Successful activated the account." });
          } else {
            res.send({ status: 0, msg: "Invalid code." });
          }
        }
      }
    );
  },
};

module.exports = AuthController;

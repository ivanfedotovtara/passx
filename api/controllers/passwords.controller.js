const db = require("../../db");
const bcrypt = require("bcrypt");

const PasswordsController = {
  addPassword: async (req, res) => {
    const { title, logo, password, category, created_on, user_id } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    if (password < 6) {
      res.send({
        status: 0,
        msg: "Password is unsafe. Please, use more than 5 characters for password.",
      });
    }

    if (!user_id) {
      res.send({
        status: 0,
        msg: "Please, provide a user ID.",
      });
    }

    const sql = `insert into passwords(title, logo, password, category, created_on, user_id) values('${title}', '${logo}', '${hashedPassword}', ${category}, '${created_on}', ${user_id})`;

    db.query(sql, (err, result) => {
      if (err) throw err;

      res.send({ status: 1, msg: "Successfully created new password." });
    });
  },
};

module.exports = PasswordsController;

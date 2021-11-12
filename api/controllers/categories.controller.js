const db = require("../../db");

const CategoriesController = {
  listAllCategories: (req, res) => {
    const { user_id } = req.body;

    const sql = `select title, icon, color, id from categories where user_id = 0 or user_id = ${Number(
      user_id
    )}`;

    db.query(sql, (err, result) => {
      if (err) throw err;

      res.send({ status: 1, data: result.rows });
    });
  },
  createCategory: (req, res) => {
    const { title, icon, color, user_id } = req.body;

    if (title.length < 1) {
      res.send({ status: 0, msg: "Please, enter title." });
    } else {
      db.query(
        `
      insert into categories(title, icon, color, user_id) values('${title}', '${icon}', '${color}', ${Number(
          user_id
        )})`,
        (err, result) => {
          if (err) throw err;

          res.send({ status: 1, msg: "Successfully created new category." });
        }
      );
    }
  },
  addPassword: (req, res) => {
    const { title, logo, password, category, created_on, user_id } = req.body;

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

    const sql = `insert into passwords(title, logo, password, category, created_on, user_id) values('${title}', '${logo}', '${password}', ${category}, '${created_on}', ${user_id})`;

    db.query(sql, (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  },
};

module.exports = CategoriesController;

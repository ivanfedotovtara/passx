const db = require("../../db");

const CategoriesController = {
  listAllCategories: (req, res) => {
    const { user_id } = req.body;

    const sql = `select title, icon, color from categories where user_id = 0 or user_id = ${Number(
      user_id
    )}`;

    db.query(sql, (err, result) => {
      if (err) throw err;

      res.send({ status: 1, data: result.rows });
    });
  },
  createCategory: (req, res) => {
    const { title, icon, color, user_id } = req.body;

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
  },
};

module.exports = CategoriesController;

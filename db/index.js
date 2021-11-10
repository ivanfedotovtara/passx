require("dotenv").config();
const { Client } = require("pg");

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect(function (err) {
  if (err) throw err;

  console.log("> Database connected:", db.database);
});

module.exports = db;

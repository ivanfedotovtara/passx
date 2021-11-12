const express = require("express");
const PasswordsController = require("../controllers/passwords.controller");

const PasswordsRouter = express.Router();

PasswordsRouter.post("/add", PasswordsController.addPassword);

module.exports = PasswordsRouter;

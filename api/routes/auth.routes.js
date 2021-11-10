const express = require("express");
const AuthController = require("../controllers/auth.controller");

const AuthRouter = express.Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/login", AuthController.login);

module.exports = AuthRouter;

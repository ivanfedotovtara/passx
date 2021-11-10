const express = require("express");
const AuthController = require("../controllers/auth.controller");

const AuthRouter = express.Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/activate", AuthController.activateAccount);

module.exports = AuthRouter;

const express = require("express");
const CategoriesController = require("../controllers/categories.controller");

const CategoriesRouter = express.Router();

CategoriesRouter.post("/", CategoriesController.listAllCategories);
CategoriesRouter.post("/create", CategoriesController.createCategory);

module.exports = CategoriesRouter;

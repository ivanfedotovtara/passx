// imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routers
const AuthRouter = require("./api/routes/auth.routes");
const CategoriesRouter = require("./api/routes/categories.routes");

// database
require("./db");

// app init
const app = express();

// .env variables
const port = process.env.SERVER_PORT;
const protocol = process.env.SERVER_PROTOCOL;
const hostname = process.env.SERVER_HOSTNAME;

// connections
app.use(cors({ origin: `${protocol}://${hostname}:${port}` }));
app.use(express.json());

// api
app.use("/api/auth", AuthRouter);
app.use("/api/categories", CategoriesRouter);

// app starts
app.listen(port, () => {
  console.log(`:: App started: ${protocol}://${hostname}:${port} `);
});

require("dotenv").config();
const express = require("express");
const cors = require('cors');
require("./db");
const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

app.use(cors());

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

require("./config")(app);
require("./error-handling")(app);

module.exports = app;

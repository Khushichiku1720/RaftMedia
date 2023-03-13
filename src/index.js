const connectToMongo = require('./db/db_connect')
const express = require('express')
connectToMongo();
const app = express();
const jwt = require("jsonwebtoken");
const { loginRoute } = require("./Authentication/Login");
const coursesRouter = require("./routes/courses")
const bodyParser = require('body-parser')
const port = 5000;
app.use("/login", loginRoute);
app.use(bodyParser.json())
app.use("/route", coursesRouter)
app.get("/", (req, res) => {
    res.send("Application is up and running")
})
app.listen(port, () => {
    console.log("Application is running at " + port);
})
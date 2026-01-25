const express = require("express");
const cors = require("cors");
require('dotenv').config();

console.log("App file loaded");   // 👈 add this

const app = express();
const connectDB = require("./db/db");
const userRoutes = require('./routes/user.routes');
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("GET / hit");       // 👈 add this
  res.send("Hello World!");
});

app.use('/users', userRoutes)

module.exports = app;

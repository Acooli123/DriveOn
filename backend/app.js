const express = require("express");
const cors = require("cors");
require('dotenv').config();

console.log("App file loaded");   // 👈 add this

const app = express();
const connectDB = require("./db/db");
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("GET / hit");       // 👈 add this
  res.send("Hello World!");
});

module.exports = app;

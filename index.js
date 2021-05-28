const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dspyj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = process.env.PORT || 5000;

const app = express();

//middlewire here
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome! To the Amar dokan Server...");
});

app.listen(port, () => {console.log("Hello")});

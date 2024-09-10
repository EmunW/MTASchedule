const express = require('express');
const dotenv = require('dotenv').config();
const trainTimesController = require("./controllers/trainTimesController")

const port = process.env.PORT || 4000;

const app = express();

app.post("test", (req, res) =>{
  trainTimesController(req, res);
  res.status(200).send("GOOD");
})

app.get("/", trainTimesController.trainTimes, (req, res) => {
  res.send("EXPRESS SERVER WORKING")
})

app.listen(port, () =>{
  console.log(`Server is running on port ${port}`)
})
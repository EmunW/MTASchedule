import express from 'express'
import trainTimesController from './controllers/trainTimesController.js';

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
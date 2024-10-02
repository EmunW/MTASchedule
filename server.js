import express from 'express'
import trainStationsController from './controllers/trainStationsController.js';

const port = process.env.PORT || 4000;

const app = express();

app.post("test", (req, res) =>{
  trainStationsController(req, res);
  res.status(200).send("GOOD");
})

app.get("/", (req, res) => {
  res.status(200).send("EXPRESS SERVER WORKING")
})

app.get("/stations", trainStationsController.trainStations, (req, res) => {
  res.status(200).json(res.locals.feeds)
})

app.listen(port, () =>{
  console.log(`Server is running on port ${port}`)
})
const trainTimesController = {}

trainTimesController.trainTimes = async (req, res, next) => {
  try{
    mtaTime = await fetch("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace")
    .then(data => {data})
    console.log("MTA TIME: ", mtaTime);
  }
  catch(err){
    console.error("Error occurred in trainTimes.js: ", err)
    next(err);
  }
}

module.exports = trainTimesController;
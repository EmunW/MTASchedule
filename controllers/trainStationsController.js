
import combine_feeds from "./helperFunctions/combineFeeds.js";

const trainStationsController = {};

trainStationsController.trainStations = async (req, res, next) => {
  try{ 
    res.locals.feeds = await combine_feeds();
    next();
  }
  catch(err){
    console.error("Error occurred in trainTimes.js: ", err)
    next(err);
  }
}



export default trainStationsController
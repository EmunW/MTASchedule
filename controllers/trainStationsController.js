import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import fetch from "node-fetch";
import get_stations from "./getStations.js";

const trainStationsController = {}

trainStationsController.trainStations = async (req, res, next) => {
  try{
    const schedule = {};
    schedule.ACE = await GtfsToJson("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace");
    schedule.BDFM = await GtfsToJson("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm");
    schedule.G = await GtfsToJson("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g");
    schedule.JZ = await GtfsToJson("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz");
    schedule.NQRW = await GtfsToJson("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw");
    schedule.L = await GtfsToJson("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l");
    schedule.Numbers = await GtfsToJson("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs");
    schedule.Sir = await GtfsToJson("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-si")

    get_stations();
    next();
  }
  catch(err){
    console.error("Error occurred in trainTimes.js: ", err)
    next(err);
  }
}

const GtfsToJson = (async (URL) => {
  try {
    const response = await fetch(URL)
    if (!response.ok) {
      const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
      error.response = response;
      throw error;
      process.exit(1);
    }
    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(buffer)
    );
    // console.log(feed.entity[0])
    trainStationsController.feed = feed;
    return feed;
  }
  catch (error) {
    console.log(error);
    process.exit(1);
  }
});


export default trainStationsController
import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import fetch from "node-fetch";

const trainTimesController = {}

trainTimesController.trainTimes = async (req, res, next) => {
  try{
    await GtfsToJson();
  }
  catch(err){
    console.error("Error occurred in trainTimes.js: ", err)
    next(err);
  }
}

const GtfsToJson = (async () => {
  try {
    const response = await fetch("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw", {
      headers: {
        "x-api-key": "<redacted>",
        // replace with your GTFS-realtime source's auth token
        // e.g. x-api-key is the header value used for NY's MTA GTFS APIs
      },
    });
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
    console.log(feed.entity[0])
  }
  catch (error) {
    console.log(error);
    process.exit(1);
  }
});


export default trainTimesController
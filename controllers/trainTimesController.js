import combine_feeds from "./helperFunctions/combineFeeds";
import get_stations from "./helperFunctions/getStations";

const feeds = combine_feeds()
const currentTime = Date.now();
// Get train times that are listed on the feed
const train_station_times = () => {
  const stationTimes = []
  const stations = get_stations();
  for(let station of stations){

  }
}
// Data will be stored as a dictionary
// Convert the milliseconds to minutes
// Do not want all the data so limit it to trains within 30 minutes away, if no trains then get the earliest train
// 
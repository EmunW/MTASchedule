import * as fs from 'fs';
import {parse} from 'csv-parse';

const STOPS_FILE = "google_transit/stops.csv"
const stops = readCSV(STOPS_FILE);

function readCSV(file){
  const data = [];
  fs.createReadStream(file)
    .pipe(
      parse({
        delimiter: ",",
        columns: true,
        ltrim: true,
      })
    )
    .on("data", function (row) {
      // This will push the object row into the array
      data.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
      console.log("CSV has been parsed")
    });
  return data;
}

export default function get_stations(){
  // console.log("GET STATIONS: ", stops[0].stop_name);
  const stationSet = new Set();
  for(let stop of stops){
    stationSet.add(stop.stop_name);
  }
  const stations = [...stationSet]
  let count = 0;
  for(let station of stations){
    stops[count] = {'station_id': count, 'name': station, 'stop_ids': []}
    // console.log("STOPS COUNT: ", stops[count])
    // console.log(station);
    let name_found = false
    for(let stop of stops){
      if(stop.stop_name === station){
        if(name_found == false){
          stops[count].name = stop.stop_name;
          name_found = true
        }
        let stopId = stop.stop_id
        if(stopId[-1] == "N" || stopId[-1] == "S"){
          continue
        }
        else{
          stops[count].stop_ids = stopId;
        }
      }
    }
    count++;
  }
  const stops2 = []
    for(let count in Object.keys(stops)){
      stops2.push(stops[count])
    }
    console.log("STOPS2: ", stops2)
    return stops2
}
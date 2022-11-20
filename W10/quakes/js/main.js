import { getJSON, getLocation } from "./utilities.js";

export default class Quake {
  constructor() {
    this.baseUrl =
      "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02";
    this._quakes = [];
  }
  async getEarthQuakesByRadius(position, radius = 100) {
    return this._quakes;
  }
  getQuakeById(id) {
    return this._quakes.features.filter((item) => item.id === id)[0];
  }
}

async function showQuakes() {
  // get the current location
  const location = await initPos();
  // get the list of quakes for the location
  const quakes = await getQuakesForLocation(location);
  // render the list to the list element
  const listElement = document.querySelector("#quakeList");
  listElement.innerHTML = generateListMarkup(
    quakes.features,
    earthquakeListTemplate
  );

  // attach a listener to the quakes that will listen for a click and render out details about the quake
  listElement.addEventListener("click", earthQuakeClickHandler);
}

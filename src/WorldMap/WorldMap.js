import React, { Component } from "react";
import styles from "./WorldMap.module.css";
import { fetchCountriesDataLocation } from "../api";
import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource, OSM } from "ol/source";
import Feature from "ol/Feature";
import Circle from "ol/geom/Circle";

export default class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: [],
      showPopup: false,
      info: {},
    };
  }

  async componentDidMount() {
    let response = await fetchCountriesDataLocation();
    let that = this;
    this.setState({ fetchData: response }, () => {
      const map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],

        view: new View({
          center: fromLonLat([0, 30]),
          zoom: 0,
        }),
      });
      let gpsarrays = this.state.fetchData.map((data) => ({
        lat: data.countryInfo.lat,
        long: data.countryInfo.long,
        deaths: data.deaths,
        country: data.country,
        cases: data.cases,
        population: data.population,
      }));

      gpsarrays.map((data) => {
        const marker = new Feature({
          geometry: new Circle(
            fromLonLat([data.long, data.lat]),
            Math.sqrt(10000000 * data.deaths)
          ),

          info: data,
        });

        const vectorSource = new VectorSource({
          features: [marker],
        });

        const markerVectorLayer = new VectorLayer({
          source: vectorSource,
        });
        map.addLayer(markerVectorLayer);
      });

      map.on("click", function (e) {
        map.forEachFeatureAtPixel(e.pixel, function (feature) {
          //do something
          that.setState({ showPopup: true, info: feature.values_.info });
          console.log(e);
        });
      });
    });
  }

  render() {
    // carte + vue centrée sur l'ile-de-france

    const style_map = {
      height: "400px",
    };

    if (!this.state.showPopup) {
      return (
        <div className={styles.container}>
          <div className={styles.popup}>
            <h2>Cliquez sur un des cercles pour plus d'informations !</h2>
            <div id="map" style={style_map}></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.container_two}>
          <div>
            <div className={styles.popup}>
              <h2>{this.state.info.country}</h2>
              <h3 className={styles.popup_country_population}>
                Population : {this.state.info.population}
              </h3>
              <h3 className={styles.popup_case}>
                Nombre de cas recensés : {this.state.info.cases}
              </h3>
              <h3 className={styles.popup_country_deaths}>
                Nombre de morts recensés : {this.state.info.deaths}
              </h3>
            </div>

            <div id="map" style={style_map}></div>
          </div>
        </div>
      );
    }
  }
}

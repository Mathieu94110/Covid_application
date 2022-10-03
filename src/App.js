import React, { Component } from "react";
import styles from "./App.module.css";
import Cards from "./Cards/Cards";
import { fetchData } from "./api";
import Charts from "./Charts/Charts";
import CountryPicker from "./countryPicker/countryPicker";
import images from "./images/covid19.jpg";

class App extends Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({
      data: fetchedData,
    });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({
      data: fetchedData,
      country: country,
    });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.App}>
        <img className={styles.image} src={images} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Charts data={data} country={country} />
      </div>
    );
  }
}

export default App;

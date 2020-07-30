import React, {Component} from 'react';
import './App.css';
import Cards from "./Cards/Cards";
import { fetchData  } from "./api";
import Charts from "./Charts/Charts";
import CountryPicker from "./countryPicker/countryPicker";

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
      data: fetchedData, country: country
    });
  }

  render() {
    const { data, country } = this.state;
    return (
      <div className="App">
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Charts data={data} country={country} />
      </div>
    );
  }
}
 

export default App;

import React, {Component} from 'react';
import './App.css';
import Cards from "./Cards/Cards";
import { fetchData } from "./api";
import Charts from "./Charts/Charts";

class App extends Component {
  state={
    data: {},
    
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({
      data: fetchedData,
    });
    
  }
  render() {
const { data } = this.state
     return (
    <div className="App">
         <Cards data={data} />
         <Charts />
    </div>
  );
}
  }
 

export default App;

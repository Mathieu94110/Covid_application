import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchCountries } from "../api";

const CountryPicker = ({ handleCountryChange }) => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setCountriesData(await fetchCountries());
    };
    fetchApi();
  }, [setCountriesData]);
 console.log(countriesData);
  return (
    <FormControl>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="global">Global</option>
        {countriesData.map((country) => (
          <option key={country}>{country}</option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;

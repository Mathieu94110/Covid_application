import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchCountries } from "../api";
import styles from "./countryPicker.module.css";

const CountryPicker = ({ handleCountryChange }) => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setCountriesData(await fetchCountries());
    };
    fetchApi();
  }, [setCountriesData]);

  return (
    <div className={styles.picker}>
      <FormControl>
        <NativeSelect
          defaultValue=""
          onChange={(e) => handleCountryChange(e.target.value)}
          className={styles.select}
        >
          <option value="">Dans le monde</option>
          {countriesData.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default CountryPicker;

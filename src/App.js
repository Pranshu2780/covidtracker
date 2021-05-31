import React, { useState, useEffect } from "react";
import "./App.css";
import Info from "./Components/Info";
import Map from "./Components/Map";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./Components/Styles/style.css";
function App() {
  const [countries, setCountries] = useState(["USA", "UK", "India"]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, [countries]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    console.log("countryCode", countryCode);

    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data);
        setCountryInfo(data);

      });

      console.log('countryInfo',countryInfo);
  };

  return (
    <div className="app">
      <div className="left">
        <div className="app_header">
          <h1> A Covid-19 Tracker </h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">worldwide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

              {/* 
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <Info title="CoronaVirus" total={10000} cases={123} />
          <Info title="Recovered cases" total={9500} cases={1234} />
          <Info title="Deaths" total={500} cases={12345} />
        </div>

        <div>
          <Map />
        </div>
      </div>
      <Card className="right">
        <h3> Live Cases </h3>
        <h3> World Wide Cases </h3>
      </Card>
    </div>
  );
}

export default App;

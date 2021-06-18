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
import Table from "./Components/Table";
import { SortData } from "./Components/sort";
import Chart from "./Components/Chart";
import LineGraph from "./Components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [casesType, setCasesType] = useState("cases");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng:  78.9629 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
       fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortdata = SortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortdata);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    // console.log("countryCode", countryCode);

    //  setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(7);
      });
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
          <Info
            title="CoronaVirus"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          <Info
            title="Recovered cases"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          <Info
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>

        <div>
          <Map  countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom} />
        </div>
      </div>
      <Card className="right">
        <h3> Live Cases </h3>
        <Table countries={tableData} />
        <h3> World Wide Cases </h3>
        {/* <Chart /> */}
        <LineGraph casesType={casesType}  />
      </Card>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import Logo from "../Assets/Logo.png";
import axios from "axios";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme } from "@mui/material/styles";
import "./location.css";

export const Location = () => {
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [status, setStatus] = useState();
  const [brewery, setBrewery] = useState([]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
    },
  });

  useEffect(() => {
    const getLocation = async () => {
      if (!navigator.geolocation) {
        setStatus("Geolocation is not supported by your browser");
      } else {
        setStatus(<CircularProgress />);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setStatus(null);
            setLat(position.coords.latitude);
            // console.log(position.coords.latitude);
            setLong(position.coords.longitude);
            // console.log(position.coords.longitude);
          },
          () => {
            setStatus("Unable to retrieve your location");
          }
        );
      }
    };
    getLocation();
  }, []);

  const fetchBrew = async () => {
    if (lat && long) {
      const res = await axios.get(
        `https://api.openbrewerydb.org/breweries?by_dist=${lat},${long}`
      );
      // console.log(res.data);
      setBrewery(res.data[0]);
    }
  };

  return (
    <div className="Container">
      <img src={Logo} className="Logo" alt="find-nearby-brewery-logo" />
      <h3 className="Area">Locating Area:</h3>
      <div className="Coordinates">{status}</div>
      {lat && <h4 className="Lat">Latitude: {lat}</h4>}
      {long && <h4 className="Long">Longitude: {long}</h4>}
      {brewery ? (
        <>
          <h2 className="Title">Name:</h2>
          <h4 className="Result">{brewery.name}</h4>
          <h2 className="Title">Address:</h2>
          <h4 className="Result">{brewery.street}</h4>
          <h2 className="Title">City:</h2>
          <h4 className="Result">{brewery.city}</h4>
          <h2 className="Title">State:</h2>
          <h4 className="ResultEnd">{brewery.state}</h4>
        </>
      ) : null}
      <Button
        onClick={fetchBrew}
        theme={theme}
        color="primary"
        variant="contained"
        className="test"
      >
        Find Brewery
      </Button>
    </div>
  );
};

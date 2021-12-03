import { useEffect, useState } from "react";
import axios from "axios";

export const Location = () => {
  const [lat, setLat] = useState();
  const [long, setLng] = useState();
  const [status, setStatus] = useState();
  const [brewery, setBrewery] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      if (!navigator.geolocation) {
        setStatus("Geolocation is not supported by your browser");
      } else {
        setStatus("Locating Area...");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setStatus(null);
            setLat(position.coords.latitude);
            // console.log(position.coords.latitude);
            setLng(position.coords.longitude);
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
    <div className="App">
      <h1>Find Nearby Brewery</h1>
      <h3>Coordinates</h3>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {long && <p>Longitude: {long}</p>}
      <button onClick={fetchBrew}>Find Nearest Brewery</button>
      {brewery ? (
        <>
          <h3>Name: "{brewery.name}"</h3>
          <h3>Address: "{brewery.street}"</h3>
          <h3>City: "{brewery.city}"</h3>
          <h3>State: "{brewery.state}"</h3>
        </>
      ) : null}
    </div>
  );
};

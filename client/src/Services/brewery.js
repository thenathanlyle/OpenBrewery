import axios from "axios";

export const getBrewery = async (latitude_id, longitude_id) => {
  try {
    const res = await api.get(
      `https://api.openbrewerydb.org/breweries?by_dist=${latitude_id},${longitude_id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

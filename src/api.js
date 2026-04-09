import axios from 'axios';

// We connect directly to the World Bank
const WB_BASE = "https://api.worldbank.org/v2";

export const fetchData = async (countries, indicator, startYear, endYear) => {
  try {
    // We join the countries with a semicolon, e.g., "KE;UG;MY"
    const countryString = countries.join(';');
    
    // We build the URL
    const url = `${WB_BASE}/country/${countryString}/indicator/${indicator}?format=json&date=${startYear}:${endYear}&per_page=300`;
    
    // We fetch the data
    const response = await axios.get(url);
    
    // World Bank returns data in [metadata, records]
    if (response.data && response.data.length === 2) {
      return response.data[1]; // Return just the records
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};import axios from 'axios';

const WB_BASE = "https://api.worldbank.org/v2";

export const fetchData = async (countries, indicator, startYear, endYear) => {
  try {
    const countryString = countries.join(';');
    const url = `${WB_BASE}/country/${countryString}/indicator/${indicator}?format=json&date=${startYear}:${endYear}&per_page=300`;
    
    // Add a timeout of 10 seconds
    const response = await axios.get(url, { timeout: 10000 });
    
    if (response.data && response.data.length === 2) {
      return response.data[1];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return empty array on error so chart doesn't crash
  }
};
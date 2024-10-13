import axios from "axios";
import { ENV_VARS } from "../CONFIG/envVars.js";



export async function fetchFromTMDB(url, retries = 3) {
	const options = {
	  headers: {
		accept: "application/json",
		Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`,
	  },
	  timeout: 5000, // Set a 5-second timeout
	};
  
	for (let attempt = 1; attempt <= retries; attempt++) {
	  try {
		const response = await axios.get(url, options);
		if (response.status === 200) {
		  return response.data;
		} else {
		  throw new Error(`Unexpected response status: ${response.status}`);
		}
	  } catch (error) {
		if (attempt === retries) {
		  if (error.response) {
			throw new Error(`TMDB Error: ${error.response.status} - ${error.response.statusText}`);
		  } else if (error.request) {
			throw new Error("No response received from TMDB");
		  } else {
			throw new Error(`Request setup error: ${error.message}`);
		  }
		}
		console.log(`Attempt ${attempt} failed. Retrying...`);
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
	  }
	}
  }



//TMDB auth

    /*   this is how we normally use fetch , but we are using axios
       in fetch we get the response and then we get the data from the response and return it
    const res = await fetch(url, options);
    const data = await res.json();
    return data; */
      

    
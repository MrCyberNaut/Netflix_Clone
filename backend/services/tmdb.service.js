
import axios from 'axios';
import { ENV_VARS } from "../CONFIG/envVars.js";

export const fetchFromTMDB = async (url) => {

    const options = {
        
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
        }
      };


      const response = await axios.get(url, options)

      if(response.status !== 200 ){
        throw new Error('Falied to get data from TMDB'+ response.statusText ); 
      }


   /*   this is how we normally use fetch , but we are using axios
       in fetch we get the response and then we get the data from the response and return it
    const res = await fetch(url, options);
    const data = await res.json();
    return data; */
     
      return response.data;
} 



//TMDB auth

  

    
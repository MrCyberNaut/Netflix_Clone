
import axios from 'axios';
import ENV_VARS from '../config/env_vars';

export const fetchFromTMDB = async (url) => {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
        }
      };


      const response = await axios.get(url, options)


   /*   this is how we normally use fetch , but we are using axios
       in fetch we get the response and then we get the data from the response and return it
    const res = await fetch(url, options);
    const data = await res.json();
    return data; */
     
      return response.data;
} 



//TMDB auth

  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
    
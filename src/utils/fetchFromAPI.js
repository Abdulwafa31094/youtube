import axios from 'axios';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
    method: 'GET',
    params: {
      maxResults: '50'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    // 'X-RapidAPI-Key': 'b654982283mshce8af1d07b94ec5p1e36d8jsn7d420d14f7f3',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    }
  };

  

 
  export const fetchFromAPI = async (url) => {
     const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    //  console.log(data);

     return data;
  };
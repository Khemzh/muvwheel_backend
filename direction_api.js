
// const axios = require('axios');

// const API_KEY = 'YOUR_API_KEY'; // Replace with your own API key

// async function getDirections(origin, destination) {
//   try {
//     return response.data.routes[0].legs[0].steps;
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Example usage:
// getDirections('New York, NY', 'Los Angeles, CA')
//   .then(steps => console.log(steps))
//   .catch(error => console.error(error));

const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/directions/json';

const origin = 'New York, NY';
const destination = 'Los Angeles, CA';

axios.get(BASE_URL, {
    params: {
      origin,
    mode: 'transit',
    transit_mode: 'bus',
            destination,
            key: API_KEY,
        },
    })
    .then((response) => {
        const routes = response.data.routes;
        // Use the response to make the map
        console.log(routes);
    })
    .catch((error) => {
        console.error('error to submit request:', error);
    });

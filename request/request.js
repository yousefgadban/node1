const axios = require('axios');
const request = require('postman-request');

// console.log('tesgt');

// const getData = async () => {

//     let response = await axios.get('https://api.chucknorris.io/jokes/random');
//     console.log(response.data);

// }

// getData()


request('https://api.chucknorris.io/jokes/random', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
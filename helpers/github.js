const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js')

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  console.log(username)
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  //get info from GITHUB API and then extract the data we want
  //at last, pass the data into database (also the callback function)
  request.get(options, function(err, response, body) {
    db.save(JSON.parse(body), callback);
  })

}

module.exports.getReposByUsername = getReposByUsername;
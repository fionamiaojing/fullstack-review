const request = require('request');
// const config = require('../config.js');
const db = require('../database/index.js')

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  console.log('username', username)
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.GITHUB_API_TOKEN || require('../config.js').TOKEN}`
    }
  };

  //get info from GITHUB API and then extract the data we want
  //at last, pass the data into database (also the callback function)
  request.get(options, function(err, response, body) {
    let newRepos = JSON.parse(body);
    db.find(function(data) {
      var toWriteToDB = [];
      var newR = 0;
      var updateR = 0;
      for (var i = 0; i < newRepos.length; i++) {
        var match = checkDuplicate(data, newRepos[i]);
        if (match === "Match") {
          continue;
        } else if (match === "Update") {
          //find and update one
          let query = {url: newRepos[i].url};
          db.Repo.findOneAndUpdate(query, newRepos[i])
          updateR++;
        } else {
          toWriteToDB.push(newRepos[i]);
          newR++;
        }
      }
      db.save(toWriteToDB, newR, updateR, callback);
    })
    
  })

}

let checkDuplicate = (oldDataArray, newData) => {
  for (var i = 0; i < oldDataArray.length; i++) {
    if (Number(oldDataArray[i]["repo_id"]) === Number(newData['id'])) {
      if (Date.parse(oldDataArray[i]["updated_at"]) === Date.parse(newData["updated_at"])){
        return "Match";
      } else {
        return "Update"
      }
    }
  }
  return "No Match";
}

// https://api.github.com/repos/octocat/Spoon-Knife/contributors
let getContributorByUserAndRepo = (username, repo) => {
  let options = {
    url: `https://api.github.com/repos/${username}/${repo}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, function(err, response, body) {
    let contributors = JSON.parse(body);

  })

}

module.exports.getReposByUsername = getReposByUsername;
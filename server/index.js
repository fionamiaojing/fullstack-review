const express = require('express');
const helper = require('../helpers/github.js')
const db = require('../database/index.js')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  let username = req.body.username;
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  helper.getReposByUsername(username, function() {
    res.status(201).send('Success');
  })
  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.find(function(data) {
    var existingRepo = {};
    var output = [];
    data.sort((a, b) => {
      Date.parse(b["updated_at"]) - Date.parse(a["updated_at"])
    })
    for (var i = 0; i < data.length; i++) {
      if (existingRepo.hasOwnProperty(data[i].url)) {
        continue
      } else {
        existingRepo[data[i].url] = true;
        output.push(data[i]);
      }
    }

    res.status(200).send(
      output.sort((a, b) => {
        return b["forks_count"] - a["forks_count"]
      }).slice(0, 25)
    );
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


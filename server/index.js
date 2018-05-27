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

  helper.getReposByUsername(username, function(newR, updateR) {
    var response = newR + ' ' + updateR;
    res.status(201).send(response);
  })
  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.find(function(data) {
    res.status(200).send(
      data.sort((a, b) => {
        return b["forks_count"] - a["forks_count"]
      }).slice(0, 25)
    );
  })

});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


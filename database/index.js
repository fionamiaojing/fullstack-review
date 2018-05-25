const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_name: String, //name
  repo_id: String, //id
  owner: String, //owner.login
  url: String, //html_url
  forks_count: Number, //forks_count
  updated_at: Date, //updated_at
});

let Repo = mongoose.model('RepoList', repoSchema);

let save = (repoInfoList, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  for (var i = 0; i < repoInfoList.length; i++) {
    const info = repoInfoList[i];
    const repo = new Repo({
      repo_name: info.name,
      repo_id: info.id,
      owner: info.owner.login,
      url: info.html_url,
      forks_count: info.forks_count,
      updated_at: info.updated_at
    })
    repo.save()
  }
  //call res.send()
  callback();
}

let find = (callback) => {
  Repo.find(function(err, data) {
    if (err) {
      console.log(err)
    } else {
      callback(data);
    }
  })
}

module.exports.save = save;
module.exports.find = find;
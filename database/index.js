const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fetcher");

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_name: String, //name
  repo_id: String, //id
  owner: String, //owner.login
  url: String, //html_url
  forks_count: Number, //forks_count
  updated_at: Date, //updated_at
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoInfoList, newR, updateR, callback) => {
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

  callback(newR, updateR);
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

//check how to mapping two tables in mongoose
//deepPopulate
let contributorSchema = mongoose.Schema({
    repo_id: String, //id
    repo_name: String, // reponame
    owner: String, // username
    contributor: [String] //login name of contributors
})

let contributor = mongoose.model('contributors', contributorSchema)

let saveCon = ({username, reponame, repoid, contributors}, callback) => {

}

module.exports ={
  Repo: Repo,
  save: save,
  find: find
};

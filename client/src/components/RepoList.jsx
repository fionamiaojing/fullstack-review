import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <p>{props.new} new repos imported, {props.update} repos updated</p>
    <div className="wrapper title">
        <p className="one">Username</p>
        <p className="two" >Repo Name</p>
        <p className="three">Fork Counts</p>
        <p className="four">Updated AT</p>
    </div>
    {props.repos.map((repo) => <RepoListEntry key={repo.repo_id}repo={repo}/>)}
  </div>
)

export default RepoList;
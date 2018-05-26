import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <p>{props.new} new repos imported, {props.update} repos updated</p>
    <table>
      <tbody>
          <tr className="title">
            <td className="one">Username</td>
            <td className="two" >Repo Name</td>
            <td className="three">Fork Counts</td>
            <td className="four">Updated AT</td>
          </tr>
        {props.repos.map((repo) => <RepoListEntry key={repo.repo_id}repo={repo}/>)}
      </tbody>
    </table>
    
  </div>
)

export default RepoList;
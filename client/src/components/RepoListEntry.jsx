import React from 'react';

const RepoListEntry = (props) => (
    <div className="wrapper">
        <p className="one">Username: {props.repo.owner}</p>
        <p className="two" ><a href={props.repo.url}>{props.repo.repo_name} </a></p>
        <p className="three">Fork_Counts: {props.repo.forks_count}</p>
        <p className="four">Updated_At: {props.repo.updated_at.split('T')[0]}</p>
    </div>
)

export default RepoListEntry;
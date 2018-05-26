import React from 'react';

const RepoListEntry = (props) => (
    <tr>
        <td className="one">{props.repo.owner}</td>
        <td className="two" ><a href={props.repo.url}>{props.repo.repo_name} </a></td>
        <td className="three">{props.repo.forks_count}</td>
        <td className="four">{props.repo.updated_at.split('T')[0]}</td>
    </tr>
)

export default RepoListEntry;
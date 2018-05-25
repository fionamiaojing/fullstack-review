import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      server: "http://localhost:1128"
    }
  }

  componentDidMount() {
    this.fetch();
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    this.send({'username': term});

  }

  send(data) {
    $.ajax({
      type: "POST",
      url: this.state.server + "/repos",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: (response) => {
        console.log(response)
        this.fetch();
      },
      fail: function(err) {
        console.error(err);
      }
    })
  }

  fetch() {
    $.ajax({
      type: "GET",
      url: this.state.server + "/repos",
      contentType: "application/json",
      success: (response) => {
        this.setState({
          repos: response
        })
      },
      fail: function(err) {
        console.error(err);
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
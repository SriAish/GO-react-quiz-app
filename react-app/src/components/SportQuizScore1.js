import React, { Component } from 'react';
import './ViewQuestion.css';

class SportQuizScore1 extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/score/sport/1');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h4 className="App-title">Sport Quiz 1</h4>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Genre</th>
              <th>Quiz</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.user}</td>
                      <td>{item.genre}</td>
                      <td>{item.quiz}</td>
                      <td>{item.score}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
       </div>
    );
  }
}

export default SportQuizScore1;

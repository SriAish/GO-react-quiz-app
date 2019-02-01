import React, { Component } from 'react';
import './ViewQuestion.css';

class ViewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/question/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
      {localStorage.getItem('IsAdmin') && <div>

        <header className="App-header">
          <h1 className="App-title">View All Questions</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Genre</th>
              <th>Question</th>
              <th>Answer 1</th>
              <th>Answer 2</th>
              <th>Answer 3</th>
              <th>Answer 4</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.genre}</td>
                      <td>{item.question}</td>
                      <td>{item.answer1}</td>
                      <td>{item.answer2}</td>
                      <td>{item.answer3}</td>
                      <td>{item.answer4}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
       </div>
   }
       </div>
    );
  }
}

export default ViewQuestion;

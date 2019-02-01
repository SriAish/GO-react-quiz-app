import React, { Component } from 'react';
import './DeleteQuestion.css';

class DeleteQuestion extends Component {
    //_______________________
    constructor() {
      super();
      this.state = {
        data: [],
        dlist: [],
      }
      this.handleRChange = this.handleRChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleRChange (event) {
      this.state.dlist.push(event.target.value);
    }

    handleSubmit (event) {
      event.preventDefault();
      var l = this.state.dlist.length;
      for(var i=0 ; i<l; i++)
      {
        fetch('http://localhost:8080/question/' + this.state.dlist[i], {
            method: 'delete',
          })
        .then(response => {
            if(response.status >= 200 && response.status < 300)   {
                  window.location.reload();
            }
          });
      }
    }

    componentDidMount() {
      const request = new Request('http://127.0.0.1:8080/question/');
      fetch(request)
        .then(response => response.json())
          .then(data => this.setState({data: data}));
    }
    //_________________________
  render() {
    return (
      <div className="App">
      {localStorage.getItem('IsAdmin') && <div>
        <header className="App-header">
          <h1 className="App-title">Delete a Question</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <table className="table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Genre</th>
                <th>Question</th>
                <th>Correct Answer</th>
                <th>Wrong Answer 1</th>
                <th>Wrong Answer 2</th>
                <th>Wrong Answer 3</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item, key) => {                 //on each element of array, function is run
                return (
                    <tr key = {key}>
                    <td>{item.id}</td>
                    <td>{item.genre}</td>
                    <td>{item.question}</td>
                    <td>{item.answer1}</td>
                    <td>{item.answer2}</td>
                    <td>{item.answer3}</td>
                    <td>{item.answer4}</td>
                    <td><input type="radio" value={item.id} onClick={this.handleRChange} /> </td>
                    </tr>
                  )
              })}
            </tbody>
        </table>
        <br/>
          <button type="submit" className="btn btn-default">Submit</button>
      </form>
      </div>
  }
      </div>
    );
  }
}

export default DeleteQuestion;

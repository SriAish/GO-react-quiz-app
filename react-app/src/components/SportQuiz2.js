import React, { Component } from 'react';
import './DeleteQuestion.css';

class SportQuiz2 extends Component {
    //_______________________
    constructor() {
      super();
      this.state = {
        formData: {
            user: localStorage.getItem('User'),
            genre: "sport",
            quiz: "2",
            score: "",
        },
        score: 0,
        data: [],
        submitted: false,
      }
      this.handleRChange = this.handleRChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleRChange (event) {
      this.state.dlist.push(event.target.value);
    }

    handleSubmit (event) {
      event.preventDefault();
      this.state.formData.score = String(this.state.score)
      fetch('http://localhost:8080/score', {
       method: 'POST',
       body: JSON.stringify(this.state.formData),
     })
     .then(response => {
       if(response.status >= 200 && response.status<300)
         this.setState({submitted: true});
     });

    }

    setAnswer(event) {
        if(event.target.value=="1"){
            this.state.score = this.state.score + 1;
        }
        else{
            this.state.score = this.state.score - 1;
        }
      }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/quiz/sport/2');
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }
    //_________________________
  render() {
    return (
      <div className="App">
      {!this.state.submitted && <div>
        <header className="App-header">
          <h4 className="App-title">Sport quiz 2</h4>
        </header>
        <form onSubmit={this.handleSubmit}>
            {this.state.data.map((item, key) => {                 //on each element of array, function is run
                return (
                    <div key = {key}>
                      <div class="page-header">
                        <h4>{item.question}</h4>
                      </div>
                      <div onChange={this.setAnswer.bind(this)}>
                        <div class="checkbox">
                            <label><input type="checkbox" value={item.a1} name={item.id}/> {item.answer1}</label>
                        </div>
                        <div class="checkbox">
                            <label><input type="checkbox" value={item.a2} name={item.id}/> {item.answer2}</label>
                        </div>
                        <div class="checkbox">
                            <label><input type="checkbox" value={item.a3} name={item.id}/> {item.answer3}</label>
                        </div>
                        <div class="checkbox">
                            <label><input type="checkbox" value={item.a4} name={item.id}/> {item.answer4}</label>
                        </div>
                      </div>
                    </div>
                  )
              })}
        <br/>
          <button type="submit" className="btn btn-default">Submit</button>
      </form>
      </div>
      }
      {this.state.submitted &&
          <div>
            <p>Score: {this.state.score}</p>
          </div>
      }
      </div>
    );
  }
}

export default SportQuiz2;

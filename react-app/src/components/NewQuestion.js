import React, { Component } from 'react';
import { Redirect } from 'react-router'
import './NewQuestion.css';
import ViewQuestion from'./ViewQuestion';

class NewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        genre: "",
        quiz: "",
        question: "",
        answer1: "",
        a1:"0",
        answer2: "",
        a2:"0",
        answer3: "",
        a3:"0",
        answer4: "",
        a4:"0",
      },
      gen: false,
      quizn: false,
      submitted: false,
    }
    this.handleGChange = this.handleGChange.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleAChange = this.handleAChange.bind(this);
    this.handle1Change = this.handle1Change.bind(this);
    this.handle2Change = this.handle2Change.bind(this);
    this.handle3Change = this.handle3Change.bind(this);
    this.handleR1Change = this.handleR1Change.bind(this);
    this.handleR2Change = this.handleR2Change.bind(this);
    this.handleR3Change = this.handleR3Change.bind(this);
    this.handleR4Change = this.handleR4Change.bind(this);
    this.handleMSubmit = this.handleMSubmit.bind(this);
    this.handleSSubmit = this.handleSSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handle1Submit = this.handle1Submit.bind(this);
    this.handle2Submit = this.handle2Submit.bind(this);
  }
  handleR1Change (event) {
    this.state.formData.a1 = '1';
  }
  handleR2Change (event) {
    this.state.formData.a2 = '1';
  }
  handleR3Change (event) {
    this.state.formData.a3 = '1';
  }
  handleR4Change (event) {
    this.state.formData.a4 = '1';
  }
  handleMSubmit (event) {
    event.preventDefault();
    this.setState({gen: true});
    this.state.formData.genre = 'movie';
  }
  handleSSubmit (event) {
    event.preventDefault();
    this.setState({gen: true});
    this.state.formData.genre = 'sport';
  }
  handle1Submit (event) {
    event.preventDefault();
    this.setState({quizn: true});
    this.state.formData.quiz = '1';
  }
  handle2Submit (event) {
    event.preventDefault();
    this.setState({quizn: true});
    this.state.formData.quiz = '2';
  }
  handleSubmit (event) {
    event.preventDefault();
    console.log(this.state.formData)
    fetch('http://localhost:8080/question', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          console.log('here');
          this.setState({submitted: true});
      });
  }

  handleGChange(event) {
    this.state.formData.genre = event.target.value;
  }
  handleQChange(event) {
    this.state.formData.question = event.target.value;
  }
  handleAChange(event) {
    this.state.formData.answer1 = event.target.value;
  }
  handle1Change(event) {
    this.state.formData.answer2 = event.target.value;
  }
  handle2Change(event) {
    this.state.formData.answer3 = event.target.value;
  }
  handle3Change(event) {
    this.state.formData.answer4 = event.target.value;
  }

  render() {

    return (
        <div className="App">
        {!this.state.gen && localStorage.getItem('IsAdmin') && <div>
            <header className="App-header">
              <h1 className="App-title">Create a New Question</h1>
            </header>
            <br/><br/>
            <div className="formContainer">
              <form onSubmit={this.handleMSubmit}>
                <button type="submit" className="btn btn-default">Movie</button>
              </form>
              <form onSubmit={this.handleSSubmit}>
                <button type="submit" className="btn btn-default">Sport</button>
              </form>
            </div>
            </div>
        }
        {!this.state.submitted && this.state.gen && !this.state.quizn && <div>
            <header className="App-header">
              <h1 className="App-title">Create a New Question</h1>
            </header>
            <br/><br/>
            <div className="formContainer">
              <form onSubmit={this.handle1Submit}>
                <button type="submit" className="btn btn-default">1</button>
              </form>
              <form onSubmit={this.handle2Submit}>
                <button type="submit" className="btn btn-default">2</button>
              </form>
            </div>
            </div>
        }
        {!this.state.submitted && this.state.gen && this.state.quizn && <div>
            <header className="App-header">
              <h1 className="App-title">Create a New Question</h1>
            </header>
            <br/><br/>
            <div className="formContainer">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Question</label>
                    <input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange} required/>
                </div>
                <div className="form-group">
                    <label>Answer 1</label>
                    <input type="text" className="form-control" value={this.state.answer1} onChange={this.handleAChange} required/>
                    <input type="radio" value={this.state.a1} onClick={this.handleR1Change} /> Correct
                </div>
                <div className="form-group">
                    <label>Answer 2</label>
                    <input type="text" className="form-control" value={this.state.answer2} onChange={this.handle1Change} required/>
                    <input type="radio" value={this.state.a2} onClick={this.handleR2Change} /> Correct
                </div>
                <div className="form-group">
                    <label>Answer 3</label>
                    <input type="text" className="form-control" value={this.state.answer3} onChange={this.handle2Change} required/>
                    <input type="radio" value={this.state.a3} onClick={this.handleR3Change} /> Correct
                </div>
                <div className="form-group">
                    <label>Wrong Answer 4</label>
                    <input type="text" className="form-control" value={this.state.answer4} onChange={this.handle3Change} required/>
                    <input type="radio" value={this.state.a4} onClick={this.handleR4Change} /> Correct
                </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                  </form>
                </div>
                </div>
        }
        {this.state.submitted &&
            <ViewQuestion />
        }
        </div>

    );
  }
}

export default NewQuestion;

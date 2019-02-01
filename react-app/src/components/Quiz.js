import React, { Component } from 'react';
import './NewQuestion.css';
import MovieQuiz1 from'./MovieQuiz1';
import MovieQuiz2 from'./MovieQuiz2';
import SportQuiz1 from'./SportQuiz1';
import SportQuiz2 from'./SportQuiz2';

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      sport: false,
      movie: false,
      quiz1: false,
      quiz2: false,
    }
    this.handleMSubmit = this.handleMSubmit.bind(this);
    this.handleSSubmit = this.handleSSubmit.bind(this);
    this.handle1Submit = this.handle1Submit.bind(this);
    this.handle2Submit = this.handle2Submit.bind(this);
  }

  handleMSubmit (event) {
    event.preventDefault();
    this.setState({movie: true});
  }
  handleSSubmit (event) {
    event.preventDefault();
    this.setState({sport: true});
  }
  handle1Submit (event) {
    event.preventDefault();
    this.setState({quiz1: true});
  }
  handle2Submit (event) {
    event.preventDefault();
    this.setState({quiz2: true});
  }

  render() {

    return (
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quiz</h1>
        </header>
        {!this.state.sport && !this.state.movie && localStorage.getItem('User') && <div>
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
        {(this.state.sport || this.state.movie) && !this.state.quiz1 && !this.state.quiz2 && <div>
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
        {this.state.movie && this.state.quiz1 &&
            <MovieQuiz1 />
        }
        {this.state.movie && this.state.quiz2 &&
            <MovieQuiz2 />
        }
        {this.state.sport && this.state.quiz1 &&
            <SportQuiz1 />
        }
        {this.state.sport && this.state.quiz2 &&
            <SportQuiz2 />
        }
        </div>

    );
  }
}

export default Quiz;

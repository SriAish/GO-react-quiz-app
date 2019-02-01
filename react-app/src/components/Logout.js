import React, { Component } from 'react';
import './NewQuestion.css';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    localStorage.setItem('User','');
    this.setState({submitted: true});
    localStorage.setItem('IsAdmin','');
    window.location.reload();
  }

  render() {

    return (
        <div className="App">
        {!this.state.submitted && localStorage.getItem('User') && <div>
        <header className="App-header">
          <h1 className="App-title">Logout {localStorage.getItem('User')}?</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
                <button type="submit" className="btn btn-default">Logout</button>
          </form>
        </div>
        </div>
        }
        {this.state.submitted &&
            <div>
              <h2>
                You have {localStorage.getItem('User')} logged out.
              </h2>
            </div>
        }
        </div>
    );
  }
}

export default Login;

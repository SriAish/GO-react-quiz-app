import React, { Component } from 'react';
import './NewQuestion.css';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: "",
        password: "",
      },
      submitted: false,
      npos: false,
    }
    this.handleNChange = this.handleNChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/user', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status == 200)
          this.setState({submitted: true});
         else {
             this.setState({npos: true});
         }
      });
  }

  handleNChange(event) {
    this.state.formData.name = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }

  render() {

    return (
      <div className="App">
      {!this.state.submitted && !localStorage.getItem('User') && <div>
        <header className="App-header">
          <h1 className="App-title">Create a New Question</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleNChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="text" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              User successfully added.
            </h2>
          </div>
        }
        {this.state.npos &&
          <div>
            <h2>
              User name taken.
            </h2>
            <p> Reload the page and use different username</p>
          </div>
        }
        </div>
    }

      </div>
    );
  }
}

export default Register;

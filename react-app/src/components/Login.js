import React, { Component } from 'react';
import './NewQuestion.css';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      formData: {
        name: "",
        password: "",
      },
      submitted: false,
    }
    this.handleNChange = this.handleNChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    const request = new Request('http://localhost:8080/userLog');
    fetch(request, {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
      })
         .then(response => {
           if(response.status == 200){
           localStorage.setItem('User',this.state.formData.name);
           localStorage.setItem('LoggedIn','1');
        }
            if(this.state.formData.name == 'admin'){
                localStorage.setItem('IsAdmin','Yes')
            }
            window.location.reload();
            this.setState({submitted: true});
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
          <h1 className="App-title">Login</h1>
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
        </div>
        }
        {this.state.submitted && !localStorage.getItem('User') &&
            <div>
              <h2>
                Wrong User name or password.
              </h2>
            </div>
        }
        {this.state.submitted && localStorage.getItem('User') &&
            <div>
              <h2>
                {localStorage.getItem('User')} logged in.
              </h2>
            </div>
        }
        </div>
    );
  }
}

export default Login;

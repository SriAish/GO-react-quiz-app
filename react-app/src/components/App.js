import React, { Component } from 'react';
import DeleteQuestion from './DeleteQuestion';
import ViewQuestion from './ViewQuestion';
import NewQuestion from './NewQuestion';
import Quiz from './Quiz';
import QuizScores from './QuizScores';
import LeaderBoard from './LeaderBoard';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Home from './Home';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <div className="App">
        {localStorage.getItem('IsAdmin') && <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/NewQuestion'}>Create Question</Link></li>
                  <li><Link to={'/DeleteQuestion'}>Delete Question</Link></li>
                  <li><Link to={'/ViewQuestion'}>View Question</Link></li>
                  <li><Link to={'/Quiz'}>Quiz</Link></li>
                  <li><Link to={'/QuizScores'}>QuizScores</Link></li>
                  <li><Link to={'/LeaderBoard'}>LeaderBoard</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
                  <li><Link to={'/Logout'}>Logout</Link></li>
                  <li><Link to={'/Register'}>Sign Up</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/NewQuestion' component={NewQuestion} />
                 <Route exact path='/DeleteQuestion' component={DeleteQuestion} />
                 <Route exact path='/ViewQuestion' component={ViewQuestion} />
                 <Route exact path='/Quiz' component={Quiz} />
                 <Route exact path='/QuizScores' component={QuizScores} />
                 <Route exact path='/LeaderBoard' component={LeaderBoard} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/Logout' component={Logout} />
                 <Route exact path='/Register' component={Register} />
            </Switch>
          </div>
        </Router>
      </div>
  }
  {!localStorage.getItem('IsAdmin') && <div>
      <Router>
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to={'/'}>React App</Link>
              </div>
              <ul className="nav navbar-nav">
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/Quiz'}>Quiz</Link></li>
                <li><Link to={'/QuizScores'}>QuizScores</Link></li>
                <li><Link to={'/LeaderBoard'}>LeaderBoard</Link></li>
                <li><Link to={'/Login'}>Login</Link></li>
                <li><Link to={'/Logout'}>Logout</Link></li>
                <li><Link to={'/Register'}>Sign Up</Link></li>
              </ul>
            </div>
          </nav>
          <Switch>
               <Route exact path='/' component={Home} />
               <Route exact path='/Quiz' component={Quiz} />
               <Route exact path='/QuizScores' component={QuizScores} />
               <Route exact path='/LeaderBoard' component={LeaderBoard} />
               <Route exact path='/Login' component={Login} />
               <Route exact path='/Logout' component={Logout} />
               <Route exact path='/Register' component={Register} />
          </Switch>
        </div>
      </Router>
    </div>
    }
    </div>
    );
  }
}

export default App;

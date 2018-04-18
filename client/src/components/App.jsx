import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import SignUp from './SignUp.jsx'
import Login from './Login.jsx'
import Search from './Search.jsx'
import Main from './Main.jsx'
import WorkoutSchedule from './WorkoutSchedule.jsx'
import DailyEntry from './DailyEntry.jsx'

class App extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      workouts: [],
    }

    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.getWorkouts = this.getWorkouts.bind(this)
  }

  componentDidMount() {
    this.getWorkouts()
    console.log('checking if user is logged in')
    axios.get('/isloggedin')
    .then((response) => {
      console.log('user is logged in: ', response.data);
      this.setState({isLoggedIn: response.data});
    })
  }

  getWorkouts() {
    axios.get('/exercises')
      .then((response)=> {
        console.log('my response from server', response)
        this.setState({
          workouts: []
        })
      })
      .catch((err) => {
        console.log('There was an error getting workouts list')
      })
  }


  handleLogin(username, password, cb) {
    console.log('attempting to login with credentails', username, password);
    axios.post('/login', {username: username, password: password})
      .then((logInResponse) => {
        console.log('Login reponse', logInResponse)
        this.setState({
          isLoggedIn : true
        });
        cb();
      })
      .catch((err)=> {
        console.log('There was an error signing in')
      })
  }


  handleRegister(firstName, lastName, username, password, email, cb) {
    axios.post('/signup', {firstName: firstName, lastName: lastName, username: username, password: password, email: email})
      .then((registrationResponse) => {
          console.log('registration response from signing up', registrationResponse)
          this.setState({
          isLoggedIn: true
        })
        cb();
      })
      .catch((err)=> {
        console.log("There was an error registering user", err)
      })
  }

  handleLogout() {
    axios.post('/logout')
    .then(res => {
      this.setState({isLoggedIn: false});
    })
  }


  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact={true} path='/' component={(props)=><Redirect {...props} to='/signup'/>}/>
            <Route path='/signup' component={(props) => <SignUp {...props} isLoggedIn={this.state.isLoggedIn} handleRegister={this.handleRegister} />}/>
            <Route path='/login' component={(props) => <Login {...props}  isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} />}/>
            <Route path='/main' component={(props)=> <Main {...props} handleLogout={this.handleLogout} workouts={this.state.workouts} />}/>
          </div>
        </Router>
      </div>
    )
  }

}

export default App

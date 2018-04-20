import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import SignUp from './SignUp.jsx'
import Login from './Login.jsx'
import Search from './Search.jsx'
import Main from './Main.jsx'
import WorkoutFeed from './WorkoutsFeed.jsx'
import DailyEntry from './DailyEntry.jsx'

class App extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      exercises: [],
      savedWorkouts: [],
      muscle: '',
      type: '',
      userId: '',
      allWorkouts: [],
    }

    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.getExercises = this.getExercises.bind(this)
    this.filterMuscle = this.filterMuscle.bind(this)
    this.filterType = this.filterType.bind(this)
    this.createWorkout = this.createWorkout.bind(this)
    this.getWorkouts = this.getWorkouts.bind(this)
    this.getStoredWorkouts = this.getStoredWorkouts.bind(this)
  }

  componentDidMount() {
    this.getExercises()
    this.getWorkouts()
    this.getStoredWorkouts()
    console.log('checking if user is logged in')
    axios.get('/isloggedin')
    .then(({data}) => {
      console.log('user is logged in: ', data);
      this.setState({
        isLoggedIn: data
      });
    })
  }

  filterType(type) {
    axios.post('/type', {type: type})
      .then((response) => {
        console.log(type)
        this.setState({

          exercises: response.data,
          type: type
        })
      })
      .catch((err) => {
        console.log('Error filtering by type', err)
      })
  }

  filterMuscle(muscle) {
    axios.post('/muscle', {muscle: muscle})
      .then((response) => {
        console.log('response in app', response)
        this.setState({
          exercises: response.data,
          muscle: muscle
        })
      })
      .catch((err) => {
        console.log('Error filtering by muscle', err)
      })
  }

  getExercises() {
    axios.get('/exercises')
      .then((response)=> {
        console.log('response in get exercises',response)
        this.setState({
          exercises: response.data,
          muscle: response.data[0].muscleGroup,
          type: response.data[0].type
        })
      })
      .catch((err) => {
        console.log('There was an error getting workouts list', err)
      })
  }

  getWorkouts() {
    axios.get('/getWorkouts')
      .then((response) => {
        console.log('response for workouts from server', response)
        this.setState({
          savedWorkouts: response.data
        }, ()=> console.log('saved workouts', this.state.savedWorkouts))
      })
      .catch((err)=> {
        console.log('Error retrieving saved workouts', err)
      })
  }

  getStoredWorkouts() {
    axios.get('/storedWorkouts')
      .then((response)=> {
        console.log('response from server from savedexercisesworkouts')
        this.setState({
          allWorkouts: response.data
        }, ()=> console.log('all of users stored workouts are here', this.state.allWorkouts))
      })
      .catch((err)=> {
        console.log('YOU DUN GOT NO EXERCISES IN YOUR WORKOUTS', err)
      })
  }

  createWorkout(workoutName) {
    axios.post('/workout', {workoutName: workoutName})
      .then((response)=> {
        this.getWorkouts()
      })
      .catch((err)=> {
        console.log('Could not create a workout for you')
      })
  }


  handleLogin(username, password, cb) {
    console.log('attempting to login with credentails', username, password);
    axios.post('/login', {username: username, password: password})
      .then(({data}) => {
        this.setState({
          isLoggedIn : true,
          userId: data
        }, ()=> console.log(this.state.isLoggedIn));
        cb();
        //am i redirecting before the state is set to true?
      })
      .catch((err)=> {
        console.log('There was an error signing in', err)
      })
  }

  handleRegister(firstName, lastName, username, password, email, cb) {
    axios.post('/signup', {firstName: firstName, lastName: lastName, username: username, password: password, email: email})
      .then(({data}) => {
        this.setState({
          isLoggedIn: true,
          userId: data
        }, cb())

      })
      .catch((err)=> {
        console.log("There was an error registering user", err)
      })
  }

  handleLogout() {
    axios.post('/logout')
    .then(res => {
      console.log(res)
      this.setState({
        isLoggedIn: false
      }, ()=> console.log('login status:', this.state.isLoggedIn));
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
            <Route path='/main' component={(props)=> <Main {...props} savedWorkouts={this.state.savedWorkouts}
             handleLogout={this.handleLogout}
             exercises={this.state.exercises}
             filterMuscle={this.filterMuscle}
             filterType={this.filterType}
             muscle={this.state.muscle}
             createWorkout={this.createWorkout}
             savedWorkouts={this.state.savedWorkouts}
             handleLogout={this.handleLogout}
             allWorkouts={this.state.allWorkouts}
            />}/>

          </div>
        </Router>
      </div>
    )
  }

}

export default App

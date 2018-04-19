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
      exercises: [],
      savedWorkouts: [],
      muscle: '',
      type: ''
    }

    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.getExercises = this.getExercises.bind(this)
    this.filterMuscle = this.filterMuscle.bind(this)
    this.filterType = this.filterType.bind(this)
    this.createWorkout = this.createWorkout.bind(this)
    this.getWorkouts = this.getWorkouts.bind(this)
  }

  componentDidMount() {
    this.getExercises()
    this.getWorkouts()
    console.log('checking if user is logged in')
    axios.get('/isloggedin')
    .then((response) => {
      console.log('user is logged in: ', response.data);
      this.setState({isLoggedIn: response.data});
    })
  }

  filterType(type) {
    axios.post('/type', {type: type})
      .then((response) => {
        console.log('response for filtering by type', response)
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
        }, ()=> console.log(this.state.savedWorkouts))
      })
      .catch((err)=> {
        console.log('Error retrieving saved workouts', err)
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

  addExercise(exercise, sets, reps) {
    axios.post('/addExercise', {exercise: exercise, sets:sets, reps: reps})
      .then((response)=> {

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
            <Route path='/main' component={(props)=> <Main {...props} savedWorkouts={this.state.savedWorkouts}
             handleLogout={this.handleLogout}
             exercises={this.state.exercises}
             filterMuscle={this.filterMuscle}
             filterType={this.filterType}
             muscle={this.state.muscle}
             createWorkout={this.createWorkout}
             savedWorkouts={this.state.savedWorkouts}
            />}/>
          </div>
        </Router>
      </div>
    )
  }

}

export default App

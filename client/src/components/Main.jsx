import React from 'react'
import { Redirect, Route, Link, Switch } from 'react-router-dom'
import axios from 'axios'
import Login from './Login.jsx'
import Search from './Search.jsx'
import WorkoutsFeed from './WorkoutsFeed.jsx'
import DailyEntry from './DailyEntry.jsx'

class Main extends React.Component{
  constructor(props) {
    super(props)

    this.state = {

    }
    this.handleLogout = props.handleLogout
    this.sendToLogin = this.sendToLogin.bind(this)
  }

  sendToLogin() {
    this.props.history.push('/login')
  }

  render() {
    if (this.props.isLoggedIn === true) {
      return <Redirect to='/login' />
    }
    return (
      <div>
      <Search exercises={this.props.exercises}
       filterMuscle={this.props.filterMuscle}
       filterType={this.props.filterType}
       muscle={this.props.muscle}
       createWorkout={this.props.createWorkout}
       savedWorkouts={this.props.savedWorkouts}
       handleWorkoutChange={this.props.handleWorkoutChange}
       />
      <WorkoutsFeed workouts={this.props.savedWorkouts}/>
      <br/>
      <button onClick={()=> this.props.handleLogout()}>Log Out</button>
      </div>
    )
  }

}

export default Main

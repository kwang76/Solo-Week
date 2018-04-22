import React from 'react'
import { Redirect, Route, Link, Switch } from 'react-router-dom'
import axios from 'axios'
import Login from './Login.jsx'
import Search from './Search.jsx'
import WorkoutsFeed from './WorkoutsFeed.jsx'
import WorkoutEntry from './WorkoutEntry.jsx'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class Main extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    const {isLoggedIn} = this.props.isLoggedIn

    if (isLoggedIn) {
      return <Redirect to='/main' />
    }

    console.log('my props', this.props.allWorkouts)
    return (
      <div>
      <AppBar
        title="Welcome!"
        showMenuIconButton= {false}
        iconElementRight={<FlatButton label="Log Out" onClick={()=> this.props.handleLogout()}/>}
      />
      <Search exercises={this.props.exercises}
       filterMuscle={this.props.filterMuscle}
       filterType={this.props.filterType}
       muscle={this.props.muscle}
       createWorkout={this.props.createWorkout}
       savedWorkouts={this.props.savedWorkouts}
       handleWorkoutChange={this.props.handleWorkoutChange}
       getStoredWorkouts={this.props.getStoredWorkouts}
       />
      <br/>
      <br/>
      <WorkoutsFeed allWorkouts={this.props.allWorkouts}
      deleteWorkout={this.props.deleteWorkout}
      deleteExercise={this.props.deleteExercise}
      />
      <br/>
      </div>
    )
  }
}

export default Main
      // <button onClick={()=> this.props.handleLogout()}>Log Out</button>

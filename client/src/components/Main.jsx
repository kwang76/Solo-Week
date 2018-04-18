import React from 'react'
import { Redirect, Route, Link, Switch } from 'react-router-dom'
import axios from 'axios'
import Login from './Login.jsx'
import Search from './Search.jsx'
import WorkoutSchedule from './WorkoutSchedule.jsx'
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
    if (this.props.isLoggedIn) {
      return <Redirect to='/login' />
    }
    return (
      <div>
      <Search workouts={this.props.workouts} />
      <WorkoutSchedule workouts={this.props.workouts}/>
      <DailyEntry />
      </div>
    )
  }

}

export default Main

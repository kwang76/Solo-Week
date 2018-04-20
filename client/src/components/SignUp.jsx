import React from 'react'
import ReactDOM from 'react-dom'
import { Redirect, Route, Link, Switch } from 'react-router-dom';
import Main from './Main.jsx'
import Login from './Login.jsx'

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: ''
    }

    this.handleRegister = props.handleRegister
    this.handleClick = this.handleClick.bind(this)
    this.onFirstChange = this.onFirstChange.bind(this)
    this.onLastChange = this.onLastChange.bind(this)
    this.onUserChange = this.onUserChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
  }

  onFirstChange(e) {
    this.setState({ firstName: e.target.value })
  }

  onLastChange(e) {
    this.setState({ lastName : e.target.value })
  }

  onUserChange(e) {
    this.setState({ username : e.target.value })
  }

  onPasswordChange(e) {
    this.setState({ password : e.target.value })
  }

  onEmailChange(e) {
    this.setState({ email : e.target.value })
  }

  handleClick() {
    this.submit(this.state.firstName, this.state.lastName, this.state.username, this.state.password, this.state.email)
  }

  submit(firstName, lastName, username, password, email, cb) {
    this.handleRegister(firstName, lastName, username, password, email, ()=> {
      this.props.history.push('/main')
    })
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to='/main' />
    }
    return (
      <div>
        <h2>Welcome to Weekly Workouts!</h2>
        <div>
        <input value={this.state.firstName} onChange={this.onFirstChange} placeholder={'First Name'} />
        <input value={this.state.lastName} onChange={this.onLastChange} placeholder={'Last Name'} />
        <br/>
        <br/>
        <input value={this.state.username} onChange={this.onUserChange} placeholder={'Username'} />
        <br/>
        <br/>
        <input value={this.state.password} onChange={this.onPasswordChange} placeholder={'Password'} />
        <br/>
        <br/>
        <input value={this.state.email} onChange={this.onEmailChange} placeholder={'Email'}/>
        <br/>
        <br/>
        <button onClick={this.handleClick}> Sign Me Up </button>
        </div>
        <br/>
        <br/>
        <br/>

      </div>
    )

  }

}

export default SignUp

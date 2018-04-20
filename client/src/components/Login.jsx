import React from 'react'
import axios from 'axios'
import { Redirect, Route, Link, Switch } from 'react-router-dom'
import SignUp from './SignUp.jsx'
import Main from './Main.jsx'

class Login extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
    this.handleLogin = props.handleLogin
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.submitCredentials = this.submitCredentials.bind(this)
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      this.submitCredentials(this.state.username, this.state.password)
    }
  }

  handleClick() {
    this.submitCredentials(this.state.username, this.state.password)
  }

  submitCredentials() {
    this.handleLogin(this.state.username, this.state.password, ()=> {
      this.props.history.push('/main')
    })
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to='/main' />
    }
    return (
      <div>
        <h2> Log In </h2>
        <input value={this.state.username} onChange={this.onUsernameChange} placeholder={'Username'}/>
        <br/>
        <br/>
        <input value={this.state.password} onChange={this.onPasswordChange} onKeyPress={this.handleKeyPress} placeholder={'Password'} />
        <br/>
        <br/>
        <button onClick={this.handleClick}>Login</button>
      </div>
    )
  }


}

export default Login

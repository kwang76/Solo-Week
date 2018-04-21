import React from 'react'
import axios from 'axios'
import { Redirect, Route, Link, Switch } from 'react-router-dom'
import SignUp from './SignUp.jsx'
import Main from './Main.jsx'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const loginbutton = {
  width: '260px'
}

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
    this.handleSignUp = this.handleSignUp.bind(this)
    this.sendToSignup = this.sendToSignup.bind(this)
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

  handleSignUp() {
    this.sendToSignup()
  }

  sendToSignup() {
    this.props.history.push('/signup')
  }


  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to='/main' />
    }
    return (
      <div>
        <h2> Log in to your account </h2>
        <TextField hintText="Username" floatingLabelText="Username" value={this.state.username} onChange={this.onUsernameChange}/>
        <br/>
        <TextField hintText="Password" floatingLabelText="Password" value={this.state.password} onChange={this.onPasswordChange} onKeyPress={this.handleKeyPress}/>
        <br/>
        <br/>
        <RaisedButton label="Login" style={loginbutton} onClick={this.handleClick} />
        <br/>
        <br/>
        <RaisedButton label="New to us? Sign Up Here!" style={loginbutton} onClick={this.handleSignUp}/>
      </div>
    )
  }


}

export default Login

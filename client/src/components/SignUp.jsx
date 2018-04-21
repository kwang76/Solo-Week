import React from 'react'
import ReactDOM from 'react-dom'
import { Redirect, Route, Link, Switch } from 'react-router-dom';
import Main from './Main.jsx'
import Login from './Login.jsx'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

const style ={
  color: '#1DA1F2'
}
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
      <div className="home">
        <h2>Welcome to Weekly Workouts!</h2>
        <div className="home-container">

          <div className="home-container-signUp">
              <h2 style={style}> Sign Up Here</h2>
            <TextField
            hintText="First Name"
            floatingLabelText="First Name"
            value={this.state.firstName} onChange={this.onFirstChange}
            />
            <TextField
            hintText="Last Name"
            floatingLabelText="Last Name"
            value={this.state.lastName} onChange={this.onLastChange}
            />
            <br/>
            <TextField
            hintText="Username"
            floatingLabelText="Username"
            value={this.state.username} onChange={this.onUserChange}
            />
            <br/>
            <TextField
            hintText="Password"
            floatingLabelText="Password"
            value={this.state.password} onChange={this.onPasswordChange}
            />
            <br/>
            <TextField
            hintText="@Email"
            floatingLabelText="Email"
            value={this.state.email} onChange={this.onEmailChange}
            />
            <br/>
            <br/>
            <RaisedButton label="Sign Me Up!" onClick={this.handleClick}/>
          </div>
        </div>
      </div>
    )

  }

}

export default SignUp

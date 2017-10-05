import React from 'react'
import APIHelpers from '../../helpers/API.js';

import './Login.sass'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.username.trim() !== '' && this.state.password.trim() !== ''){
      APIHelpers.login(this.state.username, this.state.password, '/Exercise');
    }
  }

  render() {
    return (
      <form id="Login" onSubmit={this.handleSubmit}>
        <div id="usernameWrapper">
          <input name="username" type="text" placeholder="Username" required 
            value={this.state.username} onChange={this.handleChange} />
        </div>
        
        <div id="passwordWrapper">
          <input name="password" type="password" placeholder="Password" required 
            value={this.state.password} onChange={this.handleChange} />
        </div>
  
        <button id="login">
            <span type="submit">Login</span>
        </button>
      </form>
    );
  }
}
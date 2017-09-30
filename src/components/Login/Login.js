import React, { Component } from 'react'
import '../../Global.sass'
import './Login.sass'

export default class Login extends Component {
  handleSubmit(event) {
    
    event.preventDefault();
  }
  
  render() {
    return (
      <div id="Login">
        <div id="usernameWrapper">
          <input id="username" type="text" placeholder="Username" required />
        </div>
        
        <div id="passwordWrapper">
          <input id="password" type="password" placeholder="Password" required />
        </div>

        <button id="login">
            <span id="LoginText">Login</span>
        </button>
      </div>
    );
  }
}        
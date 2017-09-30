import React from 'react'
import './Login.sass'

export class Login extends React.Component {
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
    // Call an API to login with this.state.username and this.state.password
    e.preventDefault();
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
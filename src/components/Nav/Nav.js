import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.sass'

export default class Nav extends Component {
  render() {
    return (
      <ul id="Nav">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/Progress'>Progress</Link></li>
        <li><Link to='/Add'>Add</Link></li>
      </ul>
    );
  }
}        
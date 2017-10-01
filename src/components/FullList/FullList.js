import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
//import APIHelpers from '../../helpers/API.js'
import Details from '../Details/Details'

import './FullList.sass';

export default class FullList extends Component {
  render() {
    return (
      <div id="FullList">
      <Route path={`exercise/:exerciseId`} component={Details}/>
        {
          this.props.data.map((exercise)=>
          <Link to={{pathname: `exercise/${exercise._id}`, query: { id: exercise._id }}} key={exercise._id} >
          <div className="exercise">
            <li className="title">{exercise.title}</li>
            <li className="weight">
              <label>Weight: </label>
              <span>{exercise.weight}</span>
            </li>
            <li className="reps">
              <label>Reps: </label>
              <span>{exercise.reps}</span>
            </li>
          </div>
          </Link>
          )
        }
      </div>
    );
  }
}        
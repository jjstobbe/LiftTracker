import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
//import APIHelpers from '../../helpers/API.js'
import Details from '../Details/Details'

import './FullList.sass';

export default class FullList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
    }
  }

  componentDidMount() {
    //Example data to not hit the API a lot.
    this.setState({
      exercises: [{
        title: 'Benchpress',
        weight: 420,
        reps: 10,
        date: new Date(),
        _id: '59d079cc57f0e7db0452cbd7'
      },{
        title: 'Squats',
        weight: 420,
        reps: 10,
        date: new Date(),
        _id: '123'
      }]
    });
    /*
    var promise = APIHelpers.getAllExercises();
    promise.then((data) => {
      console.log(data);
      this.setState({
        exercises: data
      });
    });*/
  }

  render() {
    return (
      <div id="FullList">
      <Route path={`exercise/:exerciseId`} component={Details}/>
        {
          this.state.exercises.map((exercise)=>
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
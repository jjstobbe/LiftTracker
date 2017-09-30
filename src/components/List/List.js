import React, { Component } from 'react'
import APIHelpers from '../../helpers/API.js'

import './List.sass';

export default class List extends Component {
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
        _id: 1
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
      <div className="List">
        {
          this.state.exercises.map((exercise)=>
            <li key={exercise._id}>{exercise.weight}</li>)
        }
      </div>
    );
  }
}        
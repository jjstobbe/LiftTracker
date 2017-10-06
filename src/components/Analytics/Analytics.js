import React, { Component } from 'react'
import APIHelpers from '../../helpers/API.js'

import DisplayExercise from './DisplayExercise'

import './Analytics.sass'

export default class Analytics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [],
      selectedExercise: {},
      maxWeight: {},
      maxReps: {}
    };

    this.getMaxExercise = this.getMaxExercise.bind(this);
    this.getRateOfChange = this.getRateOfChange.bind(this);
  }

  componentDidMount() {
    APIHelpers.getAllExercises().then((data) => {
      this.setState({
        maxWeight: this.getMaxExercise(data, 'weight'),
        maxReps: this.getMaxExercise(data, 'reps'),
        selectedExercise: data[0]
      });

      this.getRateOfChange(data[0]);
    });
  }

  getRateOfChange(exercise) {
    var slopes = [];
    for(var i = 0;i<exercise.weight.length-1;i++){
      slopes.push(exercise.weight[i+1] - exercise.weight[i]);
    }
    
    // Returns the average of slopes
    return (slopes.reduce((prev, current) => current += prev) / slopes.length)
  }

  //Generic function to get the exercise of max field
  getMaxExercise(data, field) {
    var max = data[0][field][0];
    var maxObject = data[0];

    for(var i = 0;i<data.length;i++){
      for(var j = 0;j<data[i][field].length;j++){
        if(data[i][field][j] > max){
          max = data[i][field][j];
          maxObject = data[i];
        }
      }
    }

    return maxObject;
  }

  render() {
    return (
      <div id="Analytics">
        <h1>Analytics</h1>
        <DisplayExercise exercise={this.state.maxWeight} field={'weight'} />
        <DisplayExercise exercise={this.state.maxReps} field={'reps'} />
      </div>
    );
  }
}
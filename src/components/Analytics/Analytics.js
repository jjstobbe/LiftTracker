import React, { Component } from 'react'
import APIHelpers from '../../helpers/API.js'

import DisplayExercise from './DisplayExercise/DisplayExercise'

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
  }

  componentDidMount() {
    APIHelpers.getAllExercises().then((data) => {
      this.setState({
        maxWeight: this.getMaxExercise(data, 'weight'),
        maxReps: this.getMaxExercise(data, 'reps')
      });
    });
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
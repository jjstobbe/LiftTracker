import React, { Component } from 'react'
import APIHelpers from '../../helpers/API.js'

import DisplayExercise from './DisplayExercise'

import './Analytics.sass'

export default class Analytics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [],
      selectedExercise: null,
      maxWeight: {},
      maxReps: {}
    };

    this.getMaxExercise = this.getMaxExercise.bind(this);
    this.getRateOfChange = this.getRateOfChange.bind(this);
    this.selectExercise = this.selectExercise.bind(this);
  }

  componentDidMount() {
    APIHelpers.getAllExercises().then((data) => {
      this.setState({
        exercises: data,
        maxWeight: this.getMaxExercise(data, 'weight'),
        maxReps: this.getMaxExercise(data, 'reps'),
        selectedExercise: data[0],
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

  selectExercise(exercise){
    if(exercise){
      this.setState({
        selectedExercise: exercise
      });
    }
  }

  render() {
    return (
      <div id="Analytics">
        <h1>Lifting Analytics</h1>
        <div id="LiftingMaxes">
          <DisplayExercise exercise={this.state.maxWeight} field={'weight'} />
          <DisplayExercise exercise={this.state.maxReps} field={'reps'} />
        </div>
        <div id="ExercisesLeftList">
          {
            this.state.exercises.map((exercise)=>
            <span key={exercise._id} className="title" onClick={() => this.selectExercise(exercise)}>{exercise.title}</span>
            )
          }
        </div>
        <div id="ExerciseDetails">
          <h1>{ this.state.selectedExercise && this.state.selectedExercise.title ? this.state.selectedExercise : '' }</h1>
          <div>
            { this.state.selectedExercise ? this.getRateOfChange(this.state.selectedExercise) : '' }
          </div>
        </div>
      </div>
    );
  }
}
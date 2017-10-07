import React, { Component } from 'react'

export default class DisplayExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercise: {},
      field: ''
    };
  }

  componentWillReceiveProps(props){
    this.setState({
      exercise: props.exercise,
      field: props.field
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="Max">
        <h2> Maximum { this.state.field !== '' ? this.state.field : '' }</h2>
        <h4>{ this.state.exercise && this.state.exercise.title ? this.state.exercise.title : '' }</h4>
        <div className="exerciseMaxField">{ this.state.exercise && this.state.exercise[this.state.field] ? Math.max(...this.state.exercise[this.state.field]) : '' }</div>
      </div>
    );
  }
}
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import APIHelpers from '../../helpers/API.js'

import './FullList.sass';

export default class FullList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      exercises: [],
      exercisesFiltered: [],
      filterText: ''
    }
    
    this.addExercise = this.addExercise.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterExercises = this.filterExercises.bind(this);
  }

  filterExercises(e) {
    var filterText = e.target.value.toLowerCase();
    var filteredExercises = this.state.exercises.filter((exercise) => {
      return exercise.title.toLowerCase().includes(filterText);
    });

    this.setState({
      filterText: filterText,
      exercisesFiltered: filteredExercises
    })
  }

  componentWillReceiveProps(props){
    this.setState({
      exercises: props.data,
      exercisesFiltered: props.data
    });
  }

  componentDidMount() {
    if(this.props.data.length > 0){
      this.setState({
        exercises: this.props.data,
        exercisesFiltered: this.props.data
      });
    }
  }

  addExercise(e){
    e.preventDefault();
    var promise = APIHelpers.postExercise({
      title: this.state.title,
      weight: [],
      reps: [],
      date: []
    });

    promise.then((data)=>{
      this.setState({
        exercises: this.state.exercises.concat([data]),
        exercisesFiltered: this.state.exercisesFiltered.concat([data])
      })
    });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div id="FullList">
        <div id="Exercises">
        <input id="Filter" type="text" placeholder="Search"
          value={this.state.filterText} onChange={this.filterExercises} />
        {
          this.state.exercisesFiltered.map((exercise)=>
          <Link to={{pathname: `exercise/${exercise._id}`, query: { id: exercise._id }}} key={exercise._id} >
          <div className="exercise">
            <li className="title">{exercise.title}</li>
            <li className="weight">
              <label>Weight: </label>
              <span>{Math.max(...exercise.weight)}</span>
            </li>
            <li className="reps">
              <label>Reps: </label>
              <span>{Math.max(...exercise.reps)}</span>
            </li>
          </div>
          </Link>
          )
        }
        </div>
        <form id="AddExercise" className="exercise" onSubmit={this.addExercise}>
          <input name="title" type="text" placeholder="New Exercise" 
            value={this.state.title} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}        
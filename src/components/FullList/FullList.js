import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import APIHelpers from '../../helpers/API.js'

import './FullList.sass';

export default class FullList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: ''
    }
    
    this.addExercise = this.addExercise.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      
      // Add it to the list somehow. Probably move props to state or something.
    });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div id="FullList">
        <div id="Exercises">
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
        <form id="AddExercise" className="exercise" onSubmit={this.addExercise}>
          <input name="title" type="text" placeholder="New Exercise" 
            value={this.state.title} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}        
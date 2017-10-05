import React, { Component } from 'react'
import APIHelpers from '../../helpers/API.js'
import { Switch, Route } from 'react-router-dom'
import FullList from '../FullList/FullList'
import Details from '../Details/Details'

export default class ExerciseRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {    
    var promise = APIHelpers.getAllExercises();
    promise.then((data)=>{
      this.setState({
        data: data
      });
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path='/Exercise' render={()=><FullList data={this.state.data} />} />
        <Route path='/Exercise/:id' render={()=><Details data={this.state.data} />} />
      </Switch>
    );
  }
}        
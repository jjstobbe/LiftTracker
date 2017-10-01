import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import FullList from '../FullList/FullList'
import Details from '../Details/Details'

export default class ExerciseRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/exercise' component={FullList}/>
        <Route path='/exercise/:id' component={Details}/>
      </Switch>
    );
  }
}        
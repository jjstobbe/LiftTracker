import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* Components Rendered on Page */
import ExerciseRouter from './ExerciseRouter'
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/Exercise" component={ExerciseRouter} />
          <Route exact path="/Login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
export default App;

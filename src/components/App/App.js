import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* Components Rendered on Page */
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import ExerciseRouter from './ExerciseRouter'
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound'

class App extends Component {
  render() {
    return (
      <div>
        <Nav />

        <Switch>
          <Route path="/exercise" component={ExerciseRouter} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
export default App;

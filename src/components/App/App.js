import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import Route from './AuthRoute'

/* Components Rendered on Page */
import ExerciseRouter from './ExerciseRouter'
import Analytics from '../Analytics/Analytics'
import Login from '../Login/Login'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/Analytics" component={ Analytics } />
          <Route path="/Exercise" component={ ExerciseRouter } />
          <Route exact path="/Login" component={ Login } />
        </Switch>
      </div>
    );
  }
}
export default App;

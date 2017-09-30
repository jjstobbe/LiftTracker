import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

/* Components Rendered on Page */
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Exercise from '../Exercise/Exercise';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />

        <Switch>
          <Route path="/exercise" component={Exercise} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </div>
    );
  }
}
export default App;

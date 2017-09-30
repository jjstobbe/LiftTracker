import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

/* Components Rendered on Page */
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import List from '../List/List';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />

        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </div>
    );
  }
}
export default App;

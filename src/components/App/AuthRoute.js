import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import APIHelpers from '../../helpers/API.js'
import Login from '../Login/Login'


const AuthRoute = ({component, ...props}) => {
  if (APIHelpers.isAuthenticated()) {
    return <Route { ...props } component={ component } />
  } else {
    return <Route exact path="/Login" component={ Login } />
  }
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};

export default AuthRoute;
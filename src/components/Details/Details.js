import React, { Component } from 'react'
//import APIHelpers from '../../helpers/API.js'

export default class Details extends Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.id);
  }

  render() {
    return (
      <div id="Details">
        <label>Ayy this is a detail page</label>
      </div>
    );
  }
}        
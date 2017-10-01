import React, { Component } from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts'
import ReactTable from 'react-table'
import APIHelpers from '../../helpers/API.js'
import 'react-table/react-table.css'
import moment from 'moment'

import './Details.sass'

export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: window.location.href.substr(window.location.href.lastIndexOf('/') + 1),
      title: 'Not found',
      filteredData: [],
      listData: [],
      columns: [{
        Header: 'Weight',
        accessor: 'weight',
      }, {
        Header: 'Reps',
        accessor: 'reps',
      }, {
        Header: 'Date',
        accessor: 'date',
      }],
      weight: -1,
      reps: -1
    };

    this.parseData = this.parseData.bind(this);
    this.updateExercise = this.updateExercise.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateExercise(e){
    if(this.state.reps > -1 && this.state.weight > -1){
      APIHelpers.updateExercise({
        id: this.state.id,
        title: this.state.filteredData.title,
        weight: this.state.filteredData.weight.concat([this.state.weight]),
        reps: this.state.filteredData.reps.concat([this.state.reps]),
        date: this.state.filteredData.date.concat([moment().format('LLLL')])
      });
    }
    e.preventDefault();
  }

  parseData(data){
    var filteredData = [];
    var listData = [];

    // Filtered Data contains only the details for this exercise
    var filteredDataArray = data.filter((exercise)=> {
      return exercise._id === this.state.id;
    });

    if(filteredDataArray.length === 1){
      filteredData = filteredDataArray[0];
      this.setState({
        filteredData: filteredData,
        title: filteredData.title
      });
    }

    for(var i = 0;i< filteredData.weight.length;i++){
      listData[i] = {
        weight:  filteredData.weight[i],
        reps:  filteredData.reps[i],
        date: moment( filteredData.date[i], "LLLL").fromNow()
      }
    }

    this.setState({
      listData: listData
    });
  }

  componentDidMount() {
    if(this.props.data.length > 0)
      this.parseData(this.props.data);
  }

  componentWillReceiveProps(props){
    this.parseData(props.data);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div id="Details">
        <h1>{this.state.title}</h1>
        <div id="GraphContainer">
          <ResponsiveContainer>
            <LineChart data={this.state.listData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="date"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{r: 8}}/>
              <Line type="monotone" dataKey="reps" stroke="#82ca9d" />
            </LineChart>
          </ ResponsiveContainer>
        </div>

        <form id="updateExercise" onSubmit={this.updateExercise}>
          <input name="weight" type="number" placeholder="Weight" required 
            value={this.state.weight} onChange={this.handleChange} />
          <input name="reps" type="number" placeholder="Reps" required 
            value={this.state.reps} onChange={this.handleChange} />
          <button type="submit">Submmit</button>
        </form>

        <div id="TableContainer">
          <ReactTable
            data={this.state.listData}
            columns={this.state.columns}
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  }
}
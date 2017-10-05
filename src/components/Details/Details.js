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
    this.addRow = this.addRow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  addRow(e){
    if(this.state.reps > -1 && this.state.weight > -1){
      var updatedExercise = {
        id: this.state.id,
        _id: this.state.id,
        title: this.state.filteredData.title,
        weight: this.state.filteredData.weight.concat([this.state.weight]),
        reps: this.state.filteredData.reps.concat([this.state.reps]),
        date: this.state.filteredData.date.concat([moment().unix()])
      };
      APIHelpers.updateExercise(updatedExercise);

      var updatedData = this.props.data.map((exercise)=>{
        if(exercise._id === this.state.id){
          return updatedExercise;
        }else{
          return exercise;
        }
      });
      this.parseData(updatedData);
    }

    e.preventDefault();
  }

  deleteRow(row){
    var updatedFilteredData = this.state.filteredData;
    updatedFilteredData.weight.splice(row._index,1);
    updatedFilteredData.reps.splice(row._index,1);
    updatedFilteredData.date.splice(row._index,1);

    this.setState({
      filteredData: updatedFilteredData
    });

    var updatedExercise = {
      id: this.state.id,
      _id: this.state.id,
      title: this.state.filteredData.title,
      weight: this.state.filteredData.weight,
      reps: this.state.filteredData.reps,
      date: this.state.filteredData.date
    };
    APIHelpers.updateExercise(updatedExercise);
    var updatedData = this.props.data.map((exercise)=>{
      if(exercise._id === this.state.id){
        return updatedExercise;
      }else{
        return exercise;
      }
    });
    this.parseData(updatedData);
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
        filteredData: filteredData
      });

      for(var i = 0;i< filteredData.weight.length;i++){
        listData[i] = {
          weight:  filteredData.weight[i],
          reps:  filteredData.reps[i],
          date: filteredData.date[i]
        }
      }

      this.setState({
        listData: listData
      });
    }
  }

  componentDidMount() {
    if(this.props.data.length > 0){
      this.parseData(this.props.data);
    }
  }

  componentWillReceiveProps(props){
    this.parseData(props.data);
  }

  handleChange(event) {
    this.setState({[event.target.name]: parseInt(event.target.value)});
  }

  render() {
    return (
      <div id="Details">
        <h1>{this.state.filteredData.title}</h1>
        <div id="GraphContainer">
          <ResponsiveContainer >
            <LineChart data={this.state.listData.map((row) => {
              return {
                weight: row.weight,
                reps: row.reps,
                date: moment.unix(row.date).fromNow()
              }
            })}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="date"/>
              <YAxis />
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{r: 8}}/>
              <Line type="monotone" dataKey="reps" stroke="#82ca9d" />
            </LineChart>
          </ ResponsiveContainer>
        </div>

        <form id="addRow" onSubmit={this.addRow}>
          <input id="weight" name="weight" type="number" placeholder="Weight" required 
            value={this.state.weight > -1 ? this.state.weight : ''} onChange={this.handleChange} />
          <input id="reps" name="reps" type="number" placeholder="Reps" required 
            value={this.state.reps > -1 ? this.state.reps : ''} onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>

        <div id="TableContainer">
          <ReactTable
            data={this.state.listData.map((row) => {
              return {
                weight: row.weight,
                reps: row.reps,
                date: moment.unix(row.date).fromNow()
              }
            })}
            columns={this.state.columns}
            getTdProps={(state, rowInfo, column, instance) => {
            return {
              onDoubleClick: e =>
                this.deleteRow(rowInfo.row)
            };
          }}
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  }
}
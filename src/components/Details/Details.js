import React, { Component } from 'react'
import APIHelpers from '../../helpers/API.js'
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment'

import './Details.sass'

export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      title: '',
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
      }]
    }
  }

  componentDidMount() {
    //Example data to not hit the API a lot.
    var promise = APIHelpers.getAllExercises();
    promise.then((data) => {
      var filteredData = [];
      var listData = [];

      filteredData = data.filter((exercise)=> {
        return exercise._id === this.state.id;
      });

      if(filteredData.length == 1){
        this.setState({
          title: filteredData[0].title
        });
      }

      for(var i = 0;i<data[0].weight.length;i++){
        listData[i] = {
          weight: data[0].weight[i],
          reps: data[0].reps[i],
          date: moment(data[0].date[i], "MM-DD-YYYY").fromNow()
        }
      }

      this.setState({
        filteredData: filteredData,
        listData: listData
      });
    });
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
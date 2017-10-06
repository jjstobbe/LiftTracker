import React, { Component } from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts'
import ReactTable from 'react-table'
import APIHelpers from '../../helpers/API.js'
import 'react-table/react-table.css'
import moment from 'moment'

export default class Weight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      columns: [{
        Header: 'Weight',
        accessor: 'weight',
      }, {
        Header: 'Date',
        accessor: 'date',
      }],
      currentWeight: -1
    };

    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addRow(e){
    if(this.state.currentWeight > -1){
      var updatedWeight = {
        weight: this.state.currentWeight,
        date: moment().unix()
      };

      APIHelpers.postWeight(updatedWeight);
      
      this.setState({
        data: this.state.data.concat([updatedWeight])
      });
    }

    e.preventDefault();
  }

  deleteRow(row){
    APIHelpers.deleteWeight(this.state.data[row._index]);

    var updatedData = this.state.data;
    updatedData.splice(row._index, 1);

    this.setState({
      data: updatedData
    });
  }

  componentDidMount() {
    APIHelpers.getAllWeight().then((data) => {
      this.setState({
        data: data
      });
    });
  }

  handleChange(event) {
    this.setState({[event.target.name]: parseInt(event.target.value, 10)});
  }

  render() {
    return (
      <div id="Details">
        <h1>Weight</h1>
        <div id="GraphContainer">
          <ResponsiveContainer >
            <LineChart data={this.state.data.map((row) => {
              return {
                weight: row.weight,
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
            </LineChart>
          </ ResponsiveContainer>
        </div>

        <form id="addRow" onSubmit={this.addRow}>
          <input id="weight" name="currentWeight" type="number" placeholder="Weight" required 
            value={this.state.currentWeight > -1 ? this.state.currentWeight : ''} onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>

        <div id="TableContainer">
          <ReactTable
            data={this.state.data.map((row) => {
              return {
                weight: row.weight,
                date: moment.unix(row.date).fromNow()
              }
            })}
            columns={this.state.columns}
            getTdProps={(state, rowInfo) => {
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
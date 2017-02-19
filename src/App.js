import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import _ from 'lodash';

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var peopleContractABI = [{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"firstName","type":"bytes32"},{"name":"lastname","type":"bytes32"},{"name":"age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"type":"function"}];

var peopleContractAddress = '0xff09af9f0dfa3dd3d77e29b6c45edde168dafbff';

var peopleContract = ETHEREUM_CLIENT.eth.contract(peopleContractABI).at(peopleContractAddress);

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      firstNames: [],
      lastNames: [],
      ages: []
    }
  }

  componentWillMount(){
      var data = peopleContract.getPeople();
      this.setState({
        firstNames: String(data[0]).split(","),
        lastNames: String(data[1]).split(","),
        ages: String(data[2]).split(",")
      })
  }
  render() {

    var TableRows = []

    _.each(this.state.firstNames, (value, index) => {
      TableRows.push(
        <tr>
            <td>{ETHEREUM_CLIENT.toAscii(this.state.firstNames[index])}</td>
            <td>{ETHEREUM_CLIENT.toAscii(this.state.lastNames[index])}</td>
            <td>{this.state.ages[index]}</td>
        </tr>
      )
    })

    return (
      <div className="App">
        <div className="App-header">
       
        </div>
        <p className="App-intro">
          <div className="App-Content">
            <table>
              <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {TableRows}
              </tbody>
            </table>
          </div>
        </p>
      </div>
    );
  }
}

export default App;

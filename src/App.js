import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import FormComponent  from './form.js'
import TableItem from './table.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: []
    };

    this.handleData = this.handleData.bind(this);
  }

  handleData(data) {
    let dataArray = this.state.productData;
        dataArray.push(data);
    this.setState({ productData: dataArray});
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <h2>React App</h2>
          <FormComponent onHandleDate={this.handleData} />
          <br/>
          <Table striped bordered condensed hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Red</th>
              <th>Green</th>
              <th>Blue</th>
            </tr>
            </thead>
            <tbody>
                {this.state.productData.length  && this.state.productData.map((item, index)=> <TableItem key={index} data={item} index={index} /> )}
              <TableItem />
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;

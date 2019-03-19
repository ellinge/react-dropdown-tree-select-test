import React, { Component } from 'react';
import bigData from './big-data.json'
import data from './data.json'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <DropdownTreeSelect data={bigData} id="normalSelect" className="normalSelect" />
          <DropdownTreeSelect data={bigData} radioSelect id="radioSelect" className="radioSelect" />
          <DropdownTreeSelect data={data} simpleSelect id="simpleSelect" className="simpleSelect" />
        </header>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import bigData from './big-data.json'
import data from './data.json'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import "./App.scss"

const dummyA = {
  label: "I am groot",
  value: "groot"
}

const dummyB = {
  label: "I'm batman",
  value: "batman"
}

const defaultDummyA = { ...dummyA, isDefaultValue: true };
const defaultDummyB =  { ...dummyB, isDefaultValue: true };
const checkedDummyA = { ...dummyA, checked: true };
const checkedDummyB =  { ...dummyB, checked: true };

class App extends Component {
  render() {
    return (
      <div className="root">
        <h2>With no checked/default values</h2>
        <div className="flex">
          <DropdownTreeSelect data={bigData} />
          <DropdownTreeSelect data={bigData} />
          <DropdownTreeSelect data={data} />
        </div>
        <h2>With default values</h2>
        <p>Groot default, Batman default</p>
        <div className="flex">
          <DropdownTreeSelect data={[ bigData, defaultDummyA, defaultDummyB ]} />
          <DropdownTreeSelect data={[ bigData, defaultDummyA, defaultDummyB ]} radioSelect />
          <DropdownTreeSelect data={[ defaultDummyA, defaultDummyB ].concat(data)} simpleSelect />
        </div>
        <h2>With checked values</h2>
        <p>Groot checked, Batman checked</p>
        <div className="flex">
          <DropdownTreeSelect data={[ bigData, checkedDummyA, checkedDummyB ]} />
          <DropdownTreeSelect data={[ bigData, checkedDummyA, checkedDummyB ]} radioSelect />
          <DropdownTreeSelect data={[ checkedDummyA, checkedDummyB ].concat(data)} simpleSelect />
        </div>
        <h2>With checked/default values</h2>
        <p>Groot default, Batman checked</p>
        <div className="flex">
          <DropdownTreeSelect data={[ bigData, defaultDummyA, checkedDummyB ]} />
          <DropdownTreeSelect data={[ bigData, defaultDummyA, checkedDummyB ]} radioSelect />
          <DropdownTreeSelect data={[ defaultDummyA, checkedDummyB ].concat(data)} simpleSelect />
        </div>
      </div>
    );
  }
}

export default App;

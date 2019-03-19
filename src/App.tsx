import React, { Component } from 'react';
import bigData from './big-data.json'
import data from './data.json'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import "./App.css"

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
          <DropdownTreeSelect data={bigData} id="normalSelect1" className="normalSelect1" />
          <DropdownTreeSelect data={bigData} radioSelect id="radioSelect1" className="radioSelect1" />
          <DropdownTreeSelect data={data} simpleSelect id="simpleSelect1" className="simpleSelect1" />
        </div>
        <h2>With default values</h2>
        <p>Groot default, Batman default</p>
        <div className="flex">
          <DropdownTreeSelect data={[ bigData, defaultDummyA, defaultDummyB ]} id="normalSelect2" className="normalSelect2" />
          <DropdownTreeSelect data={[ bigData, defaultDummyA, defaultDummyB ]} radioSelect id="radioSelect2" className="radioSelect2" />
          <DropdownTreeSelect data={[ defaultDummyA, defaultDummyB ].concat(data)} simpleSelect id="simpleSelect2" className="simpleSelect2" />
        </div>
        <h2>With checked values</h2>
        <p>Groot checked, Batman checked</p>
        <div className="flex">
          <DropdownTreeSelect data={[ bigData, checkedDummyA, checkedDummyB ]} id="normalSelect3" className="normalSelect3" />
          <DropdownTreeSelect data={[ bigData, checkedDummyA, checkedDummyB ]} radioSelect id="radioSelect3" className="radioSelect3" />
          <DropdownTreeSelect data={[ checkedDummyA, checkedDummyB ].concat(data)} simpleSelect id="simpleSelect3" className="simpleSelect3" />
        </div>
        <h2>With checked/default values</h2>
        <p>Groot default, Batman checked</p>
        <div className="flex">
          <DropdownTreeSelect data={[ bigData, defaultDummyA, checkedDummyB ]} id="normalSelect3" className="normalSelect3" />
          <DropdownTreeSelect data={[ bigData, defaultDummyA, checkedDummyB ]} radioSelect id="radioSelect3" className="radioSelect3" />
          <DropdownTreeSelect data={[ defaultDummyA, checkedDummyB ].concat(data)} simpleSelect id="simpleSelect3" className="simpleSelect3" />
        </div>
      </div>
    );
  }
}

export default App;

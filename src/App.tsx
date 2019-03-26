import React from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";

import "react-dropdown-tree-select/dist/styles.css";
import "./App.scss";
import bigData from "./big-data.json";
import data from "./data.json";
import { ActionLog } from "./ActionLog";

const DropDownTestSection: React.FunctionComponent<
  { header: string, description?: string, dummyA: any, dummyB: any }> = (props) => {
  const { header, description, dummyA, dummyB } = props;
  return (<div>
    <h2>{header}</h2>
    {description && <p>{description}</p>}
    <div className="flex">
      <DropdownTreeSelect data={[ bigData, dummyA, dummyB ]} />
      <DropdownTreeSelect data={[ bigData, dummyA, dummyB ]} radioSelect />
      <DropdownTreeSelect data={[ dummyA, dummyB ].concat(data)} simpleSelect />
    </div>
  </div>);
}

const App: React.FunctionComponent = (props) => {
  const dummyA = { label: "I am groot", value: "groot" };
  const dummyB = { label: "I'm batman", value: "batman" };
  const defaultDummyA = { ...dummyA, isDefaultValue: true };
  const defaultDummyB = { ...dummyB, isDefaultValue: true };
  const checkedDummyA = { ...dummyA, checked: true };
  const checkedDummyB = { ...dummyB, checked: true };

  let actionLogRef = React.createRef<ActionLog>();
  function addToActionLogMultiParam(action, node) {
    actionLogRef.current && actionLogRef.current.addToActionLogMultiParam(action, node);
  }
  function addToActionLogSingleObject({ action, node }) {
    actionLogRef.current && actionLogRef.current.addToActionLogSingleObject({ action, node });
  }

  const actions = [
    {  title: "global", className: "fa fa-globe" },
    {  title: "(action, node)", className: "fa fa-copy", onAction: addToActionLogMultiParam },
    {  title: "{ action, node }", className: "fa fa-file-o", onAction: addToActionLogSingleObject}
  ];

  const actionsDummyA = { ...dummyA, actions };
  const actionsDummyB = { ...dummyB, actions };
  
  return (
    <div className="root">
      <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
      
      <h2>With no checked/default values</h2>
      <div className="flex">
        <DropdownTreeSelect data={bigData} />
        <DropdownTreeSelect data={bigData} radioSelect />
        <DropdownTreeSelect data={data} simpleSelect />
      </div>

      <DropDownTestSection header="With default values" description="Groot default, Batman default"
        dummyA={defaultDummyA} dummyB={defaultDummyB} />

      <DropDownTestSection header="With checked values" description="Groot checked, Batman checked"
        dummyA={checkedDummyA} dummyB={checkedDummyB} />

      <DropDownTestSection header="With checked/default values" description="Groot default, Batman checked"
        dummyA={defaultDummyA} dummyB={checkedDummyB} />

      <h2>With action values</h2>
      <p>No global onAction, Global onAction (action, node), Global onAction {"({ action, node })"}</p>
      <div className="flex">
        <DropdownTreeSelect data={[ bigData, actionsDummyA, actionsDummyB ]} />{/*
        // @ts-ignore */}
        <DropdownTreeSelect data={[ bigData, actionsDummyA, actionsDummyB ]} onAction={addToActionLogMultiParam} />{/*
        // @ts-ignore */}
        <DropdownTreeSelect data={[ bigData, actionsDummyA, actionsDummyB ]} onAction={addToActionLogSingleObject} />
      </div>
      <ActionLog ref={actionLogRef} />
    </div>);
};

export default App;

import React from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";

import "react-dropdown-tree-select/dist/styles.css";
import "./App.scss";
import bigData from "./big-data.json";
import data from "./data.json";

const dummyA = { label: "I am groot", value: "groot" };
const dummyB = { label: "I'm batman", value: "batman" };
const defaultDummyA = { ...dummyA, isDefaultValue: true };
const defaultDummyB =  { ...dummyB, isDefaultValue: true };
const checkedDummyA = { ...dummyA, checked: true };
const checkedDummyB =  { ...dummyB, checked: true };

const ActionTests: React.FunctionComponent = (props) => {
  const [actionLog, setActionLog] = React.useState<string[]>([]);

  const actions = [
    {  title: "global", className: "fa fa-globe" },
    {  title: "(action, node)", className: "fa fa-copy", onAction: addToActionLogMultiParam },
    {  title: "{ action, node }", className: "fa fa-file-o", onAction: addToActionLogSingleObject }
  ];

  const actionsDummyA = { ...dummyA, actions };
  const actionsDummyB =  { ...dummyB, actions };

  function clearActionLog(): void {
    setActionLog([]);
  }

  function addToActionLog(message: string): void {
    setActionLog(actionLog.concat([ message ]));
  }

  function addToActionLogMultiParam(action, node): void {
    addToActionLog("Declaration (action, node) gave action:" +
      `${JSON.stringify(action)}, node: ${JSON.stringify(node)}`);
  }

  function addToActionLogSingleObject({ action, node }): void {
    addToActionLog("Declaration ({ action, node }) gave action:" +
      `${JSON.stringify(action)}, node: ${JSON.stringify(node)}`);
  }

  return (<>
    <h2>With action values</h2>
    <p>No global onAction, Global onAction (action, node), Global onAction {"({ action, node })"}</p>
    <div className="flex">
      <DropdownTreeSelect data={[ actionsDummyA, actionsDummyB ].concat(data)} />{/*
      // @ts-ignore */}
      <DropdownTreeSelect data={[ actionsDummyA, actionsDummyB ].concat(data)} onAction={addToActionLogMultiParam} />{/*
      // @ts-ignore */}
      <DropdownTreeSelect data={[ actionsDummyA, actionsDummyB ].concat(data)} onAction={addToActionLogSingleObject} />
    </div>
    {actionLog && actionLog.length > 0 && <div>
      {actionLog.map((al, i) => <p key={i}>{al}</p>)}
      <button onClick={clearActionLog}>Clear action log</button></div>}
  </>);
};

const App: React.FunctionComponent = (props) => {
  return (
    <div className="root">
      <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
      <h2>With no checked/default values</h2>
      <div className="flex">
        <DropdownTreeSelect data={bigData} />
        <DropdownTreeSelect data={bigData} radioSelect />
        <DropdownTreeSelect data={data} simpleSelect />
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
      <ActionTests />
    </div>);
};

export default App;

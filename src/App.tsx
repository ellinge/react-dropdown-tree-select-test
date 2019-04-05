import CircularJSON from "circular-json";
import prettyPrint from "json-pretty-html";
import React from "react";
import DropdownTreeSelect, { NodeAction, TreeNode } from "react-dropdown-tree-select";
import DropdownTreeSelect104 from "react-dropdown-tree-select@1.0.4";
import DropdownTreeSelect117 from "react-dropdown-tree-select@1.17.0";

const versionMap = [
  { label: "Develop Temp", value: "DevelopTemp", type: DropdownTreeSelect },
  { label: "v1.04", value: "v104", type: DropdownTreeSelect104 },
  { label: "v1.17", value: "v117", type: DropdownTreeSelect117 }
];

import "react-dropdown-tree-select/dist/styles.css";
import "./App.scss";
import BenchmarkRender from "./BenchmarkRender";
import { DropdownTestSection } from "./DropdownTestSection";
import { EventLog } from "./EventLog";

const App: React.FunctionComponent = (props) => {
  let activeVersionOnLoad = versionMap[0].value;
  let activeOnLoad = "";
  if (typeof window !== undefined && window.location.hash) {
    const match = /^#(\w+)-(\w+)$/.exec(window.location.hash);
    if (match) {
      activeVersionOnLoad = match[1];
      activeOnLoad = match[2];
    }
  }

  const [ componentType, setComponentType ] = React.useState(activeVersionOnLoad);

  const dummyA = { label: "I am groot", value: "groot" };
  const dummyB = { label: "I'm batman", value: "batman" };
  const defaultDummyA = { ...dummyA, isDefaultValue: true };
  const defaultDummyB = { ...dummyB, isDefaultValue: true };
  const checkedDummyA = { ...dummyA, checked: true };
  const checkedDummyB = { ...dummyB, checked: true };

  const eventLogRef = React.createRef<EventLog>();

  const addToLog = (eventName: string, eventData: any) =>
    eventLogRef.current &&  eventLogRef.current.addToLog(
      <>
        <strong>{eventName}</strong>:
        <div className="json" dangerouslySetInnerHTML={
          { __html: prettyPrint(JSON.parse(CircularJSON.stringify(eventData))) }} />
      </>);
  const onChange = (currentNode: TreeNode, selectedNodes: TreeNode[]) =>
    addToLog("onChange", { currentNode, selectedNodes });
  const onAction = (action: NodeAction, node: TreeNode) =>
    addToLog("onAction", { action, node });
  const onNodeToggle = (currentNode: TreeNode) =>
    addToLog("onNodeToggle", currentNode);
  const onLocalAction =  (action: NodeAction, node: TreeNode) => {
    addToLog("local onAction", { action, node });
  };
  const changeComponentType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setComponentType(event.target.value);
  };

  const actions = [
    {  title: "global", className: "fa fa-globe", customAction: true },
    {  title: "localNode", className: "fa fa-map-marker", onAction: onLocalAction },
  ];

  const actionsDummyA = { ...dummyA, actions, grootNode: true };
  const actionsDummyB = { ...dummyB, actions, batmanNode: true };
  const { type: Type, value } = versionMap.find((v) => v.value === componentType) || versionMap[0];

  return (
    <div className="root">
      <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

      <label htmlFor="componentType">Component type: </label>
      <select className="select" value={componentType} onChange={changeComponentType} id="componentType">
        {versionMap.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
      </select>

      <DropdownTestSection Type={Type} header="With no checked/default values"
        target={`${value}-nocheckeddefault`} show={activeOnLoad === "nocheckeddefault"} />

      <DropdownTestSection Type={Type} header="With default values" description="Groot default, Batman default"
        dummyA={defaultDummyA} dummyB={defaultDummyB}
        target={`${value}-default`}  show={activeOnLoad === "default"} />

      <DropdownTestSection Type={Type} header="With checked values" description="Groot checked, Batman checked"
        dummyA={checkedDummyA} dummyB={checkedDummyB}
        target={`${value}-checked`} show={activeOnLoad === "checked"} />

      <DropdownTestSection Type={Type} header="With checked/default values" description="Groot default, Batman checked"
        dummyA={defaultDummyA} dummyB={checkedDummyB}
        target={`${value}-checkeddefault`} show={activeOnLoad === "checkeddefault"} />

      <DropdownTestSection Type={Type} header="With events (onAction, onChange, onNodeToggle)"
        dummyA={actionsDummyA} dummyB={actionsDummyB} onChange={onChange} onAction={onAction}
        onNodeToggle={onNodeToggle} target={`${value}-onaction`} show={activeOnLoad === "onaction"}>
        <div className="dropdown-section">
          <label htmlFor="onlylocal">Only local onAction (only 1.0.4 and earlier?)</label>
          <Type data={[ actionsDummyA, actionsDummyB ]} id="onlylocal" simpleSelect
            onChange={onChange} onNodeToggle={onNodeToggle} />
        </div>
        <EventLog ref={eventLogRef} />
      </DropdownTestSection>

      <BenchmarkRender />
    </div>);
};

export default App;

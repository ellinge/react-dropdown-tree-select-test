import CircularJSON from "circular-json";
import prettyPrint from "json-pretty-html";
import React from "react";
import DropdownTreeSelect, { TreeNode, TreeNodeProps } from "react-dropdown-tree-select";
import DropdownTreeSelect116 from "react-dropdown-tree-select@1.16.0";

import "react-dropdown-tree-select/dist/styles.css";
import "./App.scss";
import BenchmarkRender from "./BenchmarkRender";
import bigData from "./big-data.json";
import data from "./data.json";
import { EventLog } from "./EventLog";

interface DropDownTestSectionProps {
  Type: any;
  header: string;
  description?: string;
  dummyA?: TreeNodeProps;
  dummyB?: TreeNodeProps;
  onChange?: (currentNode: TreeNode, selectedNodes: TreeNode[]) => void;
  onAction?: any;
  onNodeToggle?: (currentNode: TreeNode) => void;
  show?: boolean;
}

const DropDownTestSection: React.FunctionComponent<DropDownTestSectionProps> = (props) => {
  const [ show, setShow ] = React.useState<boolean>(props.show || false);
  const { Type, header, description, dummyA, dummyB, onChange, onAction, onNodeToggle, children } = props;

  const dataMulti: TreeNodeProps[] = [ bigData ];
  const dataSingle: TreeNodeProps[] = JSON.parse(JSON.stringify(data));
  if (dummyA) { dataMulti.push(dummyA); }
  if (dummyB) { dataMulti.push(dummyB); dataSingle.unshift(dummyB); }
  if (dummyA) { dataSingle.unshift(dummyA); }

  return (<div className={`dropdown-section ${show ? "visible" : "hidden"}`}>
    <a href="javascript:void(0)" onClick={() => setShow(!show)}>{header}</a>
    {description && <p>{description}</p>}
    {show && <div>
        <div className="flex-wrap">
          <Type data={dataMulti} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />
          <Type data={dataMulti} radioSelect onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />
          <Type data={dataSingle} simpleSelect onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />
        </div>
        {children}
      </div>}
  </div>);
};

const App: React.FunctionComponent = (props) => {
  const [ componentType, setComponentType ] = React.useState("DropdownTreeSelect");

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
  const onAction = (action: any, node: any) =>
    addToLog("onAction", { action: action || null, node: node || null });
  const onNodeToggle = (currentNode: TreeNode) =>
    addToLog("onNodeToggle", currentNode);
  const onLocalAction =  (action: any, node: any) =>
    addToLog("local onAction", { action: action || null, node: node || null });
  const changeComponentType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setComponentType(event.target.value);
  };

  const actions = [
    {  title: "global", className: "fa fa-globe", customAction: true },
    {  title: "localNode", className: "fa fa-map-marker", onAction: onLocalAction },
  ];

  const actionsDummyA = { ...dummyA, actions, grootNode: true };
  const actionsDummyB = { ...dummyB, actions, batmanNode: true };
  const Type = componentType === "DropdownTreeSelect116" ? DropdownTreeSelect116 : DropdownTreeSelect;

  return (
    <div className="root">
      <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

      <label htmlFor="componentType">Component type: </label>
      <select className="select" value={componentType} onChange={changeComponentType} id="componentType">
        <option value="DropdownTreeSelect">DevelopTemp (ellinge)</option>
        <option value="DropdownTreeSelect116">Develop (dowjones)</option>
      </select>

      <DropDownTestSection Type={Type} header="With no checked/default values" />

      <DropDownTestSection Type={Type} header="With default values" description="Groot default, Batman default"
        dummyA={defaultDummyA} dummyB={defaultDummyB} />

      <DropDownTestSection Type={Type} header="With checked values" description="Groot checked, Batman checked"
        dummyA={checkedDummyA} dummyB={checkedDummyB} />

      <DropDownTestSection Type={Type} header="With checked/default values" description="Groot default, Batman checked"
        dummyA={defaultDummyA} dummyB={checkedDummyB} />

      <DropDownTestSection Type={Type} header="With events (onAction, onChange, onNodeToggle)"
        dummyA={actionsDummyA} dummyB={actionsDummyB} show
        onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle}>
        <EventLog ref={eventLogRef} />
      </DropDownTestSection>

      <BenchmarkRender />
    </div>);
};

export default App;

import React from "react";
import { TreeNode, TreeNodeProps } from "react-dropdown-tree-select";

import bigData from "./big-data.json";
import data from "./data.json";

export interface DropdownTestSectionProps {
  Type: any;
  target: string;
  header: string;
  description?: string;
  dummyA?: TreeNodeProps;
  dummyB?: TreeNodeProps;
  onChange?: (currentNode: TreeNode, selectedNodes: TreeNode[]) => void;
  onAction?: any;
  onNodeToggle?: (currentNode: TreeNode) => void;
  show?: boolean;
  enableKeyboardNavigation?: boolean;
  hideDefaultCheckboxes?: boolean;
}

export const DropdownTestSection: React.FunctionComponent<DropdownTestSectionProps> = (props) => {
  const [ show, setShow ] = React.useState<boolean>(props.show || false);
  const { Type, target, header, description, dummyA, dummyB, onChange,
    onAction, onNodeToggle, children, enableKeyboardNavigation, hideDefaultCheckboxes } = props;

  const dataMulti: TreeNodeProps[] = [ bigData ];
  const dataSingle: TreeNodeProps[] = JSON.parse(JSON.stringify(data));
  if (dummyA) { dataMulti.push(dummyA); }
  if (dummyB) { dataMulti.push(dummyB); dataSingle.unshift(dummyB); }
  if (dummyA) { dataSingle.unshift(dummyA); }

  return (<div className={`dropdown-section ${show ? "visible" : "hidden"}`}>
    <a href={`#${target}`} onClick={() => setShow(!show)}>{header}</a>
    {description && <p>{description}</p>}
    {show && <div>
        {!hideDefaultCheckboxes && <div className="flex-wrap">
          <Type data={dataMulti} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle}
            enableKeyboardNavigation={enableKeyboardNavigation} />
          <Type data={dataMulti} radioSelect onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle}
            enableKeyboardNavigation={enableKeyboardNavigation} />
          <Type data={dataSingle} simpleSelect onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle}
            enableKeyboardNavigation={enableKeyboardNavigation} />
        </div>}
        {children}
      </div>}
  </div>);
};

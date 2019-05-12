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
  hideDefaultCheckboxes?: boolean;
  [property: string]: any;
}

export const DropdownTestSection: React.FunctionComponent<DropdownTestSectionProps> = (props) => {
  const [ show, setShow ] = React.useState<boolean>(props.show || false);
  const { Type, target, header, description, dummyA, dummyB, children, hideDefaultCheckboxes } = props;

  const dataMulti: TreeNodeProps[] = [ bigData ];
  const dataSingle: TreeNodeProps[] = JSON.parse(JSON.stringify(data));
  if (dummyA) { dataMulti.push(dummyA); }
  if (dummyB) { dataMulti.push(dummyB); dataSingle.unshift(dummyB); }
  if (dummyA) { dataSingle.unshift(dummyA); }
  const sharedProps = { texts: { label: `#${target}` } };

  return (<div className={`dropdown-section ${show ? "visible" : "hidden"}`}>
    <a id={target} href={`#${target}`} onClick={() => setShow(!show)}>{header}</a>
    {description && <p>{description}</p>}
    {show && <div>
        {!hideDefaultCheckboxes && <div className="flex-wrap">
          <Type data={dataMulti} {...sharedProps} {...props} />
          <Type data={dataMulti} radioSelect mode="radioSelect" {...sharedProps} {...props} />
          <Type data={dataSingle} simpleSelect mode="simpleSelect" {...sharedProps} {...props} />
          <Type data={dataSingle} hierarchical mode="hierarchical" {...sharedProps} {...props} />
        </div>}
        {children}
      </div>}
  </div>);
};

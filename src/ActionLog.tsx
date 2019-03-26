import React from "react";

export class ActionLog extends React.Component<any, { actionLog: string[] }> {
    constructor(props) {
        super(props);
        this.state = { actionLog: [] };
        this.clearActionLog = this.clearActionLog.bind(this);
    }
  
    private clearActionLog(): void {
      this.setState({ actionLog: [] });
    }
  
    private addToActionLog(message: string): void {
      this.setState((prevState) => ({ actionLog: prevState.actionLog.concat([ message ])}));
    }
  
    public addToActionLogMultiParam(action, node): void {
      this.addToActionLog("Declaration (action, node) gave action:" +
        `${JSON.stringify(action)}, node: ${JSON.stringify(node)}`);
    }
  
    public addToActionLogSingleObject({ action, node }): void {
        this.addToActionLog("Declaration ({ action, node }) gave action:" +
        `${JSON.stringify(action)}, node: ${JSON.stringify(node)}`);
    }

    public render() {
        const { actionLog } = this.state;
        if(!actionLog || actionLog.length == 0) return null;
        return (<div>
            {actionLog.map((al, i) => <p key={i}>{al}</p>)}
            <button onClick={this.clearActionLog}>Clear action log</button>
        </div>);
    }
}
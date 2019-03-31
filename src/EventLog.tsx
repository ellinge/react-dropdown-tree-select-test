import React from "react";

export class EventLog extends React.Component<any, { log: JSX.Element[] }> {
    constructor(props) {
        super(props);
        this.state = { log: [] };
        this.clearLog = this.clearLog.bind(this);
    }

    public addToLog(message: JSX.Element): void {
      this.setState((prevState) => ({ log: [ message ].concat(prevState.log) }));
    }

    public render() {
        const { log: eventLog } = this.state;
        if (!eventLog || eventLog.length === 0) { return null; }
        return (<>
            <button className="button" onClick={this.clearLog}>Clear action log</button>
            {eventLog.map((item, i) => <div key={i} className="message">{item}</div>)}
        </>);
    }

    private clearLog(): void {
      this.setState({ log: [] });
    }
}

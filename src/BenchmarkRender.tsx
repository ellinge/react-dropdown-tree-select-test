import React from "react";
import ReactDOM from "react-dom";
import DropdownTreeSelect from "react-dropdown-tree-select";
import DropdownTreeSelect116 from "react-dropdown-tree-select@1.17.0";
import data from "./data.json";

class BenchmarkData {
  public count: number = 0;
  public totalNodeCount: number = 0;
  public totalMs: number = 0;
  public clientIds = new Map();
}

interface BenchmarkState {
  benchmarking: boolean;
  timeDevelop: BenchmarkData;
  timeDevelopTemp: BenchmarkData;
}

// tslint:disable-next-line:max-classes-per-file
export default class BenchmarkRender extends React.Component<any, BenchmarkState> {
  constructor(props) {
    super(props);
    this.state = {
      benchmarking: false,
      timeDevelop: new BenchmarkData(),
      timeDevelopTemp: new BenchmarkData()
    };
    this.benchmark = this.benchmark.bind(this);
    this.benchmarkComponent = this.benchmarkComponent.bind(this);
  }

  public render() {
    const { benchmarking, timeDevelop, timeDevelopTemp } = this.state;
    return <div>
      {this.renderBenchmarkData(timeDevelopTemp, "developTemp")}
      {this.renderBenchmarkData(timeDevelop, "develop")}
      <button className="button" onClick={this.benchmark} disabled={benchmarking}>
        {benchmarking ? "Running..." : "Run benchmark"}</button>
    </div>;
  }

  private renderBenchmarkData(benchMark: BenchmarkData, branch: string) {
    if (!benchMark || benchMark.count == 0) { return null; }
    return <p className="message">
        Rendering <strong>{benchMark.count}</strong> DropdownTreeSelect ({branch}) took
        <strong> {benchMark.totalMs} ms </strong>
        (total nodes parsed: {benchMark.totalNodeCount}, total clientids generated: {benchMark.clientIds.size})
      </p>;
  }

  private async benchmarkComponent(Component,
                                   setStatus: (data: BenchmarkData) => void,
                                   numberOfComponents: number,
                                   callback: () => void) {
    const renderDiv = document.createElement("div");
    const before = performance.now();
    let totalNodeCount = 0;
    const clientIds = new Map();
    for (let count = 1; count <= numberOfComponents; count++) {
      const result = await new Promise<BenchmarkData>((resolve) => {
        setTimeout(() => {
          const elem = React.createElement(Component, { data }, null);
          const renderedElem: any = ReactDOM.render(elem, renderDiv);
          clientIds.set(renderedElem.clientId, {});
          totalNodeCount += renderedElem.state.tree.size;
          ReactDOM.unmountComponentAtNode(renderDiv);
          resolve({ count, totalMs: Math.floor(performance.now() - before - 1), totalNodeCount, clientIds });
        }, 1);
      });
      if (count % 20 === 0) {
        setStatus(result);
      }
    }
    if (callback) { callback(); }
  }

  private benchmark(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.setState({
      benchmarking: true,
      timeDevelop: new BenchmarkData(),
      timeDevelopTemp: new BenchmarkData()
    },
      () => {
        // tslint:disable-next-line:no-console
        console.log("Fetching json with length " + data.length);
        const numberOfComponents = 200;
        this.benchmarkComponent(DropdownTreeSelect,
          (d1) => this.setState({ timeDevelopTemp: d1 }), numberOfComponents, () =>
            this.benchmarkComponent(DropdownTreeSelect116,
              (d2) => this.setState({ timeDevelop: d2 }), numberOfComponents, () => {
                this.setState({ benchmarking: false });
              }));
      });
  }
}

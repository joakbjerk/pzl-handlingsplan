import * as React from 'react';
import * as ReactDOM from 'react-dom';


console.log('Hello form Hadnlingsplan.Index');


export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps, undefined> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);

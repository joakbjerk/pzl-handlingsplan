import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Fabric from 'office-ui-fabric-react';
import pnp, { SearchQuery, SearchResults } from 'sp-pnp-js'

console.log('Hello from Index');
GetSubsiteListItems();

interface QueryData {
    Title?: string;
    Ordre?: string;
    Ordrenummer?: string;
    Kunde?: string;
    Kundenummer?: string;
    Ansvarlig?: string;
    Verdi?: string;
    Fremgangsplan?: string;
    Path?: string;

}

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

export function GetSubsiteListItems() {
    const searchSettings: SearchQuery = {
        Querytext: 'ContentType:"Pzl Handlingsplan"',
        SelectProperties: ['Title', 'PZLHPOrdre', 'PZLHPOrdrenummer', 'PZLHPKunde', 'PZLHPKundenummer', 'PZLHPAnsvarlig', 'PZLHPVerdi', 'PZLHPFremgangsplan', 'Path'],
        RowLimit: 100
    };

    pnp.sp.search(searchSettings).then((r: SearchResults) => {
        console.log(r.PrimarySearchResults);
    })
}
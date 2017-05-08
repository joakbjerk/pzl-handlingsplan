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

interface CustomComponentProps { greeting: string, name: string };

class CustomComponent extends React.Component<CustomComponentProps, undefined> {
    render() {
        return (
            <h1>{this.props.greeting} from {this.props.name}!</h1>
        )
    }
}

function GreetingApp() {
    render() {
        return (
            <CustomComponent greeting="Hello" name="Index.tsx" />


        );
    }
}

ReactDOM.render(
    <GreetingApp />,
    document.getElementById("example")
);

function GetSubsiteListItems() {
    const searchSettings: SearchQuery = {
        Querytext: 'ContentType:"Pzl Handlingsplan"',
        SelectProperties: ['Title', 'PZLHPOrdre', 'PZLHPOrdrenummer', 'PZLHPKunde', 'PZLHPKundenummer', 'PZLHPAnsvarlig', 'PZLHPVerdi', 'PZLHPFremgangsplan', 'Path'],
        RowLimit: 100
    };

    pnp.sp.search(searchSettings).then((r: SearchResults) => {
        console.log(r.PrimarySearchResults[0].Title);
    })
}
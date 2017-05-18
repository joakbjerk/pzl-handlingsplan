import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Fabric from 'office-ui-fabric-react';
import pnp, { SearchQuery, SearchResults } from 'sp-pnp-js'

console.log('Hello from handlingsplaner.tsx');

interface IQueryData {
    Results: [{
        Title?: string;
        Ordre?: string;
        Ordrenummer?: string;
        Kunde?: string;
        Kundenummer?: string;
        Ansvarlig?: string;
        Verdi?: string;
        Fremgangsplan?: string;
        Path?: string;
    }]

}

const Results = (props: any) => {
    return (
        <div>
            <p>{props.Result.Title} - {props.Result.PZLHPOrdre} - {props.Result.PZLHPOrdrenummer} - {props.Result.PZLHPKunde} - {props.Result.PZLHPKundenummer} - {props.Result.PZLHPAnsvarlig} - {props.Result.PZLHPVerdi} - {props.Result.PZLHPFremgangsplan} - <a href={props.Result.Path}>Location</a></p>
        </div>
    )
}

class Handlingsplaner extends React.Component<any, any> {
    constructor() {
        super();
        this.state = { Results: [{}] };
    }

    GetSubsiteListItems() {
        const searchSettings: SearchQuery = {
            Querytext: 'ContentType:"Pzl Handlingsplan"',
            SelectProperties: ['Title', 'PZLHPOrdre', 'PZLHPOrdrenummer', 'PZLHPKunde', 'PZLHPKundenummer', 'PZLHPAnsvarlig', 'PZLHPVerdi', 'PZLHPFremgangsplan', 'Path'],
            RowLimit: 10
        };
        pnp.sp.search(searchSettings).then((r: SearchResults) => {
            let searchResults = r.PrimarySearchResults;
            console.log('searchResults', searchResults);
            this.setState({ Results: searchResults });
        })
    }

    componentDidMount() {
        this.GetSubsiteListItems();
        console.log('Component Did Mount');
    }

    render() {
        let resultsState = this.state.Results;
        let resultsMarkup = resultsState.map((props: any) => <Results Result={props} />);
        return (
            <div>
                {resultsMarkup}
            </div>
        )
    }
}

ReactDOM.render(
    <Handlingsplaner />,
    document.getElementById("Render-Target")
);

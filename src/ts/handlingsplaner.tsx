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
    console.log('Results Const');
    console.log('Props', props);
    return (
        <div>
            <h1>{props.Result.Title}</h1>
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
            RowLimit: 100
        };
        pnp.sp.search(searchSettings).then((r: SearchResults) => {
            let searchResults = r.PrimarySearchResults;
            console.log('searchResults', searchResults);
            this.setState({ Results: searchResults });
        })
    }

    IterateSearchResults(results: any) {
        console.log('IterateSearchResults', results);
        for (let index = 0; index < results.length; index++) {
            console.log(results[index]);
        }
    }

    componentDidMount() {
        this.GetSubsiteListItems();
        console.log('Component Did Mount');
    }

    render() {
        let resultsState = this.state.Results;
        console.log('resultsState', resultsState);
        let resultsMarkup = resultsState.map((props: any) => <Results Result={props} />);
        console.log('resultsMarkup', resultsMarkup);
        return (
            <div>
                <h1>{resultsMarkup}</h1>
            </div>
        )
    }
}

ReactDOM.render(
    <Handlingsplaner />,
    document.getElementById("Render-Target")
);

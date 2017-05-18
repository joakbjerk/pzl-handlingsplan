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
        <div className='ms-Grid-row'>
            <div className='ms-Grid-col ms-u-sm1'><p>{props.Result.Title}</p></div>
            <div className='ms-Grid-col ms-u-sm1'><p>{props.Result.PZLHPOrdre}</p></div>
            <div className='ms-Grid-col ms-u-sm1'><p>{props.Result.PZLHPOrdrenummer}</p></div>
            <div className='ms-Grid-col ms-u-sm1'><p>{props.Result.PZLHPKunde}</p></div>
            <div className='ms-Grid-col ms-u-sm1'><p>{props.Result.PZLHPKundenummer}</p></div>
            <div className='ms-Grid-col ms-u-sm1'><p>{props.Result.PZLHPAnsvarlig}</p></div>
            <div className='ms-Grid-col ms-u-sm1'><p>{props.Result.PZLHPVerdi}</p></div>
            <div className='ms-Grid-col ms-u-sm1'><p>{props.Result.PZLHPFremgangsplan}</p></div>
            <div className='ms-Grid-col ms-u-sm1'><a href={props.Result.Path}>Item Location</a></div>
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
            <div className="ms-Grid">
                <div className='ms-Grid-row'>
                    <div className='ms-Grid-col ms-u-sm1'><p>Title</p></div>
                    <div className='ms-Grid-col ms-u-sm1'><p>Ordre</p></div>
                    <div className='ms-Grid-col ms-u-sm1'><p>Ordrenummer</p></div>
                    <div className='ms-Grid-col ms-u-sm1'><p>kunde</p></div>
                    <div className='ms-Grid-col ms-u-sm1'><p>Kundenummer</p></div>
                    <div className='ms-Grid-col ms-u-sm1'><p>Ansvarlig</p></div>
                    <div className='ms-Grid-col ms-u-sm1'><p>Verdi</p></div>
                    <div className='ms-Grid-col ms-u-sm1'><p>Fremgangsplan</p></div>
                    <div className='ms-Grid-col ms-u-sm1'><p>Item Location</p></div>
                </div>
                {resultsMarkup}
            </div >
        )
    }
}

ReactDOM.render(
    <Handlingsplaner />,
    document.getElementById("Render-Target")
);

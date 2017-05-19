import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Fabric from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react/lib/DetailsList'
import { SearchQuery, SearchResults, sp } from 'sp-pnp-js'

let _items: any[] = [];

const _columns = [
    {
        key: 'columnTitle',
        name: 'Title',
        fieldName: 'title',
        minWidth: 100,
        maxWidth: 200,
        multiline: true
    },
    {
        key: 'columnOrdre',
        name: 'Ordre',
        fieldName: 'ordre',
        minWidth: 100,
        maxWidth: 200,
        multiline: true
    },
    {
        key: 'columnOrdrenummer',
        name: 'Ordrenummer',
        fieldName: 'ordrenummer',
        minWidth: 100,
        maxWidth: 200,
        multiline: true
    },
    {
        key: 'columnKunde',
        name: 'Kunde',
        fieldName: 'kunde',
        minWidth: 100,
        maxWidth: 200,
        multiline: true
    },
    {
        key: 'columnKundenummer',
        name: 'Kundenummer',
        fieldName: 'kundenummer',
        minWidth: 100,
        maxWidth: 200,
        multiline: true
    },
    {
        key: 'columnAnsvarlig',
        name: 'ansvarlig',
        fieldName: 'ansvarlig',
        minWidth: 100,
        maxWidth: 200,
        multiline: true
    },
    {
        key: 'columnVerdi',
        name: 'Verdi',
        fieldName: 'verdi',
        minWidth: 100,
        maxWidth: 200,
        multiline: true
    },
    {
        key: 'columnFremgangsplan',
        name: 'Fremgangsplan',
        fieldName: 'fremgangsplan',
        minWidth: 100,
        maxWidth: 200,
        multiline: true
    },
    {
        key: 'columnItemLocation',
        name: 'Item Location',
        fieldName: 'itemLocation',
        minWidth: 100,
        maxWidth: 200,
        multiline: true
    }
]

const SearchResultsItems = (props: any) => {
    return (
        <div>
            <p>{props.Result.Title}</p>
            <p>{props.Result.PZLHPOrdre}</p>
            <p>{props.Result.PZLHPOrdrenummer}</p>
            <p>{props.Result.PZLHPKunde}</p>
            <p>{props.Result.PZLHPKundenummer}</p>
            <p>{props.Result.PZLHPAnsvarlig}</p>
            <p>{props.Result.PZLHPVerdi}</p>
            <p>{props.Result.PZLHPFremgangsplan}</p>
            <a href={props.Result.Path}>Item Location</a>
        </div>
    )
}

class Handlingsplaner extends React.Component<any, any> {
    constructor() {
        super();
        this.state = { Items: _items };
    }

    GetSubsiteListItems() {
        const searchSettings: SearchQuery = {
            Querytext: 'ContentType:"Pzl Handlingsplan"',
            SelectProperties: [
                'Title',
                'PZLHPOrdre',
                'PZLHPOrdrenummer',
                'PZLHPKunde',
                'PZLHPKundenummer',
                'PZLHPAnsvarlig',
                'PZLHPVerdi',
                'PZLHPFremgangsplan',
                'Path'],
            RowLimit: 10
        };
        sp.search(searchSettings).then((r: SearchResults) => {
            let searchResults = r.PrimarySearchResults;
            console.log('searchResults', searchResults);
            this.PushItems(searchResults);

        })
    }

    PushItems(items: any) {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            _items.push({
                title: item.Title,
                ordre: item.PZLHPOrdre,
                ordrenummer: item.PZLHPOrdrenummer,
                kunde: item.PZLHPKunde,
                kundenummer: item.PZLHPKundenummer,
                ansvarlig: item.PZLHPAnsvarlig,
                verdi: item.PZLHPVerdi,
                fremgangsplan: item.PZLHPFremgangsplan,
                itemLocation: item.Path
            })

        }
    }

    componentDidMount() {
        this.GetSubsiteListItems();
        console.log('Component Did Mount');
    }

    render() {
        let itemsState = this.state.Item;
        console.log('itemsState', itemsState);

        return (
            <div>
                <DetailsList
                    items={_items}
                    columns={_columns}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <Handlingsplaner />,
    document.getElementById("Render-Target")
);

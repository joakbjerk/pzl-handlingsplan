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

const ResultItems = (item: any) => {
    return (
        {
            title: item.Title,
            ordre: item.PZLHPOrdre,
            ordrenummer: item.PZLHPOrdrenummer,
            kunde: item.PZLHPKunde,
            kundenummer: item.PZLHPKundenummer,
            ansvarlig: item.PZLHPAnsvarlig,
            verdi: item.PZLHPVerdi,
            fremgangsplan: item.PZLHPFremgangsplan,
            itemLocation: item.Path
        }
    )
}

class Handlingsplaner extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            Items: []
        };
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
            this.setState({ Items: searchResults });

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

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Fabric from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react/lib/DetailsList'
import { SearchQuery, SearchResults, sp } from 'sp-pnp-js'

let _items: object[] = [];

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

class Handlingsplaner extends React.Component<any, any> {

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
            this.PushItems(searchResults);
        })
    }

    PushItems(items: any) {
        items.forEach((element: any) => {
            _items.push({
                title: element.Title,
                ordre: element.PZLHPOrdre,
                ordrenummer: element.PZLHPOrdrenummer,
                kunde: element.PZLHPKunde,
                kundenummer: element.PZLHPKundenummer,
                ansvarlig: element.PZLHPAnsvarlig,
                verdi: element.PZLHPVerdi,
                fremgangsplan: element.PZLHPFremgangsplan,
                itemLocation: element.Path
            })
        });
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

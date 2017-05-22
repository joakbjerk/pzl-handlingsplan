import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsList, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react/lib/DetailsList'
import { SearchQuery, SearchResults, sp } from 'sp-pnp-js'

const Items: object[] = [];

const Columns = [
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
        name: 'Ansvarlig',
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

    getSubsiteListItems() {
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
            RowLimit: 100
        };
        sp.search(searchSettings).then((r: SearchResults) => {
            let searchResults = r.PrimarySearchResults;
            this.pushItems(searchResults);
        })
    }

    pushItems(searchResults: any) {
        searchResults.forEach((element: any) => {
            Items.push({
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
        this.getSubsiteListItems();
        console.log('Component Did Mount');
    }

    render() {
        return (
            <div>
                <DetailsList
                    items={Items}
                    columns={Columns}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <Handlingsplaner />,
    document.getElementById("Render-Target")
);

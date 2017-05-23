import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import { DetailsList, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react/lib/DetailsList'
import { SearchQuery, SearchResults, sp } from 'sp-pnp-js'

console.log('Hello from Handlingsplaner.js');

const Items: object[] = [];

const colOpt = {
    minWidth: 150,
    maxWidth: 200
}

const Columns = [
    {
        key: 'columnOpprettet',
        name: 'Opprettet',
        fieldName: 'opprettet',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnOpprettetAv',
        name: 'Opprettet Av',
        fieldName: 'opprettetAv',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnOmråde',
        name: 'Område',
        fieldName: 'område',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnKontrakt',
        name: 'Kontrakt',
        fieldName: 'kontrakt',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnProsessavvik',
        name: 'Sak/prosessavvik',
        fieldName: 'prossesavvik',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnÅrsak',
        name: 'Årsak',
        fieldName: 'årsak',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnKorrigerende',
        name: 'Korrigerende Eller Forebyggende Tiltak',
        fieldName: 'korrigerende',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnBehovForHjelp',
        name: 'Behov for hjelp?',
        fieldName: 'behovForHjelp',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnMålForTiltaket',
        name: 'Mål for tiltaket',
        fieldName: 'målForTiltaket',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnTidsfrist',
        name: 'Tid/frist',
        fieldName: 'tidsfrist',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnAnsvarlig',
        name: 'Ansvarlig',
        fieldName: 'ansvarlig',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnMålOppnådd',
        name: 'Mål oppnådd?',
        fieldName: 'målOppnådd',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnForsinkelse',
        name: 'Grunn til forsinkelse',
        fieldName: 'forsinkelse',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnOppfølgingstiltak',
        name: 'Oppfølgingstiltak',
        fieldName: 'oppfølgingstiltak',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnNyFrist',
        name: 'Ny frist',
        fieldName: 'nyFrist',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    },
    {
        key: 'columnGjennomført',
        name: 'Gjennomført',
        fieldName: 'gjennomført',
        minWidth: colOpt.minWidth,
        maxWidth: colOpt.maxWidth,
        multiline: true
    }
]

class Handlingsplaner extends React.Component<any, any> {

    getSubsiteListItems() {
        const searchSettings: SearchQuery = {
            Querytext: 'ContentType:"Element Handlingsplan"',
            SelectProperties: [
                'HPOmråde',
                'HPKontrakter',
                'HPSakProsessavvik',
                'HPÅrsak',
                'HPKorrigerende',
                'HPBehovForHjelp',
                'HPMålForTiltak',
                'HPTidsfrist',
                'HPAnsvarlig',
                'HPMålOppnådd',
                'HPGrunnTilForsinkelse',
                'HPOppfølgingstiltak',
                'HPNyFrist',
                'HPGjennomført',
                'Created',
                'Author'

            ],
            RowLimit: 10
        };
        sp.search(searchSettings).then((r: SearchResults) => {
            let searchResults = r.PrimarySearchResults;
            console.log('getSubSiteListItems searchResults', searchResults);
            this.pushItems(searchResults);
        })
    }

    pushItems(searchResults: any) {
        console.log('pushItems searchResults', searchResults)
        searchResults.forEach((element: any) => {
            Items.push({
                opprettet: moment(element.Created).format('DD/MM/YYYY'),
                opprettetAv: element.Author,
                område: element.HPOmråde,
                kontrakt: element.HPKontrakter,
                prossesavvik: element.HPSakProsessavvik,
                årsak: element.HPÅrsak,
                korrigerende: element.HPKorrigerende,
                behovForHjelp: element.HPBehovForHjelp,
                målForTiltaket: element.HPMålForTiltak,
                tidsfrist: element.HPTidsfrist,
                ansvarlig: element.HPAnsvarlig,
                målOppnådd: element.HPMålOppnådd,
                forsinkelse: element.HPGrunnTilForsinkelse,
                oppfølgingstiltak: element.HPOppfølgingstiltak,
                nyFrist: element.HPNyFrist,
                gjennomført: element.HPGjennomført

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

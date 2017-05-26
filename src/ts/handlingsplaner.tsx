import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import { _columns } from './columns';
import { Excel } from './excel';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsList, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { SearchQuery, SearchResults, sp } from 'sp-pnp-js';

export const _items: object[] = [];

function orderBy(items, fieldNames) {

}

class Handlingsplaner extends React.Component<any, any> {

    getSubsiteListItems() {
        const searchSettings: SearchQuery = {
            Querytext: 'ContentType:"Element Handlingsplan"',
            SelectProperties: [
                'OmrådeOWSCHCM',
                'KontrakterOWSCHCM',
                'Sak/prosessavvikOWSMTXT',
                'Årsak-OWSMTXT',
                'KorrigerendeellerfOWSMTXT',
                'BehovforhjelpOWSCHCS',
                'MålfortiltakOWSMTXT',
                'Tid/fristOWSDATE',
                'AnsvarligOWSUSER',
                'MåloppnåddOWSCHCS',
                'GrunntilforsinkelsOWSCHCS',
                'OppfølgingstiltakOWSMTXT',
                'KontrollertdatoOWSDATE',
                'StatushandlingsplanOWSCHCS',
                'Created',
                'Author'

            ],
            RowLimit: 5000
        };
        sp.search(searchSettings).then((r: SearchResults) => {
            let searchResults = r.PrimarySearchResults;
            this.pushItems(searchResults);
        })
    }

    pushItems(searchResults: any) {
        searchResults.forEach((element: any) => {
            _items.push({
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
                <Excel />
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


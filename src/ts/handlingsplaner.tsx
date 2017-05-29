import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import { _columns } from './columns';
import { Excel } from './excel';
import { SearchQuery, SearchResults, sp } from 'sp-pnp-js';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
require('es6-promise/auto');

let _items = [];

class Handlingsplaner extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            items: [],
        }
    }

    getSubsiteListItems() {
        console.log('getSubSiteListItems');
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
                'Author',
                'Path',
                'SiteTitle'

            ],
            RowLimit: 100
        };
        sp.search(searchSettings).then((r: SearchResults) => {
            let searchResults = r.PrimarySearchResults;
            console.log('searchResults', searchResults);
            let items = searchResults.map((item: any) => ({
                sideHentetFra: item.SiteTitle,
                opprettet: moment(item.Created).format('DD/MM/YYYY'),
                opprettetAv: item.Author,
                område: item.OmrådeOWSCHCM,
                kontrakt: item.KontrakterOWSCHCM,
                prossesavvik: item['Sak/prosessavvikOWSMTXT'],
                årsak: item['Årsak-OWSMTXT'],
                korrigerende: item.KorrigerendeellerfOWSMTXT,
                behovForHjelp: item.BehovforhjelpOWSCHCS,
                målForTiltaket: item.MålfortiltakOWSMTXT,
                tidsfrist: item['Tid/fristOWSDATE'],
                ansvarlig: item.AnsvarligOWSUSER,
                målOppnådd: item.MåloppnåddOWSCHCS,
                forsinkelse: item.GrunntilforsinkelsOWSCHCS,
                oppfølgingstiltak: item.OppfølgingstiltakOWSMTXT,
                nyFrist: item.KontrollertdatoOWSDATE,
                gjennomført: item.StatushandlingsplanOWSCHCS,
                location: item.path,
            }));
            this.setState({ items: items, isLoading: false });
        })
    }

    _onRenderItemColumn(item, index, column) {
        let colValue = item[column.fieldName];
        /*console.log('item', item);
        console.log('index', index);
        console.log('column', column);*/
        switch (column.key) {
            case 'columnProsessavvik':
            case 'columnÅrsak':
            case 'columnMålForTiltaket':
            case 'columnOppfølgingstiltak': {
                return <span dangerouslySetInnerHTML={{ __html: colValue }}></span>
            }
            default: {
                return <span>{colValue}</span>;
            }
        }
    }

    componentDidMount() {
        this.getSubsiteListItems();
        console.log('Component Did Mount');
    }

    render() {
        if (this.state.isLoading) {
            return <Spinner type={SpinnerType.large} />;
        } else {
            return (
                <div>
                    <Excel
                        items={this.state.items}
                        columns={_columns} />
                    <DetailsList
                        items={this.state.items}
                        columns={_columns}
                        onRenderItemColumn={this._onRenderItemColumn}
                    />
                </div>
            )
        }
    }
}

ReactDOM.render(
    <Handlingsplaner />,
    document.getElementById("Render-Target")
);


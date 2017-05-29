import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import { _columns } from './columns';
import { Excel } from './excel';
import { SearchQuery, SearchResults, sp } from 'sp-pnp-js';
import { DetailsList, DetailsListLayoutMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
require('es6-promise/auto');
moment.locale('nb')

function reformatDate(item) {
    console.log(item);
    let regExPattern = /\d{4}-\d{2}-\d{2}/;
    if (item) {
        return moment(regExPattern.exec(item).toString()).format('L');
    } else {
        return null;
    }
}

class Handlingsplaner extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            items: [],
        }
    }

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
                'Author',
                'ParentLink',
                'SiteTitle'

            ],
            RowLimit: 1
        };
        sp.search(searchSettings).then((r: SearchResults) => {
            let searchResults = r.PrimarySearchResults;
            let items = searchResults.map((item: any) => ({
                hentetFra: {
                    title: item.SiteTitle,
                    url: item.ParentLink
                },
                opprettet: reformatDate(item.Created),
                opprettetAv: item.Author,
                område: item.OmrådeOWSCHCM,
                kontrakt: item.KontrakterOWSCHCM,
                prossesavvik: item['Sak/prosessavvikOWSMTXT'],
                årsak: item['Årsak-OWSMTXT'],
                korrigerende: item.KorrigerendeellerfOWSMTXT,
                behovForHjelp: item.BehovforhjelpOWSCHCS,
                målForTiltaket: item.MålfortiltakOWSMTXT,
                tidsfrist: reformatDate(item['Tid/fristOWSDATE']),
                ansvarlig: item.AnsvarligOWSUSER,
                målOppnådd: item.MåloppnåddOWSCHCS,
                forsinkelse: item.GrunntilforsinkelsOWSCHCS,
                oppfølgingstiltak: item.OppfølgingstiltakOWSMTXT,
                nyFrist: reformatDate(item.KontrollertdatoOWSDATE),
                gjennomført: item.StatushandlingsplanOWSCHCS

            }));
            this.setState({ items: items, isLoading: false });
        })
    }

    _onRenderItemColumn(item, index, column) {
        let colValue = item[column.fieldName];
        switch (column.key) {
            case 'columnProsessavvik':
            case 'columnÅrsak':
            case 'columnMålForTiltaket':
            case 'columnOppfølgingstiltak':
            case 'columnKorrigerende': {
                return <span dangerouslySetInnerHTML={{ __html: colValue }}></span>
            }
            case 'columnHentetFra': {
                return <Link href={colValue.url}>{colValue.title}</Link>
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
            <Spinner size={SpinnerSize.large} label='Henter listedata...' />;
        }
        return (
            <div>
                <Excel
                    items={this.state.items}
                    columns={_columns}
                />
                <DetailsList
                    items={this.state.items}
                    columns={_columns}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    onRenderItemColumn={this._onRenderItemColumn}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <Handlingsplaner />,
    document.getElementById("Render-Target")
);


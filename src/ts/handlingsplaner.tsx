import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mapAllItems, mapCurrentItems, formatDate } from '../utils/utils'
import { _columns } from '../components/columns';
import { Excel } from '../components/excel';
import { SearchQuery, SearchResults, SearchQueryBuilder, sp } from 'sp-pnp-js';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
require('es6-promise/auto');

let currentResults: SearchResults = null;
let page: 0;

class Handlingsplaner extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            allItems: [],
        }
    }

    getSubsiteListItems() {
        const searchSettings: SearchQuery = {
            Querytext: 'ContentType:"Element Handlingsplan"',
            RowLimit: 100,
            RowsPerPage: 50,
            StartRow: 0,
            EnableQueryRules: true,
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
            ]
        }

        sp.search(searchSettings).then((r: SearchResults) => {
            let searchResults = r.PrimarySearchResults;
            currentResults = r;
            page = 0;
            let items = currentResults.PrimarySearchResults.map((item: any) => ({
                hentetFra: {
                    title: item.SiteTitle,
                    url: item.ParentLink
                },
                opprettet: formatDate(item.Created),
                opprettetAv: item.Author,
                område: item.OmrådeOWSCHCM,
                kontrakt: item.KontrakterOWSCHCM,
                prossesavvik: item['Sak/prosessavvikOWSMTXT'],
                årsak: item['Årsak-OWSMTXT'],
                korrigerende: item.KorrigerendeellerfOWSMTXT,
                behovForHjelp: item.BehovforhjelpOWSCHCS,
                målForTiltaket: item.MålfortiltakOWSMTXT,
                tidsfrist: formatDate(item['Tid/fristOWSDATE']),
                ansvarlig: item.AnsvarligOWSUSER,
                målOppnådd: item.MåloppnåddOWSCHCS,
                forsinkelse: item.GrunntilforsinkelsOWSCHCS,
                oppfølgingstiltak: item.OppfølgingstiltakOWSMTXT,
                nyFrist: formatDate(item.KontrollertdatoOWSDATE),
                gjennomført: item.StatushandlingsplanOWSCHCS
            }));
            this.setState({ allItems: items, isLoading: false });
        })
    }

    nextPage = () => {
        console.log('page', page);
        this.setState({ isLoading: true });
        currentResults.getPage(++page).then((r: SearchResults) => {
            currentResults = r;
            let items = currentResults.PrimarySearchResults.map((item: any) => ({
                hentetFra: {
                    title: item.SiteTitle,
                    url: item.ParentLink
                },
                opprettet: formatDate(item.Created),
                opprettetAv: item.Author,
                område: item.OmrådeOWSCHCM,
                kontrakt: item.KontrakterOWSCHCM,
                prossesavvik: item['Sak/prosessavvikOWSMTXT'],
                årsak: item['Årsak-OWSMTXT'],
                korrigerende: item.KorrigerendeellerfOWSMTXT,
                behovForHjelp: item.BehovforhjelpOWSCHCS,
                målForTiltaket: item.MålfortiltakOWSMTXT,
                tidsfrist: formatDate(item['Tid/fristOWSDATE']),
                ansvarlig: item.AnsvarligOWSUSER,
                målOppnådd: item.MåloppnåddOWSCHCS,
                forsinkelse: item.GrunntilforsinkelsOWSCHCS,
                oppfølgingstiltak: item.OppfølgingstiltakOWSMTXT,
                nyFrist: formatDate(item.KontrollertdatoOWSDATE),
                gjennomført: item.StatushandlingsplanOWSCHCS
            }));
            this.setState({ allItems: items, isLoading: false });
        });
    }


    prevPage = () => {
        console.log('page', page);
        this.setState({ isLoading: true });
        if (page <= 0) {
            this.setState({ isLoading: false });
        } else {
            currentResults.getPage(page--).then((r: SearchResults) => {
                currentResults = r;
                let items = currentResults.PrimarySearchResults.map((item: any) => ({
                    hentetFra: {
                        title: item.SiteTitle,
                        url: item.ParentLink
                    },
                    opprettet: formatDate(item.Created),
                    opprettetAv: item.Author,
                    område: item.OmrådeOWSCHCM,
                    kontrakt: item.KontrakterOWSCHCM,
                    prossesavvik: item['Sak/prosessavvikOWSMTXT'],
                    årsak: item['Årsak-OWSMTXT'],
                    korrigerende: item.KorrigerendeellerfOWSMTXT,
                    behovForHjelp: item.BehovforhjelpOWSCHCS,
                    målForTiltaket: item.MålfortiltakOWSMTXT,
                    tidsfrist: formatDate(item['Tid/fristOWSDATE']),
                    ansvarlig: item.AnsvarligOWSUSER,
                    målOppnådd: item.MåloppnåddOWSCHCS,
                    forsinkelse: item.GrunntilforsinkelsOWSCHCS,
                    oppfølgingstiltak: item.OppfølgingstiltakOWSMTXT,
                    nyFrist: formatDate(item.KontrollertdatoOWSDATE),
                    gjennomført: item.StatushandlingsplanOWSCHCS
                }));
                this.setState({ allItems: items, isLoading: false });
            });
        }
    }


    _onRenderItemColumn(item, index, column) {
        let colValue = item[column.fieldName];
        switch (column.key) {
            case 'columnProsessavvik':
            case 'columnÅrsak':
            case 'columnMålForTiltaket':
            case 'columnOppfølgingstiltak':
            case 'columnKorrigerende': {
                return <span dangerouslySetInnerHTML={{ __html: colValue }}></span >
            }
            case 'columnHentetFra': {
                return <Link href={colValue.url} > {colValue.title}</Link>
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
            return <Spinner size={SpinnerSize.large} label='Henter listedata' />;
        } else {
            return (
                <div>
                    <Excel
                        items={this.state.allItems}
                        columns={_columns}
                    />
                    <DefaultButton
                        data-automation-id='Top-Prev-Page-Button'
                        description='Neste Side'
                        iconProps={{ iconName: 'Back' }}
                        onClick={this.prevPage}

                    />
                    <DefaultButton
                        data-automation-id='Top-Next-Page-Button'
                        description='Neste Side'
                        iconProps={{ iconName: 'Forward' }}
                        onClick={this.nextPage}

                    />
                    <DetailsList
                        items={this.state.allItems}
                        columns={_columns}
                        onRenderItemColumn={this._onRenderItemColumn}
                    />
                    <DefaultButton
                        data-automation-id='Bottom-Prev-Page-Button'
                        description='Neste Side'
                        iconProps={{ iconName: 'Back' }}
                        onClick={this.prevPage}

                    />
                    <DefaultButton
                        data-automation-id='Bottom-Next-Page-Button'
                        description='Neste side'
                        iconProps={{ iconName: 'Forward' }}
                        onClick={this.nextPage}
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


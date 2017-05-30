import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mapAllItems, mapCurrentItems } from '../utils/utils'
import { _columns } from '../components/columns';
import { Excel } from '../components/excel';
import { HeaderContextualMenu } from '../components/contextualmenu'
import { NextButton, PrevButton } from '../components/buttons';
import { SearchQuery, SearchResults, SearchQueryBuilder, sp } from 'sp-pnp-js';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
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
            currentItems: [],
            isContextMenuVisible: false,
        }
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this._onColumnClick = this._onColumnClick.bind(this);
        this._onColumnDismiss = this._onColumnDismiss.bind(this);
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
            let _allItems = mapAllItems(searchResults);
            let _currentItems = mapCurrentItems(currentResults);
            this.setState({ allItems: _allItems, currentItems: _currentItems, isLoading: false });
        })
    }

    nextPage() {
        console.log('page', page);
        this.setState({ isLoading: true });
        currentResults.getPage(++page).then((r: SearchResults) => {
            currentResults = r;
            let _currentItems = mapCurrentItems(currentResults);
            this.setState({ currentItems: _currentItems, isLoading: false });
        });
    }


    prevPage() {
        console.log('page', page);
        this.setState({ isLoading: true });
        if (page <= 0) {
            this.setState({ isLoading: false });
        } else {
            currentResults.getPage(page--).then((r: SearchResults) => {
                currentResults = r;
                let _currentItems = mapCurrentItems(currentResults);
                this.setState({ currentItems: _currentItems, isLoading: false });
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
                return <Link href={colValue.url}>{colValue.title}</Link>
            }
            default: {
                return <span>{colValue}</span>;
            }
        }
    }

    _onColumnClick(event: React.MouseEvent<HTMLElement>, column) {
        this.setState({ target: event.target, isContextMenuVisible: true });
    }
    _onColumnDismiss(event: any, column) {
        this.setState({ target: event.target, isContextMenuVisible: false });
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
                    <h2>Under utvikling</h2>
                    <Excel
                        items={this.state.allItems}
                        columns={_columns}
                    />
                    <PrevButton clickHandler={this.prevPage} />
                    <NextButton clickHandler={this.nextPage} />
                    <DetailsList
                        items={this.state.currentItems}
                        columns={_columns}
                        onRenderItemColumn={this._onRenderItemColumn}
                        onColumnHeaderClick={this._onColumnClick}

                    />
                    {this.state.isContextMenuVisible ?
                        (<HeaderContextualMenu target={this.state.target} dismissHandler={this._onColumnDismiss} />)
                        : (null)}
                    <PrevButton clickHandler={this.prevPage} />
                    <NextButton clickHandler={this.nextPage} />
                </div>
            )
        }
    }
}

ReactDOM.render(
    <Handlingsplaner />,
    document.getElementById("Render-Target")
);


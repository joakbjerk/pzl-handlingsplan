import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mapAllItems, mapCurrentItems } from '../utils/utils'
import { _columns } from '../components/columns';
import { Excel } from '../components/excel';
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
            isSorted: false,
            isSortedDescending: false,
            contextualMenuProps: null,
            sortedColumnKey: 'name'
        }

        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this._onColumnClick = this._onColumnClick.bind(this);
        this._getContextualMenuProps = this._getContextualMenuProps.bind(this);
        this._onContextualMenuDismissed = this._onContextualMenuDismissed.bind(this);
        this._onSortColumn = this._onSortColumn.bind(this);
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
        let siteLink = item.parentLink;
        console.log(siteLink);
        switch (column.key) {
            case 'columnProsessavvik':
            case 'columnÅrsak':
            case 'columnMålForTiltaket':
            case 'columnOppfølgingstiltak':
            case 'columnKorrigerende': {
                return <span dangerouslySetInnerHTML={{ __html: colValue }}></span >
            }
            case 'columnHentetFra': {
                return <Link href={siteLink}>{colValue}</Link>
            }
            default: {
                return <span>{colValue}</span>;
            }
        }
    }

    _onColumnClick(event: React.MouseEvent<HTMLElement>, column) {
        console.log('Clicked ', column);
        this.setState({
            contextualMenuProps: this._getContextualMenuProps(event, column)
        });
    }

    _onContextualMenuDismissed() {
        this.setState({
            contextualMenuProps: null
        });
    }

    //(isSortedDescending ? a[fieldName] < b[fieldName] : a[fieldName] > b[fieldName]) ? 1 : -1)
    _onSortColumn(fieldName: string, isSortedDescending: boolean) {
        console.log('fieldName', fieldName);
        console.log('isSortedDescending', isSortedDescending)
        let currentItems = this.state.currentItems;
        let sortedItems = currentItems.slice(0).sort((a, b) => {
            let comparison;
            if (isSortedDescending) {
                comparison = a[fieldName] < b[fieldName];
            } else {
                comparison = a[fieldName] > b[fieldName];
            }
            if (comparison) {
                return 1;
            } else {
                return -1;
            }
        });
        console.log('sortedItems', sortedItems);
        this.setState({
            currentItems: sortedItems,
            groups: null,
            isSortedDescending: isSortedDescending,
            sortedColumnKey: fieldName
        });
    }

    _getContextualMenuProps(event: React.MouseEvent<HTMLElement>, column) {
        let items = [
            {
                key: 'aTilÅ',
                name: 'A-Å',
                icon: 'SortUp',
                canCheck: true,
                checked: column.isSorted && !column.isSortedDescending,
                onClick: () => this._onSortColumn(column.fieldName, false)
            },
            {
                key: 'åTilA',
                name: 'Å-A',
                icon: 'SortDown',
                canCheck: true,
                checked: column.isSorted && column.isSortedDescending,
                onClick: () => this._onSortColumn(column.fieldName, true)
            }
        ];
        return {
            items: items,
            targetElement: event.currentTarget as HTMLElement,
            gapSpace: 10,
            isBeakVisible: true,
            onDismiss: this._onContextualMenuDismissed
        };
    }

    componentDidMount() {
        this.getSubsiteListItems();
        console.log('Component Did Mount');
    }

    render() {
        let { contextualMenuProps, currentItems, allItems } = this.state;
        if (this.state.isLoading) {
            return <Spinner size={SpinnerSize.large} label='Henter listedata' />;
        } else {
            return (
                <div>
                    <h2>Sortering/Filtrering under arbeid</h2>
                    <Excel
                        items={allItems}
                        columns={_columns}
                    />
                    <PrevButton clickHandler={this.prevPage} />
                    <NextButton clickHandler={this.nextPage} />
                    <DetailsList
                        items={currentItems}
                        columns={_columns}
                        onRenderItemColumn={this._onRenderItemColumn}
                        onColumnHeaderClick={this._onColumnClick}

                    />
                    {<ContextualMenu { ...contextualMenuProps } />}
                    < PrevButton clickHandler={this.prevPage} />
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


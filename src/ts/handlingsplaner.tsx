import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import { _columns } from './columns';
import { Excel } from './excel';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsList, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { SearchQuery, SearchResults, sp } from 'sp-pnp-js';

export const _items: object[] = [];

function groupBy(items, fieldName) {
    let groups = items.reduce((currentGroups, currentItem, index) => {
        let lastGroup = currentGroups[currentGroups.length - 1];
        let fieldValue = currentItem[fieldName];

        if (!lastGroup || lastGroup.value !== fieldValue) {
            currentGroups.push({
                key: 'group' + fieldValue + index,
                name: `By "${fieldValue}"`,
                value: fieldValue,
                startIndex: index,
                level: 0,
                count: 0
            });
        }
        if (lastGroup) {
            lastGroup.count = index - lastGroup.startIndex;
        }
        return currentGroups;
    }, []);

    // Fix last group count
    let lastGroup = groups[groups.length - 1];

    if (lastGroup) {
        lastGroup.count = items.length - lastGroup.startIndex;
    }

    return groups;
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
                'Author',
                'Path',
                'SiteTitle'

            ],
            RowLimit: 5000
        };
        sp.search(searchSettings).then((r: SearchResults) => {
            let searchResults = r.PrimarySearchResults;
            console.log('searchResults', searchResults);
            this.pushItems(searchResults);
        })
    }

    pushItems(searchResults: any) {
        searchResults.forEach((item: any) => {
            _items.push({
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
                site: item.SiteTitle

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


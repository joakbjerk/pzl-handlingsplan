import { _columns } from './columns';

export function initCSV(items: any) {
  let downloadLink = document.getElementById('Download-Link');
  let csv = convertCSV(items);
  csv = 'data:text/csv;charset=utf-8,' + '\uFEFF' + encodeURIComponent(csv);
  downloadLink.setAttribute('href', csv);
  downloadLink.setAttribute('download', 'Handlingsplaner.csv');
  downloadLink.setAttribute('disabled', 'false');
}

function getColumnNames(columns: object[]) {
  let columnNameString = '';
  columns.forEach((element: any) => {
    let lastElement = (element.key === 'columnGjennomført');
    if (lastElement) {
      columnNameString += element.name + '\n';
    } else {
      columnNameString += element.name + ',';
    }
  });
  return columnNameString;
}

function convertCSV(items: any) {
  let result: string, columnNames: any;
  console.log('items', items);
  if (!items) {
    return null;
  } else {

    columnNames = getColumnNames(_columns);
    result += columnNames;

    items.forEach((item: any) => {
      console.log(items.length);
      for (let props in item) {
        if (item.hasOwnProperty(props)) {
          console.log(item.length);
          result += items[props] + ',';

          //console.log('props', item[props]);
        }
      }
    });
    return result;
  }
}

/*result +=
        item.opprettet + ','
        + item.opprettetAv + ','
        + item.område + ','
        + item.kontrakt + ','
        + item.prossesavvik + ','
        + item.årsak + ','
        + item.korrigerend + ','
        + item.behovForHjelp + ','
        + item.målForTiltaket + ','
        + item.tidsfrist + ','
        + item.ansvarlig + ','
        + item.målOppnådd + ','
        + item.forsinkelse + ','
        + item.oppfølgingstiltak + ','
        + item.nyFrist + ','
        + item.gjennomført + '\n'; */
import * as moment from 'moment';

moment.locale('nb');

export function formatDate(date) {
  let datePattern = /\d{4}-\d{2}-\d{2}/;
  if (date) {
    let dateRegExec = datePattern.exec(date).toString()
    return moment(dateRegExec).format('L');
  } else {
    return null;
  }
}

export function formatData(items) {
  let reformattedItems = [];
  items.forEach(item => {
    reformattedItems.push({
      hentetFra: item.hentetFra,
      opprettet: item.opprettet,
      opprettetAv: item.opprettetAv,
      område: item.område,
      kontrakt: item.kontrakt,
      prossesavvik: removeHtmlTags(item.prossesavvik),
      årsak: removeHtmlTags(item.årsak),
      korrigerende: removeHtmlTags(item.korrigerende),
      behovForHjelp: item.behovForHjelp,
      målForTiltaket: removeHtmlTags(item.målForTiltaket),
      tidsfrist: item.tidsfrist,
      ansvarlig: item.ansvarlig,
      målOppnådd: item.målOppnådd,
      forsinkelse: item.forsinkelse,
      oppfølgingstiltak: removeHtmlTags(item.oppfølgingstiltak),
      nyFrist: item.nyFrist,
      gjennomført: item.gjennomført,
      location: item.location,
    });
  });
  return reformattedItems;
}

function removeHtmlTags(item: any) {
  const htmlTag = /(<([^>]+)>)/ig;
  if (item) {
    return item.replace(htmlTag, '').toString();
  } else {
    return null;
  }
}
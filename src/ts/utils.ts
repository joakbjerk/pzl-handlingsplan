import * as moment from 'moment';

moment.locale('nb');

export function formatDate(date) {
  let datePattern = /\d{4}-\d{2}-\d{2}/;
  console.log('date', date);
  if (date) {
    let dateString = datePattern.exec(date).toString();
    console.log('dateString', dateString);
    console.log('dateString typeof', typeof dateString);
    //let formatedDate = moment(datePattern).format('L');
    return date;
  } else {
    return null;
  }
}

export function formatData(items) {
  let formattedItems = [];
  items.forEach(item => {
    formattedItems.push({
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
  return formattedItems;
}

export function removeHtmlTags(item: any) {
  const htmlTag = /(<([^>]+)>)/ig;
  if (item) {
    return item.replace(htmlTag, '');
  } else {
    return null;
  }
}
import * as moment from 'moment';

moment.locale('nb');

//handlingsplaner.tsx utils
export function formatDate(date) {
  let datePattern = /\d{4}-\d{2}-\d{2}/;
  if (date) {
    return moment(datePattern.exec(date).toString()).format('L');
  } else {
    return null;
  }
}

export function mapAllItems(searchResults) {
  console.log('searchResults', searchResults);
  return (
    searchResults.map((item: any) => ({
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
    })
    )
  );
}

export function mapCurrentItems(currentResults) {
  console.log('currentResults', currentResults);
  return (
    currentResults.PrimarySearchResults.map((item: any) => ({
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
    })
    )
  );
}

//Excel.tsx utils.
export function formatData(items) {
  let formattedItems = [];
  items.forEach(item => {
    formattedItems.push({
      hentetFra: item.hentetFra.title,
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

export function removeHtmlTags(item) {
  const htmlTag = /(<([^>]+)>)/ig;
  if (item) {
    return item.replace(htmlTag, '').toString();
  } else {
    return null;
  }
}

export const dummyData = [
  {
    hentetFra: {
      title: 'Title 1',
      url: 'https://www.google.no'
    },
    opprettet: '01/01/1010',
    opprettetAv: 'Celine',
    område: 'Ute',
    kontrakt: 'Salgskontrakt',
    prossesavvik: 'Ingen',
    årsak: 'Fornøyd kunde',
    korrigerende: 'Rette opp i feil',
    behovForHjelp: 'Nei',
    målForTiltaket: 'Oppretholde gode relasjoner med kunde',
    tidsfrist: '02/03/2017',
    ansvarlig: 'Celine',
    målOppnådd: 'Ja',
    forsinkelse: 'Ingen',
    oppfølgingstiltak: 'Ingen Behov',
    nyFrist: 'Ingen',
    gjennomført: 'Ja'
  },
  {
    hentetFra: {
      title: 'Title 2',
      url: 'https://www.google.no'
    },
    opprettet: '02/02/2020',
    opprettetAv: 'Anders',
    område: 'Inne',
    kontrakt: 'reparasjon',
    prossesavvik: 'Mange',
    årsak: 'Steinssprut',
    korrigerende: 'Fikse knust vindu',
    behovForHjelp: 'Nei',
    målForTiltaket: 'Fikse skadene så raskt det lar seg gjøre',
    tidsfrist: '11/11/2017',
    ansvarlig: 'Anders',
    målOppnådd: 'Nei',
    forsinkelse: 'Sen levering av ny rute',
    oppfølgingstiltak: 'Dobbeltsjekke skadene',
    nyFrist: '12/03/2018',
    gjennomført: 'Nei'
  },
  {
    hentetFra: {
      title: 'Title 3',
      url: 'https://www.google.no'
    },
    opprettet: '03/03/3030',
    opprettetAv: 'Hans',
    område: 'Inne',
    kontrakt: 'reparasjon',
    prossesavvik: 'Mange',
    årsak: 'Steinssprut',
    korrigerende: 'Fikse knust vindu',
    behovForHjelp: 'Nei',
    målForTiltaket: 'Fikse skadene så raskt det lar seg gjøre',
    tidsfrist: '08/25/2017',
    ansvarlig: 'Hans',
    målOppnådd: 'Nei',
    forsinkelse: 'Sen levering av ny rute',
    oppfølgingstiltak: 'Dobbeltsjekke skadene',
    nyFrist: '10/08/2018',
    gjennomført: 'Nei'
  }

]

export function generateDummyData(amount) {
  let dataArray = [];
  let jaNei = ['Ja', 'Nei', 'Kanskje'];
  let område = ['Inne', 'Ute', 'Hos Kunde', 'Utlandet', 'Internt'];
  let årsak = ['Skade', 'Salg', 'Bytte', 'Refusjon', 'Saksmål'];
  let korrigerende = ['Reperasjon', 'Kompansasjon', 'Stille i retten',]
  let kontrakt = ['BMW', 'Audi', 'Volkswagen', 'Ford', 'Renault']
  let ansvarlig = ['Joakim', 'Mehlum', 'Bjerknes'];

  for (let i = 0; i < amount; i++) {
    dataArray.push({
      hentetFra: {
        title: 'Title ' + (i + 1),
        url: 'https://www.google.no'
      },
      opprettet: randomDate('2017', '2018'),
      opprettetAv: 'Joaikm Mehlum Bjerknes',
      område: 'Inne',
      kontrakt: 'reparasjon',
      prossesavvik: 'Mange',
      årsak: 'Steinssprut',
      korrigerende: 'Fikse knust vindu',
      behovForHjelp: 'Nei',
      målForTiltaket: 'Fikse skadene så raskt det lar seg gjøre',
      tidsfrist: randomDate('2017', '2018'),
      ansvarlig: 'Joakim Mehlum Bjerknes',
      målOppnådd: 'Nei',
      forsinkelse: 'Sen levering av ny rute',
      oppfølgingstiltak: 'Dobbeltsjekke skadene',
      nyFrist: randomDate('2017', '2018'),
      gjennomført: 'Nei'
    })
  }
}

export const nestedDataDummy = [
  { hentetFra: { title: 'Title 1', url: 'https://www.google.no' }, opprettet: '1', opprettetAv: 'Celine' },
  { hentetFra: { title: 'Title 2', url: 'https://www.google.no' }, opprettet: '2', opprettetAv: 'Anders' },
  { hentetFra: { title: 'Title 3', url: 'https://www.google.no' }, opprettet: '3', opprettetAv: 'Øystein' },
  { hentetFra: { title: 'Title 4', url: 'https://www.google.no' }, opprettet: '4', opprettetAv: 'Frank' },
  { hentetFra: { title: 'Title 5', url: 'https://www.google.no' }, opprettet: '5', opprettetAv: 'Hanne' },
  { hentetFra: { title: 'Title 6', url: 'https://www.google.no' }, opprettet: '6', opprettetAv: 'Melvin' },
]

export const numberDummyData = [
  { opprettet: '1', opprettetAv: 'Celine' },
  { opprettet: '2', opprettetAv: 'Anders' },
  { opprettet: '3', opprettetAv: 'Øystein' },
  { opprettet: '4', opprettetAv: 'Frank' },
  { opprettet: '5', opprettetAv: 'Hanne' },
  { opprettet: '6', opprettetAv: 'Melvin' },
]


function randomValue(value) {
  console.log('Temp');
}

function randomDate(start, end) {
  var date = new Date(start + Math.random() * (end - start));
  return date;
}
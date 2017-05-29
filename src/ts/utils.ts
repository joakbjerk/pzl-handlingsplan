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
  }));
}

export function mapCurrentItems(searchResults) {
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
  }));
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


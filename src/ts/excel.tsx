import * as React from 'react';
import * as moment from 'moment';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import Workbook from 'react-excel-workbook';

function formatData(items) {
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
  console.log('formattedItems', formattedItems);
  return formattedItems;
}

function removeHtmlTags(item: any) {
  const htmlTag = /(<([^>]+)>)/ig;
  if (item) {
    return item.replace(htmlTag, '');
  } else {
    return null;
  }
}

const ExportButton = () => {
  return (
    <DefaultButton
      data-automation-id='Excel-Export-Button'
      description='Eskoprter listedata til excel'
      iconProps={{ iconName: 'ExcelLogo' }}
      text='Eksporter til Excel'
    />
  );
}

export const Excel = ({ items, columns }) => {
  return (
    <Workbook filename="Handlingsplaner.xlsx" element={<ExportButton />}>
      <Workbook.Sheet data={formatData(items)} name="Handlingsplaner">
        {columns.map(column => <Workbook.Column label={column.name} value={column.fieldName} key={column.key} />)}
      </Workbook.Sheet>
    </Workbook >
  )
}


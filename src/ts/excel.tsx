import * as React from 'react';
import * as moment from 'moment';
import { formatData } from './utils'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import Workbook from 'react-excel-workbook';

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


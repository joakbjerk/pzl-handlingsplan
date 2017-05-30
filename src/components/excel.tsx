import * as React from 'react';
import { formatData } from '../utils/utils'
import { ExportButton } from './buttons';
import Workbook from 'react-excel-workbook';

export const Excel = ({ items, columns }) => {
  return (
    <Workbook filename="Handlingsplaner.xlsx" element={<ExportButton />}>
      <Workbook.Sheet data={formatData(items)} name="Handlingsplaner">
        {columns.map(column => <Workbook.Column label={column.name} value={column.fieldName} key={column.key} />)}
      </Workbook.Sheet>
    </Workbook >
  )
}


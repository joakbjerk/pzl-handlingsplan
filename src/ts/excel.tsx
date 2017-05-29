import * as React from 'react';
import Workbook from 'react-excel-workbook';

function buttonPreventDefault(event) {
  event.preventDefault();
}

export const Excel = ({ items, columns }) => {
  return (
    <Workbook filename="Handlingsplaner.xlsx" element={
      <button className="ms-Button" onClick={buttonPreventDefault}>
        <span className="ms-Button-label">Eksporter til Excel</span>
      </button>
    }>
      <Workbook.Sheet data={items} name="Handlingsplaner">
        {columns.map(column => <Workbook.Column label={column.name} value={column.fieldName} key={column.key} />)}
      </Workbook.Sheet>
    </Workbook >
  )
}


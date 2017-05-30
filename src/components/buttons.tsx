import * as React from 'react'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export const PrevButton = ({ clickHandler }) => {
  return (
    <DefaultButton
      data-automation-id='Prev-Page-Button'
      description='Forrige Side'
      iconProps={{ iconName: 'Back' }}
      onClick={clickHandler}

    />)
}

export const NextButton = ({ clickHandler }) => {
  return (
    <DefaultButton
      data-automation-id='Next-Page-Button'
      description='Neste Side'
      iconProps={{ iconName: 'Forward' }}
      onClick={clickHandler}

    />)
}

export const ExportButton = () => {
  return (
    <DefaultButton
      data-automation-id='Excel-Export-Button'
      description='Eskoprter listedata til excel'
      iconProps={{ iconName: 'ExcelLogo' }}
      text='Eksporter til Excel'
    />
  );
}

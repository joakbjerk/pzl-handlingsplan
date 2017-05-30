import * as React from 'react';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';

let contextMenuitems = [
  {
    key: 'sortAscending',
    icon: 'SortUp',
    name: 'Sorter A-Z',
    onClick: () => {
      alert('Clicked ' + parent.name + '!');
    }
  },
  {
    key: 'sortDescending',
    icon: 'SortDown',
    name: 'Sorter Z-A',
    onClick: () => {
      alert('Clicked ' + parent.name + '!');
    }
  }
]



export const HeaderContextualMenu = ({ target }) => {
  return (
    <ContextualMenu
      target={target}
      items={contextMenuitems} />
  )
}

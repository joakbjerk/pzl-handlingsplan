import * as React from 'react';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';

let items = [
  {
    key: 'testKey',
    name: 'test'
  }
]

export const HeaderContextualMenu = ({ target, dismissHandler }) => {
  return (
    <ContextualMenu
      target={target}
      onDismiss={dismissHandler}
      items={items} />
  )
}

# react-modal-handler

> React event based modal manager

[![NPM](https://img.shields.io/npm/v/react-modal-handler.svg)](https://www.npmjs.com/package/react-modal-handler) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Description
Low scope React component that allows to open modals through an event manager.

This lib is _only_ a kind of a portal, You will always need to build the modal with the open animation, etc... You just don't need to worry about the (open / close and callback handler) events and the data you want to pass.

## Install

```bash
yarn add react-modal-handler
```

## Usage

1. First, create your modal component. something like:
```jsx
import React, { Component } from 'react'

export class MyModal extends Component {
  render () {
    // these props will be provided
    // by the manager
    const { isActive, onClose } = this.props.controller

    // these props will be passed
    // with the modal trigger method
    const { content } = this.props

    // build your modal
    // as you like
    return (
      <div className={`modal-wrapper ${isActive && '--opened'}`}>
        <div className="modal-container">
            some content: {content}
            <button onClick={() => onClose(() => console.log('onClose callback from the modal!'))}>Close me!</button>
          </div>
        </div>
      </div>
    )
  }
}
```

2. Then, register your modal in any low component (let's say the usual `App.js`):
```jsx
// App.js
import { ModalManager } from 'react-modal-handler'
import { MyModal } from './components/MyModal'

//...comp

<ModalManager
  // register
  modals={{
    main: MyModal
  }}

  // pass generic
  // props
  options={{
    onClose: () => console.log('Modal Closed from modal manager!')
  }}
/>

//...comp
```

3. Now, just feel free to use it **anywhere** in your app:
```jsx
// AmazingCta
import { modal } from 'react-modal-handler'

//...comp

const openMyModal = () => modal.open(
  // pass the type
  'main',
  // pass the props
  { content: 'let\s say you had a REST get... feel free to pass it through this' },
  // pass the options (will merge with the options passed to the ModalManager)
  { onOpen: () => {/* will be fire after open anim */})}
)

//...comp
  <button onClick={openMyModal}>open MyModal!</button>
//...comp
```

## Options

| Property          | Type          | Default value | Description                                                   |
| ----------------- | ------------- | ------------- | ------------------------------------------------------------- |
| animationDuration | number        | 500           | Duration of the open / close timeout (for animation purposes) |
| onOpenClass       | string        | 'with-modal'  | Class that will be added to body when a modal is opened       |
| onOpen            | function      | `undefined`   | Function that fires **after** the modal opens                 |
| onClose           | function      | `undefined`   | Function that fires **after** the modal closes                |

## License

MIT © [psoaresbj](https://github.com/psoaresbj)

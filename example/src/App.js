import React, { Component } from 'react'

import { modal, ModalManager } from 'react-modal-handler';

/**
 * basic modal
 * (check index.css for style)
 */
class DefaultModal extends Component {
  render() {
    /**
     * there will be a controller in
     * passed via manager with the
     * follow props:
     * - animationDuration -> number
     * - onOpenClass -> str
     * - isActive -> bol
     * - onClose -> fn to close the modal (pass a cb if you want it)
     */
    const { isActive, onClose } = this.props.controller;

    return (
      <div className={`modal-wrapper ${isActive && '--opened'}`}>
        <div className="modal-container">
          <div className="modal-content">
            Passed content: {this.props.content}
            <button onClick={() => onClose(() => console.log('onClose callback from the modal!'))}>Close me!</button>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * example method to
 * open a `main` modal
 */
const openModal = () => modal.open(
  // type
  'main',

  // props
  {
    content: 'This was passed to the modal from other unrelated component...'
  },

  // options
  {
    // animation duration
    // for animation control
    // default: 500
    animationDuration: 700,

    // class that will
    // be added to body
    // default: `with-modal`
    onOpenClass: 'with-modal-opened',

    // on open fn
    // default: undefined

    onOpen: () => console.log('Modal opened!'),

    // on close fn
    // default: undefined
    //
    // got this commented
    // because we are already
    // using the general option
    // in the <ModalManager />
    // check it bellow
    //
    // onClose: () => console.log('Modal closed from the caller')
  }
)

/**
 * example app
 */
export default class App extends Component {
  render () {
    return (
      <div>

        {
          /*
           * Register modals
           */
        }
        <ModalManager
          modals={{
            // here our `main` modal
            main: DefaultModal
          }}
          options={{
            onClose: () => console.log('Modal Closed from modal manager!')
          }}
        />

        {
          /*
           * Button to open modal
           */
        }
        <button onClick={openModal}>openModal</button>
      </div>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ACTION, eventManager, options as defaultOptions } from '../lib'

export class ModalManager extends Component {
  /**
   * Proptypes
   */
  static propTypes = {
    modals: PropTypes.objectOf(PropTypes.func),
    options: PropTypes.objectOf(PropTypes.any)
  };

  /**
   * Initial state
   */
  state = {
    modals: null,
    modal: null,
    modalActive: false,
    modalOptions: null,
    options: null,
    props: null
  };

  /**
   * Internal methods
   */
  showModal = ({ type, props, options }) => {
    // try to get the right modal
    const modal = this.state.modals[type]

    // if there's no modal
    // return console log with
    // the worning
    if (!modal) {
      /* eslint-disable-next-line */
      console.log(`[react-modal-handler] ::: No modal registered as ${type}!`);
    }

    // merge passed options
    // with default options
    const mergedOptions = Object.assign({}, this.state.options, options)

    // pass modal, props and
    // mergedOptions as
    // modalOptions to state
    this.setState({ modal, props, modalOptions: mergedOptions }, () =>
      // wrapped in timeout
      // to ensure modal comp
      // mount
      setTimeout(() => {
        // add passed / default class to body
        this.handleBodyClass(true)
        // set state modalActive as true
        this.setState({ modalActive: true }, () =>
          // waits for the animation
          // to finish
          setTimeout(() => {
            // if there's any passed / default
            // onOpen func
            if (typeof mergedOptions.onOpen === 'function') {
              // run optional onOpen fn
              mergedOptions.onOpen()
            }
          // animation time comes
          // from passed / default
          // options
          }, mergedOptions.animationDuration)
        )
      }, 50)
    )
  };

  hideModal = (cb) => {
    // if there's no modal
    // and no active modal
    // exit fn
    if (!this.state.modal && !this.state.ActiveModal) {
      return
    }

    // get modal options from state
    const options = this.state.modalOptions

    // remove passed / default class from body
    this.handleBodyClass(false)

    // sets state modalActive
    // as false (runs the close anim)
    this.setState({ modalActive: false }, () =>
      // wait for the animation
      // to finish
      setTimeout(() => {
        // if there's any passed / default
        // onClose func
        if (typeof options.onClose === 'function') {
          // run optional onClose fn
          options.onClose()
        }
        // resets state modal and props
        this.setState({ modal: null, props: null },
          // and then runs
          // cb if exists
          () => {
            if (typeof cb === 'function') {
              cb()
            }
          }
        )
      // animation time comes
      // from passed / default
      // options
      }, options.animationDuration)
    )
  };

  // handle bodyClass
  // toggle
  handleBodyClass = add =>
    document &&
    document.body.classList[add ? 'add' : 'remove'](this.state.modalOptions.onOpenClass)

  componentDidMount() {
    // get props
    const { modals, options } = this.props

    // merge passed options
    // with default options
    const mergedOptions = Object.assign({}, defaultOptions, options)

    // sets state modals
    // and options
    this.setState({ modals, options: mergedOptions })

    // register open and
    // close modal events
    eventManager
      .on(ACTION.OPEN, (type, props, options) => this.showModal({ type, props, options }))
      .on(ACTION.CLOSE, cb => this.hideModal(cb))
      .emit(ACTION.DID_MOUNT, this)
  }

  componentWillUnmount() {
    // register unmount
    // events events
    eventManager
      .off(ACTION.OPEN)
      .off(ACTION.CLOSE)
      .emit(ACTION.WILL_UNMOUNT)
  }

  render() {
    // if there's no modal
    // in state returns a blank
    // frag
    if (!this.state.modal) {
      return <React.Fragment />
    }

    // set ActiveModal
    const ActiveModal = this.state.modal

    // prepare props
    const props = {
      // spread props
      // from state props
      ...this.state.props,
      // creates controller
      controller: {
        ...this.state.modalOptions,
        isActive: this.state.modalActive,
        onClose: this.hideModal
      }
    }

    // render it
    // with all stuff
    return (
      <ActiveModal {...props} />
    )
  }
}

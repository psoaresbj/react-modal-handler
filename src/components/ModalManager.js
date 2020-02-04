import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ACTION, eventManager, options as defaultOptions } from '../lib'

export class ModalManager extends Component {
  static propTypes = {
    modals: PropTypes.objectOf(PropTypes.func),
    options: PropTypes.object
  };

  state = {
    modals: null,
    modal: null,
    modalActive: false,
    modalOptions: null,
    onClose: null,
    onOpen: null,
    options: null,
    props: null
  };

  showModal = ({ type, props, options }) => {
    const modal = this.state.modals[type]

    if (!modal) {
      /* eslint-disable-next-line */
      console.warn(`[react-modal-handler] ::: No modal registered as ${type}!`);
    }

    const mergedOptions = Object.assign({}, this.state.options, options)

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
              mergedOptions.onOpen(type, props, options)
            }

            if (typeof this.state.onOpen === 'function') {
              this.state.onOpen(type, props, options)
            }
          // animation time comes
          // from passed / default
          // options
          }, mergedOptions.animationDuration)
        )
      }, 50)
    )
  };

  hideModal = cb => {
    if (!this.state.modal && !this.state.ActiveModal) {
      return
    }

    const options = this.state.modalOptions

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

        if (typeof this.state.onClose === 'function') {
          this.state.onClose()
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
      }, options.animationDuration)
    )
  };

  handleBodyClass = add =>
    document &&
    document.body.classList[add ? 'add' : 'remove'](this.state.modalOptions.onOpenClass)

  componentDidMount() {
    const { modals, options } = this.props
    const { onClose, onOpen } = options || {}
    const mergedOptions = Object.assign({}, defaultOptions, options)

    this.setState({ modals, onClose, onOpen, options: mergedOptions })

    // register open and close modal events
    eventManager
      .on(ACTION.OPEN, (type, props, options) => this.showModal({ type, props, options }))
      .on(ACTION.CLOSE, cb => this.hideModal(cb))
      .emit(ACTION.DID_MOUNT, this)
  }

  componentWillUnmount() {
    // unregister events
    eventManager
      .off(ACTION.OPEN)
      .off(ACTION.CLOSE)
      .emit(ACTION.WILL_UNMOUNT)
  }

  render() {
    if (!this.state.modal) {
      return null
    }

    const ActiveModal = this.state.modal

    const props = {
      ...this.state.props,
      controller: {
        ...this.state.modalOptions,
        isActive: this.state.modalActive,
        onClose: this.hideModal
      }
    }

    return (
      <ActiveModal {...props} />
    )
  }
}

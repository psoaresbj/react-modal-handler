import { ACTION, eventManager } from './lib'

export const modal = {
  open: (type, props = {}, options = {}) => eventManager.emit(ACTION.OPEN, type, props, options),
  close: (cb, options = {}) => eventManager.emit(ACTION.CLOSE, cb, options)
}

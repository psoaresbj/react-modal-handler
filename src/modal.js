import { ACTION, eventManager } from './lib';

export const modal = {
  close: (cb, options = {}) => eventManager.emit(ACTION.CLOSE, cb, options),
  open: (type, props = {}, options = {}) => eventManager.emit(ACTION.OPEN, type, props, options)
};

import * as React from 'react';

function close(cb?: Function, options?: any);
function open(type: string, props?: any, options?: any);

export const modal = {
  close,
  open
};

type ModalManagerProps = {
  modals: {[key: string]: any};
  options?: any;
};

type ModalManagerState = any;

export class ModalManager extends React.Component<ModalManagerProps, ModalManagerState> {};

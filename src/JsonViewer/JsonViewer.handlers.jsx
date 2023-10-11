import { isBoolean, isNumber } from 'lodash';
import classNames from 'classnames';

import { getStartSymbol, getEndSymbol } from './JsonViewer.utils';

import classes from './JsonViewer.module.css';

export const renderSingleValue = (value) => {
  const spanClasses = classNames(classes.value, {
    [`${classes.boolean}`]: isBoolean(value),
    [`${classes.number}`]: isNumber(value),
  });
  return (<span className={spanClasses}>{value.toString()}</span>
)};

export const renderActions = (config, value, path) =>
  config?.actions ? <div className={classes.controls}>{config.actions(value, path)}</div> : null;

export const renderStartSymbol = (value, isParent) => (
  <span className={classNames(classes.startSymbol, { [`${classes.parent}`]: isParent })}>
    {getStartSymbol(value)}
  </span>
);

export const renderEndSymbol = (value, isParent) => (
  <span className={classNames(classes.endSymbol, { [`${classes.parent}`]: isParent })}>
    {getEndSymbol(value)}
  </span>
);

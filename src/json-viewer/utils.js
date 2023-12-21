import { isObject, isArray, isBoolean, isNumber } from 'lodash';

export const checkIfParent = (value) => isObject(value) || isArray(value);

export const getConfig =
  (config) =>
  ({ key, index, value, level }) =>
    config.find(
      (c) =>
        c.keyName === key ||
        c.keyIndex === index ||
        c.level === level ||
        c.keyValue === value ||
        c.nodeType === (checkIfParent(value) ? 'parent' : 'child')
    );

const getValueSymbol = (value, isStart) => {
  if (isArray(value)) {
    return isStart ? '[' : ']';
  }
  if (isObject(value)) {
    return isStart ? '{' : '}';
  }
  if (isBoolean(value) || isNumber(value)) {
    return '';
  }
  return '"';
};

export const getStartSymbol = (value) => getValueSymbol(value, true);

export const getEndSymbol = (value) => getValueSymbol(value, false);

export const getItemsCountText = (value) => {
  const valueLength = value.length || Object.keys(value).length;
  const valuePostfix = valueLength % 10 === 1 ? 'item' : 'items';
  return `${valueLength} ${valuePostfix}`;
};

export const generateId = () => Math.random().toString(36).substr(2, 9);
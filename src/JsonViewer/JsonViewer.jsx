import PropTypes from 'prop-types';
import classNames from 'classnames';

import { isObject, isArray } from 'lodash';

import { checkIfParent, getConfig, getItemsCountText, generateId } from './JsonViewer.utils';

import {
  renderActions,
  renderSingleValue,
  renderStartSymbol,
  renderEndSymbol,
} from './JsonViewer.handlers';

import classes from './JsonViewer.module.css';

const JsonViewer = (props) => {
  const renderValue = (value, level, path = '') => {
    if (isObject(value)) {
      return renderObject(value, level, path);
    }
    return renderSingleValue(value);
  };

  const renderObject = (obj, level = 0, path = '') => {
    const keys = Object.keys(obj);
    const isParentArray = isArray(obj);

    return (
      <ul className={classes.list}>
        {keys.map((key, index) => {
          const value = obj[key];
          const newPath = `${path}.${value[props.pathKey]}`.replaceAll('.undefined', '');
          const isParent = checkIfParent(value);
          const config = getConfig(props.config)({
            key,
            index,
            value,
            level,
          });
          const nodeId = `node-${generateId()}`;

          if (config?.formatter && config?.formatter() === null) {
            return null;
          }

          return (
            <li key={key} className={classNames(classes.node, { [`${classes.parent}`]: isParent })}>
              {isParent && level >= props.collapsableFrom && (
                <>
                  <input
                    id={nodeId}
                    type="checkbox"
                    className={classes.toggle}
                    defaultChecked={level <= props.collapsed}
                  />
                  <label htmlFor={nodeId} className={classes.toggleLabel} />
                </>
              )}
              {config?.formatter && config.formatter(key, value, newPath)}
              {!config?.formatter && (
                <>
                  {isParentArray && props.showKeyIndexes && (
                    <span className={classes.key}>{key} : </span>
                  )}
                  {!isParentArray && !props.hideKeys && (
                    <span className={classes.key}>&quot;{key}&quot; : </span>
                  )}
                  {renderStartSymbol(value, isParent)}
                  {isParent && (
                    <>
                      <span className={classes.dots}>...</span>
                      {props.showItemsCount && (
                        <em className={classes.itemsCount}>{getItemsCountText(value)}</em>
                      )}
                    </>
                  )}
                  {isParent && renderActions(config, value, newPath)}
                  {renderValue(value, level + 1, newPath)}
                  {renderEndSymbol(value, isParent)}
                </>
              )}
              {!isParent && renderActions(config, value, newPath)}
            </li>
          );
        })}
      </ul>
    );
  };

  return <div className={classes.root}>{renderValue(props.data)}</div>;
};

JsonViewer.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]).isRequired,
  config: PropTypes.arrayOf(PropTypes.shape({})),
  showItemsCount: PropTypes.bool,
  showKeyIndexes: PropTypes.bool,
  hideKeys: PropTypes.bool,
  collapsed: PropTypes.number, // default collapsed level
  collapsableFrom: PropTypes.number, // level from which collapsing available
  pathKey: PropTypes.string,
};

JsonViewer.defaultProps = {
  config: [],
  showItemsCount: false,
  showKeyIndexes: false,
  hideKeys: false,
  collapsed: 0,
  collapsableFrom: 0,
  pathKey: 'id',
};

export default JsonViewer;

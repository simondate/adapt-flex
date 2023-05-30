import Adapt from 'core/js/adapt';
import React from 'react';
import a11y from 'core/js/a11y';
import { classes, compile, templates } from 'core/js/reactHelpers';

export default function Flex (props) {
  const visited = Adapt.course.get('_globals')?._accessibility?._ariaLabels.visited;
  const {
    _id,
    _ariaLevel,
    onClick,
    _tabFocused
  } = props;
  const itemAriaLevel = _.isNumber(_ariaLevel) && _ariaLevel !== 0 ? _ariaLevel + 1 : _ariaLevel;
  return (
    <div className="component__inner flex__inner">

      <templates.header {...props} />

      <div className="component__widget flex__widget">

        {props._items.map(({ _graphic, _classes, title, body, _index, _isVisited, _isActive, _ariaLevel }, index) =>

          <div
            className={classes([
              'flex-item',
              'js-flex-item',

              _isActive && 'is-active',
              _classes
            ])}
            key={_index}
            data-index={_index}
            style={{
              backgroundImage: _graphic && _graphic.src ? `url(${_graphic.src})` : 'none',
              flex: _isActive ? props._items.length : 1
            }}
          >

            <div role="heading" aria-level={a11y.ariaLevel({ id: _id, level: 'componentItem', override: _ariaLevel ?? itemAriaLevel })} >
              <button
                tabindex={_tabFocused ? 0 : -1}
                id={`${_id}-${index}-flex-button`}
                className={classes([
                  'flex-item__btn',
                  'js-toggle-item',
                  _isVisited && 'is-visited',
                  _isActive ? 'is-open is-selected' : 'is-closed'
                ])}
                onClick={onClick}
                aria-expanded={_isActive.toString()}
                aria-controls={`${_id}-${index}-flex-button-panel`}
              >

                <span className="flex-item__btn-inner">

                  <span className="flex-item__icon">
                    <span className="icon" aria-hidden="true"></span>
                  </span>

                  <span className="flex-item__title">
                    <span className="aria-label">{`${_isVisited ? visited + '. ' : ''}${compile(title)}`}</span>
                    <span className="flex-item__title-inner" aria-hidden="true" dangerouslySetInnerHTML={{ __html: compile(title) }}>
                    </span>
                  </span>

                </span>

              </button>
            </div>

            <div
              id={`${_id}-${index}-flex-button-panel`}
              className="flex-item__content js-flex-item-content"
              role="region"
              aria-labelledby={`${_id}-${index}-flex-button`}
            >

              <div className="flex-item__content-inner" 
                tabindex={_tabFocused ? '' : 0}
              >
                <span className="flex-item__title">
                  <span className="flex-item__title-inner" aria-hidden={_tabFocused ? 'true' : 'false'} dangerouslySetInnerHTML={{ __html: compile(title) }}></span>
                </span>
                {body &&
                <div className="flex-item__body">
                  <div className="flex-item__body-inner" dangerouslySetInnerHTML={{ __html: compile(body) }}>
                  </div>
                </div>
                }

              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

// @flow
import React from 'react'
import { animated, Trail } from 'react-spring'
//
import { IconChevronDown } from '../Icons/icon-chevron-down'

type tProps = {
  item: {
    url: string,
    title: string,
    id: string | number,
    items?: Array<{
      url: string,
      id: string | number,
      title: string,
    }>,
  },
  subMenuActive: boolean,
  toggleSubMenu: (id: string | number) => void,
  styles: any,
}

type tState = {}

export class OverlayMenuItem extends React.Component<tProps, tState> {
  toggleSubMenu = () => this.props.toggleSubMenu(this.props.item.id)
  render() {
    const { styles, item, subMenuActive } = this.props

    return (
      <animated.div style={styles} className="item-container">
        <div className="item-wrapper">
          {/* $FlowFixMe */}
          {(!item.url || item.url === '#') && item.items.length > 0 ? (
            <button
              onClick={this.toggleSubMenu}
              className={`item  ${subMenuActive ? 'is-active' : ''}`}
            >
              {item.title}
            </button>
          ) : (
            <a
              href={item.url}
              className={`item ${subMenuActive ? 'is-active' : ''}`}
            >
              {item.title}
            </a>
          )}

          {item.items &&
            item.items.length > 0 && (
              <React.Fragment>
                <button
                  onClick={this.toggleSubMenu}
                  className={`icon-wrapper ${subMenuActive ? 'is-active' : ''}`}
                >
                  <IconChevronDown />
                </button>

                {subMenuActive && (
                  <div className="subitems-container">
                    <Trail
                      // $FlowFixMe
                      keys={item.items.map(item => item.id)}
                      from={{ opacity: 0 }}
                      to={{ opacity: 1 }}
                    >
                      {item.items.map(subItem => styles => (
                        <div style={styles} className="subitem-wrapper">
                          <a href={subItem.url} className="subitem">
                            {subItem.title}
                          </a>
                        </div>
                      ))}
                    </Trail>
                  </div>
                )}
              </React.Fragment>
            )}
        </div>
      </animated.div>
    )
  }
}

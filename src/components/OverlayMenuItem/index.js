// @flow
import React from 'react'
import { animated, Transition } from 'react-spring'
//
import IconChevronDown from '../Icons/icon-chevron-down'

type tProps = {
  item: {
    url: string,
    title: string,
    id: string | number,
  },
  subMenuActive: boolean,
  toggleSubMenu: (id: string | number) => void,
  styles: any,
}

type tState = {
  itemsActive: boolean,
}

export default class OverlayMenuItem extends React.Component<tProps, tState> {
  toggleSubMenu = () => this.props.toggleSubMenu(this.props.item.id)
  render() {
    const { styles, item, subMenuActive } = this.props

    return (
      <animated.div style={styles} className="item-container">
        <div className="item-wrapper item-wrapper-lvl-1">
          <a href={item.url}>{item.title}</a>

          {item.items &&
            item.items.length > 0 && (
              <React.Fragment>
                <button onClick={this.toggleSubMenu}>
                  <IconChevronDown />
                </button>

                {subMenuActive && (
                  <div className="subitems-container">
                    <Transition
                      keys={item.items.map(item => item.id)}
                      from={{ opacity: 0, height: 0 }}
                      enter={{ opacity: 1, height: 10 }}
                      leave={{ opacity: 0, height: 0, pointerEvents: 'none' }}
                    >
                      {item.items.map(subItem => styles => (
                        <div
                          style={styles}
                          className="item-wrapper item-wrapper-lvl-2"
                        >
                          <a href={subItem.url}>{subItem.title}</a>
                        </div>
                      ))}
                    </Transition>
                  </div>
                )}
              </React.Fragment>
            )}
        </div>
      </animated.div>
    )
  }
}

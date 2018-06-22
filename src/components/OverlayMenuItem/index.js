// @flow
import React from 'react'
import { animated } from 'react-spring'
//
import IconChevronDown from '../Icons/icon-chevron-down'

type tProps = {
  item: {
    url: string,
    title: string
  },
  styles: any
}

type tState = {
  itemsActive: boolean
}

export default class OverlayMenuItem extends React.Component<tProps, tState> {
  state = {
    itemsActive: false
  }
  toggleSubMenu = () =>
    this.setState(prevState => ({ itemsActive: !prevState.itemsActive }))
  render() {
    console.log(this.state)
    const { styles, item } = this.props
    return (
      <animated.div style={styles}>
        <a href={item.url}>{item.title}</a>

        {item.items &&
          item.items.length > 0 && (
            <React.Fragment>
              <button onClick={this.toggleSubMenu}>
                <IconChevronDown />
              </button>

              {this.state.itemsActive && (
                <ul>
                  {item.items.map(subItem => (
                    <li>
                      <a href={subItem.url}>{subItem.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          )}
      </animated.div>
    )
  }
}

// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Spring, animated, Trail } from 'react-spring'
//
import Container from './index.style'

const AnimatedContainer = animated(Container)

type tProps = {
  options: {
    items: Array<any>,
    rootId?: string,
    styles?: {},
  },
  aboveMenuRender?: () => any,
  belowMenuRender?: () => any,
  itemRender: (item: any, styles: any) => any,
}

export default class OverlayMenu extends React.Component<tProps> {
  root: any
  mount: any
  rootId: string
  constructor(props: tProps) {
    super(props)

    this.rootId = props.options.rootId || 'root'
    this.root = document.getElementById(this.rootId)
    this.mount = document.createElement('div')
  }
  componentDidMount() {
    this.root.appendChild(this.mount)
    document
      .getElementsByTagName('body')[0]
      .classList.add('component-overlay-menu-active')
  }
  componentWillUnmount() {
    this.root.removeChild(this.mount)
    document
      .getElementsByTagName('body')[0]
      .classList.remove('component-overlay-menu-active')
  }
  render() {
    const {
      options,
      itemRender,
      aboveMenuRender,
      belowMenuRender,
      ...props
    } = this.props
    const { items, rootId } = options
    return ReactDOM.createPortal(
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} native>
        {styles => (
          <AnimatedContainer
            style={styles}
            options={{
              ...options,
              styles: options.styles || {},
            }}
            {...props}
          >
            {aboveMenuRender && aboveMenuRender()}
            <nav>
              <Trail
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                keys={items.map(item => item.id)}
              >
                {items.map(item => styles => itemRender({ item, styles }))}
              </Trail>
            </nav>
            {belowMenuRender && belowMenuRender()}
          </AnimatedContainer>
        )}
      </Spring>,
      // $FlowFixMe
      this.mount,
    )
  }
}

// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Spring, animated, Trail } from 'react-spring'
//
import Container from './index.style'

const AnimatedContainer = animated(Container)

type tProps = {
  options: {
    isActive: boolean,
    items: Array<any>,
    rootId?: string,
    styles?: {},
  },
  aboveMenuRender?: () => any,
  belowMenuRender?: () => any,
  itemRender: (item: any, styles: any) => any,
}

type tState = {
  scrollTop: number,
  prevScrollTop: number,
}

export default class OverlayMenu extends React.Component<tProps, tState> {
  root: any
  mount: any
  rootId: string
  state = {
    scrollTop: 0,
    prevScrollTop: 0,
  }
  constructor(props: tProps) {
    super(props)

    if (typeof document !== 'undefined') {
      this.rootId = props.options.rootId || 'root'
      this.root = document.getElementById(this.rootId)
      this.mount = document.createElement('div')
    }
  }
  componentDidMount() {
    if (typeof document !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll, false)
      this.root.appendChild(this.mount)
    }
  }
  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll, false)
      this.root.removeChild(this.mount)
    }
  }

  componentDidUpdate(prevProps: tProps, prevState: tState) {
    if (typeof document !== 'undefined') {
      // menu was active, but is about to not be
      if (prevProps.options.isActive && !this.props.options.isActive) {
        window.scrollTo(0, prevState.prevScrollTop)

        document
          .getElementsByTagName('body')[0]
          .classList.remove('component-overlay-menu-active')
        // menu wasn't active, but is about to be
      } else if (!prevProps.options.isActive && this.props.options.isActive) {
        //         window.scrollTo(0, this.state.scrollTop)
        this.setState({ prevScrollTop: prevState.scrollTop })
        window.scrollTo(0, 0)

        document
          .getElementsByTagName('body')[0]
          .classList.add('component-overlay-menu-active')
      }
    }
  }

  handleScroll = () => {
    if (typeof document !== 'undefined') {
      const scrollTop =
        window.pageYOffset ||
        (document.documentElement ? document.documentElement.scrollTop : 0)

      this.setState({
        scrollTop,
      })
    }
  }

  render() {
    const {
      options,
      itemRender,
      aboveMenuRender,
      belowMenuRender,
      ...props
    } = this.props
    const { items, rootId, isActive } = options
    return isActive
      ? ReactDOM.createPortal(
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
      : null
  }
}

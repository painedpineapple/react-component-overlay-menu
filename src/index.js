import React from 'react'
import { render } from 'react-dom'
import faker from 'faker'
import _ from 'lodash'
//
import Logo from './Logo'
import OverlayMenu from './components/OverlayMenu'
import OverlayMenuItem from './components/OverlayMenuItem'
import overlayStyles from './styles'

const items = _.times(10, () => ({
  id: faker.random.number(),
  url: faker.internet.url(),
  title: faker.lorem.word(),
  items:
    faker.random.number(2) % 2
      ? []
      : _.times(3, () => ({
          id: faker.random.number(),
          url: faker.internet.url(),
          title: faker.lorem.word(),
        })),
}))

const styles = {
  p: {
    maxWidth: '800px',
    fontSize: 18,
    margin: 30,
  },
}

class App extends React.Component<{}, { isActive: boolean }> {
  state = {
    isActive: false,
  }
  handleClick = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }
  render() {
    return (
      <div>
        <button
          onClick={this.handleClick}
          style={{
            position: 'fixed',
            right: 20,
            top: 20,
            zIndex: '9999999999999',
          }}
        >
          Toggle Menu
        </button>
        <div style={{ marginTop: 80 }}>
          {_.times(20, () => (
            <p key={faker.random.uuid()} style={styles.p}>
              {faker.lorem.paragraph()}
            </p>
          ))}
        </div>
        <OverlayMenu
          options={{
            isActive: this.state.isActive,
            items,
            styles: overlayStyles,
          }}
          itemRender={itemProps => <OverlayMenuItem {...itemProps} />}
          aboveMenuRender={() => (
            <a href="/" className="logo-wrapper">
              <Logo />
            </a>
          )}
          belowMenuRender={() => (
            <div style={{ margin: 60 }}>I will appear below the menu</div>
          )}
        />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))

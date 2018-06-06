import React from 'react'
import { render } from 'react-dom'
import faker from 'faker'
import _ from 'lodash'
//
import Logo from './Logo'
import OverlayMenu from './OverlayMenu'
import overlayStyles from './styles'

const items = _.times(10, () => ({
  id: faker.random.number(),
  url: faker.internet.url(),
  title: faker.lorem.word(),
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
            position: 'absolute',
            right: 30,
            top: 30,
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
        {this.state.isActive && (
          <OverlayMenu
            options={{
              items,
              styles: overlayStyles,
            }}
            itemRender={({ item, styles }) => (
              <a style={styles} href={item.url}>
                {item.title}
              </a>
            )}
            aboveMenuRender={() => (
              <a href="/" className="logo-wrapper">
                <Logo />
              </a>
            )}
            belowMenuRender={() => (
              <div style={{ margin: 60 }}>I will appear below the menu</div>
            )}
          />
        )}
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))

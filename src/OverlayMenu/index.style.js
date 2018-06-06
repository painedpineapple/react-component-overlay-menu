import styled from 'react-emotion'
import { injectGlobal } from 'emotion'

injectGlobal(() => ({
  'body.component-overlay-menu-active': {
    maxHeight: '100vh',
    overflow: 'hidden',
  },
}))

export default styled('div')(({ options: o }) => ({
  padding: '15px 30px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgba(255,255,255, 0.98)',
  position: 'absolute',
  zIndex: 900,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'scroll',
  perspective: 1200,
  fontFamily: 'Roboto Slab, sans-serif',

  nav: {
    display: 'flex',
    flexDirection: 'column',
  },

  ...o.styles,
}))

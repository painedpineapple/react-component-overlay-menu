import { injectGlobal, css } from 'emotion'

injectGlobal({
  'body.component-overlay-menu-active': {
    maxHeight: '100vh',
    overflow: 'hidden',
  },
})

export const defaultStyles = css({
  padding: '15px 30px',
  display: 'block',
  backgroundColor: 'rgba(255,255,255, 0.98)',
  position: 'absolute',
  zIndex: 900,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'scroll',
  perspective: 1200,

  nav: {
    display: 'flex',
    flexDirection: 'column',
  },
})

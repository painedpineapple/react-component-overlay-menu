export default {
  a: {
    color: 'tomato',
    textDecoration: 'none'
  },

  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',

    '&:focus': { outline: 'none' },

    svg: {
      width: 20
    }
  },

  '.item-wrapper': {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',

    '.item-wrapper': {
      display: 'block',
      width: '100%',
      padding: '10px 0',

      a: {
        color: 'rebeccapurple'
      }
    }
  }
}

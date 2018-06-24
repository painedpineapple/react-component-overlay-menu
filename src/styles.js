export default {
  '.logo-wrapper': {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 20px 10px',

    svg: {
      width: 100,
    },
  },

  a: {
    color: 'tomato',
    textDecoration: 'none',
  },

  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',

    '&:focus': { outline: 'none' },

    svg: {
      width: 20,
    },
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
    },
  },

  '.subitems-container': {
    width: '100%',

    a: {
      color: 'rebeccapurple',
    },
  },
}

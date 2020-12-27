module.exports = {
  purge: {
    // enabled: true,
    // content: [`*.html`,`*.js`],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          '1000': '#8675a9',
          '2000': '#c3aed6',
        },
        pink: {
          '1000': '#ffd5cd',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

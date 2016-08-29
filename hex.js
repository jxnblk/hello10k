
module.exports = (rgb) => '#' + rgb.map(v => ('0' + v.toString(16)).slice(-2)).join('')


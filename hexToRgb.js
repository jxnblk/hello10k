
module.exports = hex => [0, 0, 0].map((v, i) => {
  const i2 = i * 2
  return parseInt(hex.replace(/^#/, '').slice(i2, i2 + 2), 16)
})

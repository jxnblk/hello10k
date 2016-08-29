
const srgb = (n) => n / 255
const lum = ([R, G, B]) => {
  const v = (n) => srgb(n) <= .03928 ? srgb(n) / 12.92 : Math.pow((srgb(n) + .055) / 1.055, 2.4)
  const r = v(R)
  const g = v(G)
  const b = v(G)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

module.exports = (a, b) => {
  const [l2, l1] = [lum(a), lum(b)].sort()
  return (l1 + .05) / (l2 + .05)
}



const contrast = require('./contrast')
const negate = (rgb) => rgb.map(n => 255 - n)

// rgbToHsl
const rgbToHsl = ([r, g, b]) => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  const l = (max + min) / 2

  if (max === min) {
    return [0, 0, l]
  } else {
    const d = max - min
    const s = l > 0.5
      ? d / (2 - max - min)
      : d / (max + min)

    let h
    switch (max) {
      case r:
        h = (g - b) / d // + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
    if (h < 0) h += 1

    // h *= 60
    // if (h < 0) h += 360

    return [h, s, l]
  }
}

// hslToRgb
const hslToRgb = ([h, s, l]) => {
  if (s === 0) {
    return [l, l, l]
  }

  const hue2rgb = (p, q, t) => {
    t = t < 0 ? t + 1
      : t > 1 ? t - 1
      : t

    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6

    return p
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q

  const r = hue2rgb(p, q, h + 1 / 3)
  const g = hue2rgb(p, q, h)
  const b = hue2rgb(p, q, h - 1 / 3)

  return [r, g, b].map(v => Math.round(v * 255))
}

let iterations = 0

const lighten = base => min => (color) => {
  const [h, s, l] = rgbToHsl(color)

  if (contrast(base, color) >= min) {
    return color
  }

  if (l >= 1) {
    return null
  }
  iterations++
  const adjusted = hslToRgb([h, s, l + 1/16])

  return lighten(base)(min)(adjusted)
}

const darken = base => min => (color) => {
  const [h, s, l] = rgbToHsl(color)

  if (contrast(base, color) >= min) {
    return color
  }

  if (l <= 0) {
    return null
  }

  const adjusted = hslToRgb([h, s, l - 1/16])
  iterations++

  return darken(base)(min)(adjusted)
}

const resolve = min => base => {
  const neg = negate(base)
  const [bh, bs, bl] = rgbToHsl(base)
  const [h, s, l] = rgbToHsl(neg)

  const color = lighten(base)(min)(neg) || darken(base)(min)(neg) || [0, 0, 0]
  // console.log(iterations, 'iterations')
  return color
}

module.exports = resolve(4)


(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = () => [0, 0, 0]
  .map(n => Math.floor(Math.random() * 255))


},{}],2:[function(require,module,exports){

const bikeshed = require('./bikeshed')
const hello = require('./hello')
const contrast = require('./contrast')
const level = require('./level')
const rgb = require('./rgb')
const hex = require('./hex')

console.log('hello')

const sx = el => s => {
  Object.keys(s).forEach(k => {
    el.style[k] = s[k]
  })
}

const log = ({ base, color }) => {
  console.log(
    hex(base),
    hex(color)
  )
}

const render = () => {
  const base = bikeshed()
  const color = hello(base)
  const c = Math.round(contrast(base, color) * 100) / 100

  const reverse = {
    color: rgb(base),
    backgroundColor: rgb(color)
  }

  cont.textContent = c
  lev.textContent = level(c)
  colorInput.value = hex(color)
  baseInput.value = hex(base)

  sx(body)({
    color: rgb(color),
    backgroundColor: rgb(base)
  })
  sx(titleA)(reverse)
  sx(footer)(reverse)

  log({ color, base })
}

const stopProp = e => {
  e.stopPropagation()
}
body.addEventListener('click', render)
colorInput.addEventListener('click', stopProp)
baseInput.addEventListener('click', stopProp)


},{"./bikeshed":1,"./contrast":3,"./hello":4,"./hex":5,"./level":6,"./rgb":7}],3:[function(require,module,exports){

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


},{}],4:[function(require,module,exports){

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


},{"./contrast":3}],5:[function(require,module,exports){

module.exports = (rgb) => '#' + rgb.map(v => ('0' + v.toString(16)).slice(-2)).join('')


},{}],6:[function(require,module,exports){

module.exports = contrast => {
  if (contrast > 7) {
    return 'AAA'
  } else if (contrast > 4.5) {
    return 'AA'
  } else if (contrast > 3) {
    return 'AA Large'
  } else {
    return 'Fail'
  }
}


},{}],7:[function(require,module,exports){

module.exports = ([r, g, b]) => `rgb(${r}, ${g}, ${b})`


},{}]},{},[2]);

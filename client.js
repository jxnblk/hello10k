
const hello = require('./hello')

const bikeshed = () => [0, 0, 0]
  .map(n => Math.floor(Math.random() * 255))

const srgb = (n) => n / 255
const lum = ([R, G, B]) => {
  const v = (n) => srgb(n) <= .03928 ? srgb(n) / 12.92 : Math.pow((srgb(n) + .055) / 1.055, 2.4)
  const r = v(R)
  const g = v(G)
  const b = v(G)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const contrast = (a, b) => {
  const [l2, l1] = [lum(a), lum(b)].sort()
  return (l1 + .05) / (l2 + .05)
}

const level = n => {
  if (n > 7) {
    return 'AAA'
  } else if (n > 4.5) {
    return 'AA'
  } else if (n > 3) {
    return 'AA Large'
  } else {
    return 'Fail'
  }
}
const rgb = ([r, g, b]) => `rgb(${r}, ${g}, ${b})`
const hex = (rgb) => '#' + rgb.map(v => ('0' + v.toString(16)).slice(-2)).join('')

const sx = el => s => {
  Object.keys(s).forEach(k => {
    el.style[k] = s[k]
  })
}

const log = ({ base, color }) => {
  console.log(
    '%c%s%c%s',
    `padding:4px;color:${rgb(color)};background-color:${rgb(base)}`,
    ' Aa ',
    'color:black',
    ` ${hex(base)} : ${hex(color)}`
  )
}

const render = () => {
  const base = bikeshed()
  const color = hello(base)
  const c = Math.round(contrast(base, color) * 100) / 100

  cont.textContent = `${c} contrast`
  lev.textContent = level(c)
  colorInput.value = hex(color)
  baseInput.value = hex(base)

  sx(body)({
    color: rgb(color),
    backgroundColor: rgb(base)
  })
  sx(titleA)({
    color: rgb(base),
    backgroundColor: rgb(color)
  })

  history.pushState({}, null, `?c=${hex(base).replace(/^#/, '')}`)
  log({ color, base })
}

const stopProp = e => {
  e.stopPropagation()
}
body.addEventListener('click', render)
colorInput.addEventListener('click', stopProp)
baseInput.addEventListener('click', stopProp)


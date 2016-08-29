
const bikeshed = require('./bikeshed')
const hello = require('./hello')
const contrast = require('./contrast')
const level = require('./level')
const rgb = require('./rgb')
const hex = require('./hex')
const dark = require('./dark')

console.log('hello')

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

  cont.textContent = `${c} contrast: ${level(c)}`
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
  sx(footer)({
    color: rgb(base),
    backgroundColor: dark(base) ? 'white' : 'black'
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


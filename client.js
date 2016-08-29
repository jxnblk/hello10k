
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


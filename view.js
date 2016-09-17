
global.document = require('min-document')
global.Element = require('min-document/dom-element')

const h = require('h0').default
const {
  div,
  h1,
  pre,
  button
} = require('h0/dist/elements')
const contrast = require('./contrast')
const level = require('./level')
const rgb = require('./rgb')
const hex = require('./hex')
const dark = require('./dark')
const css = require('./css')

const a = h('a')({
  style: {
    fontWeight: 'bold',
    color: 'inherit'
  }
})

const label = h('label')({
  style: {
    position: 'absolute',
    height: 1,
    width: 1,
    overflow: 'hidden',
    clip: 'rect(1px, 1px, 1px, 1px)'
  }
})

const input = h('input')({
  style: {
    fontFamily: 'Menlo, monospace',
    fontSize: 'inherit',
    boxSizing: 'border-box',
    display: 'block',
    padding: '.5em 0',
    border: 0,
    color: 'inherit',
    backgroundColor: 'transparent',
    appearance: 'none',
  }
})

const p = h('p')({
  style: {
    maxWidth: '40em'
  }
})

const grid = div({
  style: {
    boxSizing: 'border-box',
    display: 'inline-block',
    verticalAlign: 'top',
    width: 448,
    maxWidth: '100%',
    padding: 32
  }
})

const loadButton = grid(
  h('button')({
    class: 'loadButton',
  })('Change Colors')
)

const head = h('head')(
  h('meta')({
    charset: 'utf-8'
  })(),
  h('meta')({
    name: 'viewport',
    content: 'width=device-width,initial-scale=1'
  })(),
  h('title')('Hello Color'),
  h('style')(css)
)

const body = ({ color, base }) => h('body')({
  id: 'body',
  style: {
    fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
    lineHeight: 1.5,
    margin: 0,
    color: rgb(color),
    backgroundColor: rgb(base),
    cursor: 'pointer',
    transitionProperty: 'color, background-color',
    transitionDuration: '.2s, .8s',
    transitionTimingFunction: 'ease-out'
  }
})

const main = (props) => h('main')({
  style: {
    boxSizing: 'border-box',
    minHeight: '100vh',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    userSelect: 'none'
  }
})(
  loadButton,
  title(props),
  cont(props),
  grid(
    label('Color'),
    input({
      id: 'colorInput',
      readonly: true,
      name: 'color',
      value: hex(props.color)
    })()
  ),
  grid(
    label('Background Color'),
    input({
      id: 'baseInput',
      readonly: true,
      name: 'base',
      value: hex(props.base)
    })()
  ),
  footer(props)
)

const title = ({ color, base }) => h1({
  id: 'title',
  style: {
    fontSize: '3em',
    // fontSize: 'calc(2em + 2vw)',
    textTransform: 'uppercase',
    letterSpacing: '.2em',
    display: 'flex',
    flexWrap: 'wrap'
  }
})(
  grid(
    h('div')({
      id: 'titleA',
      style: {
        // textAlign: 'center',
        padding: '.5em',
        color: rgb(base),
        backgroundColor: rgb(color),
        transitionProperty: 'color, background-color',
        transitionDuration: '.8s, .2s',
        transitionTimingFunction: 'ease-out'
      }
    })('Hello')
  ),
  grid(
    h('div')({
      id: 'titleB',
      style: {
        // textAlign: 'center',
        paddingTop: '.5em'
      }
    })('Color')
  )
)

const cont = ({ contrast }) => div({
  style: {
    fontSize: '2em',
    // fontSize: 48,
    fontWeight: 'bold'
  }
})(
  grid({ id: 'cont' })(`${contrast} contrast`),
  grid({ id: 'lev' })(level(contrast))
)

const footer = ({ color, base }) => {
  return h('footer')({ id: 'footer' })(
    grid(
      p('Contrast is the difference in luminance or color that makes an object (or its representation in an image or display) distinguishable. In visual perception of the real world, contrast is determined by the difference in the color and brightness of the object and other objects within the same field of view. Because the human visual system is more sensitive to contrast than absolute luminance, we can perceive the world similarly regardless of the huge changes in illumination over the day or from place to place. The maximum contrast of an image is the contrast ratio or dynamic range.')
    ),
    grid(
      p('Whether you’re over the age of 30, have a cognitive disability, are sitting next to a window, or are using your phone outside in daylight, color contrast is an important part of universal Web accessibility. While visual design trends come and go, sufficiently-contrasted and readable text is a key feature to well-designed websites.'),
      p('Read more about the color contrast minimum here: ',
        a({ href: 'https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html' })('Understanding Contrast'),
        ' and ',
        a({ href: 'https://www.w3.org/TR/WCAG20/#visual-audio-contrast' })('Web Content Accessibility Guidelines')
      )
    ),
    grid(
      p(
        a({ href: 'http://jxnblk.com' })('Made by Jxnblk')
      )
    )
  )
}


const view = (props) => {
  const { color, base, bundle } = props
  const cont = Math.floor(contrast(color, base) * 100) / 100

  return String(h('html')(
    head,
    body(props)(
      main(Object.assign(props, {
        contrast: cont
      })),
      h('script')({
        __html: bundle
      })()
    ))
  )
}

module.exports = view


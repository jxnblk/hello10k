
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
    fontSize: 18,
    maxWidth: '40em'
  }
})

const loadButton = div({
  style: {
    marginBottom: 16
  }
})(
  h('button')({
    class: 'loadButton',
  })('Change Colors')
)

const tweet = div({
  style: {
    position: 'fixed',
    top: 0,
    right: 0,
    margin: 16
  }
})(
  h('a')({
    style: {
      fontSize: 14,
      display: 'inline-block',
      padding: '.25em .5em',
      color: 'white',
      backgroundColor: 'black',
      borderRadius: 3,
      textDecoration: 'none'
    },
    href: `https://twitter.com/intent/tweet?text=Hello color: accessible, functional color palette generator&via=jxnblk`
  })('Tweet')
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
    padding: '2em',
    minHeight: '100vh',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    userSelect: 'none'
  }
})(
  loadButton,
  tweet,
  title(props),
  cont(props),
  div(
    label('Color'),
    input({
      id: 'colorInput',
      readonly: true,
      name: 'color',
      value: hex(props.color)
    })()
  ),
  div(
    label('Background Color'),
    input({
      id: 'baseInput',
      readonly: true,
      name: 'base',
      value: hex(props.base)
    })()
  )
)

const title = ({ color, base }) => h1({
  id: 'title',
  style: {
    fontSize: 'calc(2em + 2vw)',
    textTransform: 'uppercase',
    letterSpacing: '.2em',
    display: 'flex',
    flexWrap: 'wrap'
  }
})(
  h('div')({
    id: 'titleA',
    style: {
      textAlign: 'center',
      padding: '.5em',
      color: rgb(base),
      backgroundColor: rgb(color),
      transitionProperty: 'color, background-color',
      transitionDuration: '.8s, .2s',
      transitionTimingFunction: 'ease-out'
    }
  })('Hello'),
  h('div')({
    id: 'titleB',
    style: {
      textAlign: 'center',
      padding: '.5em'
    }
  })('Color')
)

const cont = ({ contrast }) => div({
  id: 'cont',
  style: {
    fontSize: 48,
    fontWeight: 'bold'
  }
})(
  `${contrast} contrast: ${level(contrast)}`
)

const footer = ({ color, base }) => {
	const backgroundColor = dark(base) ? 'white' : 'black'

  return h('footer')({
    id: 'footer',
    style: {
      boxSizing: 'border-box',
      padding: '2em',
      minHeight: '20vh',
      color: rgb(base),
      backgroundColor,
      transitionProperty: 'color, background-color',
      transitionDuration: '.2s, .8s',
      transitionTimingFunction: 'ease-out'
    }
  })(
    div(
      p('Contrast is the difference in luminance or color that makes an object (or its representation in an image or display) distinguishable. In visual perception of the real world, contrast is determined by the difference in the color and brightness of the object and other objects within the same field of view. Because the human visual system is more sensitive to contrast than absolute luminance, we can perceive the world similarly regardless of the huge changes in illumination over the day or from place to place. The maximum contrast of an image is the contrast ratio or dynamic range.'),
      p('Whether you’re over the age of 30, have a cognitive disability, are sitting next to a window, or are using your phone outside in daylight, color contrast is an important part of universal Web accessibility. While visual design trends come and go, sufficiently-contrasted and readable text is a key feature to well-designed websites.'),
      p('Read more about the color contrast minimum here: ',
        a({ href: 'https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html' })('Understanding Contrast'),
        ' and ',
        a({ href: 'https://www.w3.org/TR/WCAG20/#visual-audio-contrast' })('Web Content Accessibility Guidelines')
      )
    ),
    div(
      a({ href: 'http://jxnblk.com' })('Made by Jxnblk')
    )
  )
}


const view = (props) => {
  const { color, base } = props
  const cont = Math.floor(contrast(color, base) * 100) / 100

  return String(h('html')(
    head,
    body(props)(
      main(Object.assign(props, {
        contrast: cont
      })),
      footer(props),
      h('script')({
        async: true,
        src: '/bundle.js'
      })()
    ))
  )
}

module.exports = view


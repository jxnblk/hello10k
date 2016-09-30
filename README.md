
# Hello 10k

https://hello10k.jxnblk.com

An under 10kB adaptation of [Hello Color](http://jxnblk.com/hello-color)
for [10k Apart](https://a-k-apart.com).

## Installing

This application runs on a Node server.

```sh
npm install
```

Build client side bundle:

```sh
npm run postinstall
```

Start the node server:

```sh
npm start
```

Start the development server:

```sh
npm run dev
```

## About

This site generates random color pairs that pass a minimum of 4:1 contrast ratio to meet the WCAG's level AA conformance for large text.
Click or refresh the page to generate a new pair.
Using URL parameters, you can bookmark or share any pair of colors from this site.
To see a history of the color pairs from a session, open the developer console in your browser.

Read more about color contrast recommendations here:

- [Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG20/#visual-audio-contrast)
- [Understanding Contrast](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)

[MIT License](LICENSE.md)


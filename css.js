
module.exports = `
*{box-sizing:border-box}
body{
font-size:1.125rem;
}
.loadButton {
  margin:0;
  margin-left:-99999px;
  font-family:inherit;
  font-size:inherit;
  font-weight: bold;
  padding:.5em;
  color:inherit;
  background-color:transparent;
  border-radius:3px;
  border: 1px solid;
  -webkit-appearance:none;
  -moz-appearance:none;
  appearance:none;
}
.loadButton:focus {
  margin-left: 0;
  outline:none;
  box-shadow:0 0 0 2px;
}
`.replace(/\n|\s\s+/g, '')


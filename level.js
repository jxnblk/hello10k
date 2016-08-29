
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


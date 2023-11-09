export const convertStringNumber = (str) => {
  const noSpace = str.replace(/\s+/g, '')
  const num = parseFloat(noSpace)
  if(!isNaN(num) && isFinite(num)){
    return num
  }
  return false
}

export const reformatDate = (dt) => {
  const [y, m, d] = dt.split('-')
  return d.padStart(2, '0') + '.' + m.padStart(2, '0') + '.' + y
}


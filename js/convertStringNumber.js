export const convertStringNumber = (str) => {
  const noSpace = str.replace(/\s+/g, '')
  const num = parseFloat(noSpace)
  if(!isNaN(num) && isFinite(num)){
    return num
  }
  return false
}
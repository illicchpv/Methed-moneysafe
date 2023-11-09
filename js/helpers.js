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

// с использованием RAF - request animation frame
export const animationNumber = (el, num) => {
  const fps = 60
  const duration = 2000
  const frameDuration = duration / fps
  const totalFrame = Math.round(duration/frameDuration)

  let currentFrame = 0
  const initNumber = parseFloat(el.textContent.replace(/[^0-9.-]+/g, ''))
  const increment = Math.trunc((num - initNumber)/totalFrame)

  const animate = () => {
    currentFrame++;
    const newNum = initNumber + increment * currentFrame
    el.textContent =  `${newNum.toLocaleString("RU-ru")} ₽`
    if(currentFrame < totalFrame){
      requestAnimationFrame(animate)
    }else{
      el.textContent =  `${num.toLocaleString("RU-ru")} ₽`
    }
  }
  requestAnimationFrame(animate)
}

// с использованием setInterval 
export const animationNumber_OLD = (el, num) => {
  const fps = 60
  const duration = 2000
  const frameDuration = duration / fps
  const totalFrame = Math.round(duration/frameDuration)

  let currentFrame = 0
  const initNumber = parseFloat(el.textContent.replace(/[^0-9.-]+/g, ''))
  const increment = Math.trunc((num - initNumber)/totalFrame)

  const intervalId = setInterval(() => {
    currentFrame++;
    const newNum = initNumber + increment * currentFrame

    el.textContent =  `${newNum.toLocaleString("RU-ru")} ₽`
    if(currentFrame >= totalFrame){
      clearInterval(intervalId)
      el.textContent =  `${num.toLocaleString("RU-ru")} ₽`
    }
  }, frameDuration)
}

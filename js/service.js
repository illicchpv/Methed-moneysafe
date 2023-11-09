const API_URL = 'https://methed-moneysafe2.glitch.me/api/'

export const getData = async (url) => {
  try{
    const resp = await fetch(API_URL + url)
    // console.log('resp: ', resp);
    if(!resp.ok){
      throw new Error(`HTTP error ststus: ${resp.status}`)
    }
    return await resp.json()
  }catch(e){
    console.error('getData catch(e): ', (e));
    throw e
  }
}


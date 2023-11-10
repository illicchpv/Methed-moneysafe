const API_URL = 'https://methed-moneysafe2.glitch.me/api/'

export const getData = async (url) => {
  try{
    url = API_URL + url
    console.log('get url: ', url);
    const resp = await fetch(url)
    // console.log('resp: ', resp);
    if(!resp.ok){
      throw new Error(`getData HTTP error ststus: ${resp.status}`)
    }
    return await resp.json()
  }catch(e){
    console.error('getData catch(e): ', (e));
    throw e
  }
}

export const postData = async (url, data) => {
  try{
    url = API_URL + url
    console.log('post url: ', url);
    const resp = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": 'application/json'},
      body: JSON.stringify(data),
    })
    // console.log('resp: ', resp);
    if(!resp.ok){
      throw new Error(`postData HTTP error ststus: ${resp.status}`)
    }
    return await resp.json()
  }catch(e){
    console.error('postData catch(e): ', (e));
    throw e
  }
}

export const delData = async (url) => {
  try{
    url = API_URL + url
    console.log('post url: ', url);
    const resp = await fetch(url, {
      method: 'DELETE',
    })
    // console.log('resp: ', resp);
    if(!resp.ok){
      throw new Error(`delData HTTP error ststus: ${resp.status}`)
    }
    return await resp.json()
  }catch(e){
    console.error('delData catch(e): ', (e));
    throw e
  }
}
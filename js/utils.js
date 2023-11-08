const API_URL = 'https://methed-moneysafe.glitch.me/api/'
const typesOperation = {
  income: 'доход',
  expenses: 'расход',
}


const reformatDate = (dt) => {
  const [y, m, d] = dt.split('-')
  return d.padStart(2, '0') + '.' + m.padStart(2, '0') + '.' + y
}

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

/*{
  "id": "5",
  "type": "income",
  "amount": 7000,
  "description": "Фриланс",
  "category": "Дополнительный доход",
  "date": "2023-09-18"  01.01.2021
}  */
export const renderReport = (data) => {
  const reportRows = data.map((el) => {
    const repRow = document.createElement('tr')
    repRow.classList.add('report__row')
    repRow.innerHTML = `
<td class="report__cell">${el.category}</td>
<td class="report__cell" style="text-align: right;">${el.amount.toLocaleString()}&nbsp;₽</td>
<td class="report__cell">${el.description}</td>
<td class="report__cell">${reformatDate(el.date)}</td>
<td class="report__cell">${typesOperation[el.type]}</td>
<td class="report__action-cell">
  <button
    class="report__button report__button_table">&#10006;</button>
</td>
`;
    return repRow
  });

  return reportRows
}


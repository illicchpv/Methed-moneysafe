import {convertStringNumber} from './convertStringNumber.js'
import { OverlayScrollbars } from './overlayscrollbars.esm.min.js';

const API_URL = 'https://methed-moneysafe.glitch.me/api/'
const typesOperation = {
  income: 'доход',
  expenses: 'расход',
}

const financeForm = document.querySelector('.finance__form')
const financeAmount = document.querySelector('.finance__amount')
const financeReport = document.querySelector('.finance__report')
const report = document.querySelector('.report')
const reportOperationList = document.querySelector('.report__operation-list')
const reportDates = document.querySelector('.report__dates')


let amount = 0
financeAmount.textContent = amount

financeForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const typeOperation = e.submitter.dataset.typeOperation
  console.log('typeOperation: ', typeOperation);
  const changeAmount = Math.abs( convertStringNumber(financeForm.amount.value))
  console.log('changeAmount: ', changeAmount);
  if(typeOperation === 'income'){
    amount += changeAmount
  }
  if(typeOperation === 'expenses'){
    amount -= changeAmount
  }
  financeAmount.textContent = `${amount.toLocaleString()} ₽`
})

const osInstance = OverlayScrollbars(report, {});

const closeReport = ({target}) => {
  if(target.closest('.report__close') 
    || (!target.closest('.report') && target !== financeReport)
  ){
    report.classList.remove('report__open')
    document.removeEventListener('click', closeReport)
  }
}
const openReport = () => {
  report.classList.add('report__open')
  document.addEventListener('click', closeReport)
}

const getData = async (url) => {
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
const reformatDate = (dt) => {
  const [y, m, d] = dt.split('-')
  return d.padStart(2, '0') + '.' + m.padStart(2, '0') + '.' + y
}
const renderReport = (data) => {
  reportOperationList.textContent = ''

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

  reportOperationList.append(...reportRows)
}

financeReport.addEventListener('click', async () => {
  openReport()
  reportOperationList.innerHTML = '<tr><td colspan="99" align="center" style="padding: 50px; background-color: lightblue;"><div class="loader-104"></div></td></tr>'

  const data = await getData('test') // finance
  renderReport(data)
})

reportDates.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = Object.fromEntries(new FormData(reportDates))
  console.log('formData: ', formData );

  const searchParams = new URLSearchParams()
  if(formData.startDate){
    searchParams.append('startDate', formData.startDate)
  }
  if(formData.endDate){
    searchParams.append('endDate', formData.endDate)
  }
  const queryString = searchParams.toString()

  const url = queryString ? `test?${queryString}` : "test"
  console.log('url: ', url);

  const data = await getData(url) // finance
  renderReport(data)
})
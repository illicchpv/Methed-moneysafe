import { OverlayScrollbars } from './overlayscrollbars.esm.min.js';
import {reformatDate } from './helpers.js'
import {getData} from './service.js'

const typesOperation = {
  income: 'доход',
  expenses: 'расход',
}

const financeReport = document.querySelector('.finance__report')
const report = document.querySelector('.report')
const reportOperationList = document.querySelector('.report__operation-list')
const reportDates = document.querySelector('.report__dates')


const osInstance = OverlayScrollbars(report, {});

const closeReport = ({target}) => {
  if(target.closest('.report__close') 
    || (!target.closest('.report') && target !== financeReport)
  ){
    gsap.to(report, { 
      opacity: 0, 
      scale: 0, 
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        report.computedStyleMap.visibility = 'hidden'
      }
    });
  
    // report.classList.remove('report__open')
    document.removeEventListener('click', closeReport)
  }
}

const openReport = () => {
  // report.classList.add('report__open')

  report.style.visibility = 'visible'
  gsap.to(report, { 
    opacity: 1, 
    scale: 1, 
    duration: 0.5,
    ease: "power2.out",
  });

  document.addEventListener('click', closeReport)

}

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

export const reportControl = () => {
  
  financeReport.addEventListener('click', async () => {
    /*
    const t = financeReport.textContent
    financeReport.textContent = 'загрузка'
    financeReport.disabled = true
  
    const data = await getData('test') // finance
  
    financeReport.textContent = t
    financeReport.disabled = false
  
    reportOperationList.textContent = ''
    reportOperationList.append(...renderReport(data))
    openReport()
    */
    openReport()
    reportOperationList.innerHTML = '<tr><td colspan="99" align="center" style="padding: 50px; background-color: lightblue;"><div class="loader-104"></div></td></tr>'
  
    const data = await getData('test') // finance
    
    reportOperationList.textContent = ''
    reportOperationList.append(...renderReport(data))
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
  
  
}
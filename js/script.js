import {convertStringNumber} from './convertStringNumber.js'
import { OverlayScrollbars } from './overlayscrollbars.esm.min.js';
import {renderReport, getData} from './utils.js'

const financeForm = document.querySelector('.finance__form')
const financeAmount = document.querySelector('.finance__amount')
const financeReport = document.querySelector('.finance__report')
const report = document.querySelector('.report')
const reportOperationList = document.querySelector('.report__operation-list')
const reportDates = document.querySelector('.report__dates')

let amount = 0
financeAmount.textContent = amount

const osInstance = OverlayScrollbars(report, {});

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
  financeAmount.textContent = `${amount.toLocaleString("RU-ru")} ₽`
})

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
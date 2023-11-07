import {convertStringNumber} from './convertStringNumber.js'

const financeForm = document.querySelector('.finance__form')
const financeAmount = document.querySelector('.finance__amount')
const financeReport = document.querySelector('.finance__report')
const report = document.querySelector('.report')
const reportClose = document.querySelector('.report__close')
const reportContainer = document.querySelector('.report__container')

let amount = 0
financeAmount.textContent = amount
let reportOn = false

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
document.body.addEventListener('click', (e) => {
  if(reportOn){
    report.classList.remove('report__open')
    reportOn = false
  }
})
financeReport.addEventListener('click', (e) => {
  e.stopPropagation()
  reportOn = true
  report.classList.add('report__open')
})
reportClose.addEventListener('click', (e) => {
  report.classList.remove('report__open')
  reportOn = false
})
report.addEventListener('click', (e) => {
  e.stopPropagation()
})

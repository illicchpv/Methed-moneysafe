import {animationNumber, convertStringNumber} from './helpers.js'
import {getData, postData} from './service.js'

const financeForm = document.querySelector('.finance__form')
const financeAmount = document.querySelector('.finance__amount')

let amount = 0
financeAmount.textContent = amount

const addNewOperation = async (e) => {
  e.preventDefault()
  const typeOperation = e.submitter.dataset.typeOperation
  // console.log('typeOperation: ', typeOperation);

  const financeFormDate = Object.fromEntries(new FormData(financeForm))
  financeFormDate.type = typeOperation
  // console.log('financeFormDate: ', financeFormDate);

  const newOperation = await postData('finance', financeFormDate)

  const changeAmount = Math.abs( convertStringNumber(newOperation.amount))
  console.log('changeAmount: ', changeAmount);
  if(typeOperation === 'income'){
    amount += changeAmount
  }
  if(typeOperation === 'expenses'){
    amount -= changeAmount
  }
  animationNumber(financeAmount, amount)
  // financeAmount.textContent = `${amount.toLocaleString("RU-ru")} ₽`
  financeForm.reset()
}

export const financeControl = async () => {
  const operations = await getData('finance')
  amount = operations.reduce((acc, el) => {
    if(el.type === 'income'){
      acc += convertStringNumber(el.amount) 
    }
    if(el.type === 'expenses'){
      acc -= convertStringNumber(el.amount) 
    }
    return acc
  }, 0)
  animationNumber(financeAmount, amount)
  // financeAmount.textContent = `${amount.toLocaleString("RU-ru")} ₽`

  financeForm.addEventListener('submit', addNewOperation)
}



/*
{
  "id": "уникальный идентификатор",
  "type": "тип записи (income/outcome)",
  "amount": "сумма",
  "description": "описание операции",
  "category": "категория операции"
}
*/
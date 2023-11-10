import { getData } from "./service.js"

const categoryList = document.querySelector('#categoryList')

const getCategories = (category) => {
  const option = document.createElement('option')
  option.value = category
  return option
}

export const dataListControl = async () => {
  categoryList.textContent = ''
  const categories = await getData('categories')
  console.log('categories: ', categories);
  const optionsInc = categories.expenses.map(getCategories)
  const optionsExp = categories.income.map(getCategories)
  categoryList.append(...optionsExp, ...optionsInc)
}
/*
{
  "income": [
      "Зарплата",
      "Подарки",
      "Сайт ооо \"пунктир\"",
      "Зп"
  ],
  "expenses": [
      "Еда",
      "Транспорт",
      "Развлечения",
      "Образование",
      "Продукты питания"
  ]
}
*/
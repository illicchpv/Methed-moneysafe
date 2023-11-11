const reportChart = document.querySelector('.report__chart')

let  myChart;

export const clearChart = () => {
  reportChart.textContent = ''
}


export const generateChart = (data) => {
  const incData = data.filter(el => el.type === 'income')
  const expData = data.filter(el => el.type === 'expenses')

  const chartLabels = [...new Set( data.map(el => el.date) )] // new Set все уникальные даты

  const reduceOperation = (arrDate) => {
    return chartLabels.reduce((acc1,date) => {
      const total = arrDate
                  .filter(el => el.date === date)
                  .reduce((acc2, el) => acc2 + parseFloat(el.amount), 0)
      acc1[0] += total
      acc1[1].push(acc1[0])
      return [acc1[0], acc1[1]]
    }, [0,[]])  
  }
  
  let [accInc, incAmount] = reduceOperation(incData)
  console.log('accInc: ', accInc, incAmount);

  let [accExp, expAmount] = reduceOperation(expData)
  console.log('accExp: ', accExp, expAmount);

  let ballanceAmmounts = incAmount.map((inc, i) => inc - expAmount[i])
  console.log('ballanceAmmounts: ', ballanceAmmounts);

  clearChart()
  const canvasChart = document.createElement('canvas')
  reportChart.append(canvasChart)
  canvasChart.id = 'myChart'

  const ctx = canvasChart.getContext('2d')
  if(myChart instanceof Chart){
    myChart.destroy()
  }
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: 'доходы',
          data: incAmount,
          borderWigth: 2,
          hidden: true,
        },
        {
          label: 'расходы',
          data: expAmount,
          borderWigth: 2,
          hidden: true,
        },
        {
          label: 'балланс',
          data: ballanceAmmounts,
          borderWigth: 4,
          hidden: false,
        },
      ]
    },
    options: {
      scales: {
        y: { 
          beginAtZero: true,
        }
      },
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "мои финансы"
        },
        legend: {
          position: 'top'
        },
      }
    }
  })

}
/*
"type": "тип записи (income/outcome)",
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
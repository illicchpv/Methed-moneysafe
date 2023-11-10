import { dataListControl } from './dataList.js'
import { financeControl } from './financeControl.js'
import { reportControl } from './reportControl.js'
// import {renderReport, getData} from './utils.js'

const init = () => {
  financeControl()
  reportControl()
  dataListControl()
}

init()
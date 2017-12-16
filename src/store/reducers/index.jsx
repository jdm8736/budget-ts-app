import { combineReducers } from 'redux'
import transactions from './transactionReducer'

export default combineReducers({
    transactions: transactions
})
import { combineReducers } from 'redux'
import babiesList from '../reducers/babies'
import myList from '../reducers/lists'

const rootReducer = combineReducers({
    babiesList,
    myList
})

export default rootReducer
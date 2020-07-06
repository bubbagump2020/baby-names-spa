import { combineReducers } from 'redux'
import babiesList from '../reducers/babies'

const rootReducer = combineReducers({
    babiesList,
})

export default rootReducer
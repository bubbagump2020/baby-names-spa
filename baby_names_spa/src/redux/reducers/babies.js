import { babyActions } from '../action-types/index'

const initialState = {
    babies: []
}

export function babiesList(state = initialState, action){
    switch(action.type){
        case babyActions.GET_BABIES:
            return{
                ...state,
                babies: action.payload
            }
        default:
            return state
    }
}

export default babiesList;
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
        case babyActions.ENABLE_BABY:
            return{
                ...state,
                babies: state.babies.map(baby => baby.id === action.payload ?
                    { ...baby, enabled: true } : baby   
                )
            }
        case babyActions.DISABLE_BABY:
            return{
                ...state,
                babies: state.babies.map(baby => baby.id === action.payload ?
                    { ...baby, enabled: false } : baby    
                )
            }
        case babyActions.ADD_BABY:
            return{
                ...state,
                babies: [ ...state.babies, action.payload]
            }
        default:
            return state
    }
}

export default babiesList;
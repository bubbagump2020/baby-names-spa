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
        case babyActions.ADD_STRIKE_BABY:
            return{
                ...state,
                babies: state.babies.map(baby => ({
                    ...baby,
                    strike: false
                }))
            }
        case babyActions.TRUE_STRIKE_BABY:
            return{
                ...state,
                babies: state.babies.map(baby => baby.id === action.payload ? 
                    { ...baby, strike: true } : baby    
                )
            }
        case babyActions.FALSE_STRIKE_BABY:
            return{
                ...state,
                babies: state.babies.map(baby => baby.id === action.payload?
                    { ...baby, strike: false } : baby    
                )
            }
        default:
            return state
    }
}

export default babiesList;
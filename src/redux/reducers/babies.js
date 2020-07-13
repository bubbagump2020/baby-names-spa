import { babyActions } from '../action-types/index'

const initialState = {
    baby: {
        "list-id": null,
        "baby-name": "",
    },
    babies: [],
    getBabiesNow: false

}

export function babiesList(state = initialState, action){
    switch(action.type){
        case babyActions.GET_BABIES:
            return{
                ...state,
                babies: {
                    ...state.babies,
                    babies: action.payload
                }
            }
        case babyActions.BABY_NAME:
            return{
                ...state,
                baby: {
                    ...state.baby,
                    "baby-name":  action.payload.toLowerCase()
                }
            }
        case babyActions.LIST_ID:
            return{
                ...state,
                baby: {
                    ...state.baby,
                    "list-id": action.payload
                }
            }
        default:
            return state
    }
}

export default babiesList;
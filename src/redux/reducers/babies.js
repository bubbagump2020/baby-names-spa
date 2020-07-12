import { babyActions } from '../action-types/index'

const initialState = {
    baby: {
        "list_id": null,
        "baby_name": "",
        "enabled": true
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
                    "baby_name":  action.payload.toLowerCase()
                }
            }
        case babyActions.LIST_ID:
            return{
                ...state,
                baby: {
                    ...state.baby,
                    "list_id": action.payload
                }
            }
        default:
            return state
    }
}

export default babiesList;
import { listActions } from '../action-types/index'

const initialState = {
    list_id: null
}

export function myList(state = initialState, action){
    switch(action.type){
        case listActions.LIST_ID:
            return{
                ...state,
                list_id: action.payload
            }
        default:
            return state
    }
}

export default myList;
import * as actions from '../action-types/index'

export const getBabies = (payload) => {
    return { type: actions.babyActions.GET_BABIES, payload }
}
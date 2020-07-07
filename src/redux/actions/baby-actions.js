import * as actions from '../action-types/index'

export const getBabies = (payload) => {
    return { type: actions.babyActions.GET_BABIES, payload }
}

export const enableBaby = (payload) => {
    return { type: actions.babyActions.ENABLE_BABY, payload }
}

export const disableBaby = (payload) => {
    return { type: actions.babyActions.DISABLE_BABY, payload }
}

export const addBaby = (payload) => {
    return { type: actions.babyActions.ADD_BABY, payload}
}
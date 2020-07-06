import * as actions from '../action-types/index'

export const getBabies = (payload) => {
    return { type: actions.babyActions.GET_BABIES, payload }
}

export const trueStrikeBaby = (payload) => {
    return { type: actions.babyActions.TRUE_STRIKE_BABY, payload }
}

export const falseStrikeBaby = (payload) => {
    return { type: actions.babyActions.FALSE_STRIKE_BABY, payload}
}

export const addStrikeBaby = (payload) => {
    return { type: actions.babyActions.ADD_STRIKE_BABY, payload }
}
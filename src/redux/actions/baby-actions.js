import * as actions from '../action-types/index'

export const getBabies = (payload) => {
    return { type: actions.babyActions.GET_BABIES, payload }
}

export const getBabiesNow = (payload) => {
    return { type: actions.babyActions.GET_BABIES_NOW, payload }
}

export const addBaby = (payload) => {
    return { type: actions.babyActions.ADD_BABY, payload}
}

export const babyName = (payload) => {
    return { type: actions.babyActions.BABY_NAME, payload}
}

export const listID = (payload) => {
    return { type: actions.babyActions.LIST_ID, payload}
}
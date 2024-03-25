// ** Initial State
const initialState = {
    dataExp: []
}

const dataExp = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_EXP':
            return { ...state, dataExp: action.data }
        case 'UPDATE_EXP':
            return { ...state, dataExp: action.data }
        case 'DELETE_EXP':
            return { ...state, dataExp: action.data }
        case 'SEARCH_EXP':
            return { ...state, dataExp: action.data }
        case 'ADD_EXP':
            return { ...state, dataExp: action.data }
        default:
            return { ...state }
    }
}

export default dataExp
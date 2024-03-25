// ** Initial State
const initialState = {
    dataClass: []
}

const dataClass = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CLASS':
            return { ...state, dataClass: action.data }
        case 'GET_CLASS_BYSOFTID':
            return { ...state, dataClass: action.data }
        case 'UPDATE_CLASS':
            return { ...state, dataClass: action.data }
        case 'DELETE_CLASS':
            return { ...state, dataClass: action.data }
        case 'ADD_CLASS':
            return { ...state, dataClass: action.data }
        case 'GET_USER_CLASS':
            return { ...state, dataClass: action.data }
        default:
            return { ...state }
    }
}

export default dataClass
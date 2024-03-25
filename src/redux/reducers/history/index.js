// ** Initial State
const initialState = {
    dataHistory: {}
}

const dataHistory = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_HISTORY':
            return { ...state, dataHistory: action.data }
        default:
            return { ...state }
    }
}

export default dataHistory
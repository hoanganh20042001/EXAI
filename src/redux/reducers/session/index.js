// ** Initial State
const initialState = {
    dataSession: {}
}

const dataSession = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SESSION':
            return { ...state, dataSession: action.data }
        default:
            return { ...state }
    }
}

export default dataSession
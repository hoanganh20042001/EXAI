// ** Initial State
const initialState = {
    dataRequest: {}
}

const dataRequest = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_REQUEST':
            return { ...state, dataRequest: action.data }
        case 'GET_INFO':
            return { ...state, dataRequest: action.data }
        case 'UPDATE_REQUEST':
            return { ...state, dataRequest: action.data }
        case 'DELETE_REQUEST':
            return { ...state, dataRequest: action.data }
        case 'ADD_REQUEST':
            return { ...state, dataRequest: action.data }
        case 'UPDATE_PASS':
            return { ...state, dataRequest: action.data }
        default:
            return { ...state }
    }
}

export default dataRequest
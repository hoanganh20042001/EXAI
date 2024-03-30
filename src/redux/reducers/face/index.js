// ** Initial State
const initialState = {
    dataFace: []
}

const dataFace = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FACE':
            return { ...state, dataFace: action.data }
        case 'UPDATE_FACE':
            return { ...state, dataFace: action.data }
        case 'SEARCH_FACE':
            return { ...state, dataFace: action.data }
        case 'DELETE_FACE':
            return { ...state, dataFace: action.data }
        case 'ADD_FACE':
            return { ...state, dataFace: action.data }
        case 'GET_OBJ':
            return { ...state, dataFace: action.data }
        default:
            return { ...state }
    }
}

export default dataFace
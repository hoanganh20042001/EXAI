// ** Initial State
const initialState = {
    dataLibs: []
}

const dataLibs = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LIBS':
            return { ...state, dataLibs: action.data }
        case 'GET_LIBS_BYSOFTID':
            return { ...state, dataLibs: action.data }
        case 'UPDATE_LIBS':
            return { ...state, dataLibs: action.data }
        case 'DELETE_LIBS':
            return { ...state, dataLibs: action.data }
        case 'ADD_LIBS':
            return { ...state, dataLibs: action.data }
        default:
            return { ...state }
    }
}

export default dataLibs
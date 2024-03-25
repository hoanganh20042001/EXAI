// ** Initial State
const initialState = {
    dataModel: []
}

const dataModel = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MODEL':
            return { ...state, dataModel: action.data }
        case 'GET_MODEL_BYSOFTID':
            return { ...state, dataModel: action.data }
        case 'UPDATE_MODEL':
            return { ...state, dataModel: action.data }
        case 'DELETE_MODEL':
            return { ...state, dataModel: action.data }
        case 'ADD_MODEL':
            return { ...state, dataModel: action.data }
        default:
            return { ...state }
    }
}

export default dataModel